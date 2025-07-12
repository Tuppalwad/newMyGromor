// android/build.gradle

// based on:
//
// * https://github.com/facebook/react-native/blob/0.60-stable/template/android/build.gradle
//   original location:
//   - https://github.com/facebook/react-native/blob/0.58-stable/local-cli/templates/HelloWorld/android/build.gradle
//
// * https://github.com/facebook/react-native/blob/0.60-stable/template/android/app/build.gradle
//   original location:
//   - https://github.com/facebook/react-native/blob/0.58-stable/local-cli/templates/HelloWorld/android/app/build.gradle

def DEFAULT_COMPILE_SDK_VERSION = 33
def DEFAULT_BUILD_TOOLS_VERSION = '30.0.3'
def DEFAULT_MIN_SDK_VERSION = 21
def DEFAULT_TARGET_SDK_VERSION = 33

def safeExtGet(prop, fallback) {
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}

apply plugin: 'com.android.library'
apply plugin: 'maven-publish'
configurations.api.setCanBeResolved(true)
buildscript {

    // The Android Gradle plugin is only required when opening the android folder stand-alone.
    // This avoids unnecessary downloads and potential conflicts when the library is included as a
    // module dependency in an application project.
    // ref: https://docs.gradle.org/current/userguide/tutorial_using_tasks.html#sec:build_script_external_dependencies
    if (project == rootProject) {
        repositories {
            google()
            jcenter()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:4.2.0'
        }
    }
}

apply plugin: 'com.android.library'
apply plugin: 'maven-publish'

def getVersionFromPackageJson() {
    //  Read and parse package.json file from project root
    def packageJson = new groovy.json.JsonSlurper().parseText(file('../package.json').text)

    // Return the version, you can get any value this way
    return packageJson.version
}

android {
    compileSdkVersion safeExtGet('compileSdkVersion', DEFAULT_COMPILE_SDK_VERSION)
    buildToolsVersion safeExtGet('buildToolsVersion', DEFAULT_BUILD_TOOLS_VERSION)
    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', DEFAULT_MIN_SDK_VERSION)
        targetSdkVersion safeExtGet('targetSdkVersion', DEFAULT_TARGET_SDK_VERSION)
        versionCode 1
        versionName getVersionFromPackageJson()
        buildConfigField "String", "VERSION_NAME", "\"$versionName\""
    }
    lintOptions {
        abortOnError false
    }
}

repositories {
    // ref: https://www.baeldung.com/maven-local-repository
    mavenLocal()
    mavenCentral()
    maven {
        // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
        url "$rootDir/../node_modules/react-native/android"
    }
    maven {  url "https://phonepe.mycloudrepo.io/public/repositories/phonepe-intentsdk-android"}
    maven {
        // Android JSC is installed from npm
        url "$rootDir/../node_modules/jsc-android/dist"
    }
    flatDir {
        dirs 'libs'
    }
    google()
    jcenter()
}

dependencies {
    //noinspection GradleDynamicVersion
    implementation 'com.facebook.react:react-native:0.67.2'
    implementation fileTree(include: ['*.aar'], dir: 'libs')
    implementation 'in.payu:payu-checkout-pro:1.9.3'
    implementation 'in.payu:olamoney:1.1.0'
    implementation 'in.payu:payu-gpay:1.4.2'
    implementation 'org.jetbrains:annotations:16.0.2'
}

def configureReactNativePom(def pom) {
    def packageJson = new groovy.json.JsonSlurper().parseText(file('../package.json').text)

    pom.project {
        name packageJson.title
        artifactId packageJson.name
        version = packageJson.version
        group = "com.payubiz"
        description packageJson.description
//        url packageJson.repository.baseUrl

        licenses {
            license {
                name packageJson.license
                url packageJson.repository.baseUrl + '/blob/master/' + packageJson.licenseFilename
                distribution 'repo'
            }
        }

        developers {
            developer {
                id packageJson.author.username
                name packageJson.author.name
            }
        }
    }
}

afterEvaluate { project ->
    // some Gradle build hooks ref:
    // https://www.oreilly.com/library/view/gradle-beyond-the/9781449373801/ch03.html
    task androidJavadoc(type: Javadoc) {
        source = android.sourceSets.main.java.srcDirs
        classpath += files(android.bootClasspath)
        classpath += files(project.getConfigurations().getByName('api').asList())
        include '**/*.java'
    }

    task androidJavadocJar(type: Jar, dependsOn: androidJavadoc) {
        classifier = 'javadoc'
        from androidJavadoc.destinationDir
    }

    task androidSourcesJar(type: Jar) {
        classifier = 'sources'
        from android.sourceSets.main.java.srcDirs
        include '**/*.java'
    }

    android.libraryVariants.all { variant ->
        def name = variant.name.capitalize()
        def javaCompileTask = variant.getJavaCompile()

        task "jar${name}"(type: Jar, dependsOn: javaCompileTask) {
            from javaCompileTask.destinationDir
        }
    }

    artifacts {
        archives androidSourcesJar
        archives androidJavadocJar
    }

    task installArchives(type: Upload) {
        configuration = configurations.archives
        repositories.maven {
            // Deploy to react-native-event-bridge/maven, ready to publish to npm
            url= "file://${projectDir}/../android/maven"
            // configureReactNativePom pom
        }
    }
}
