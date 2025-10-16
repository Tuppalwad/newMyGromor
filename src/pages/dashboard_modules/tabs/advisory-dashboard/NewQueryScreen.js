import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
// import { Ionicons, Feather } from '@expo/vector-icons';
import mic from '../../../../assets/images/common/mic.png';
import video from '../../../../assets/images/common/video.png';
import camera from '../../../../assets/images/common/greenCamera.png';
import gallery from '../../../../assets/images/common/gallery.png';
import CustomHeader from '../../../../components/common/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../../../components/common/CustomButton';
import CommanPost from '../../component/commanPost';
import Farm from '../../../../assets/images/common/communityFarm.png';

const NewQueryScreen = ({ navigation }) => {
    const [question, setQuestion] = useState('');

    return (
        <View style={styles.container}>
            <CustomHeader
                type=""
                topTitle="New Query"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Ask Question Section */}

                <Text style={styles.sectionTitle}>Query Description</Text>
                <View style={{ backgroundColor: '#FFFFFF', padding: 10 }} >
                    <TextInput
                        style={styles.textArea}
                        placeholder="Describe your query"
                        placeholderTextColor="#888"
                        multiline
                        numberOfLines={10}
                        value={question}
                        onChangeText={setQuestion}
                    />
                </View>
                {/* Add File Section */}
                <Text style={[styles.sectionTitle,{marginTop:20}]}>Add a file</Text>
                <Text style={styles.fileInfo}>File size is maximum of 5 MB</Text>
                <Text style={styles.audioNote}><Text style={{ color: 'red' }}>*</Text> Press Audio button to record</Text>

                {/* File Options */}
                <View style={styles.fileOptionsContainer}>
                    <TouchableOpacity style={styles.fileButton}>
                        <Image source={mic} style={{ height: 24, width: 24 }} />
                        <Text style={styles.fileText}>Audio<Text style={{ color: 'red' }}>*</Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fileButton}>
                        <Image source={video} style={{ height: 24, width: 24 }} />
                        <Text style={styles.fileText}>Video</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fileButton}>
                        <Image source={camera} style={{ height: 24, width: 24 }} />
                        <Text style={styles.fileText}>Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.fileButton}>
                        <Image source={gallery} style={{ height: 24, width: 24 }} />
                        <Text style={styles.fileText}>Gallery</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Submit Button */}
            <CustomButton title="Submit" onPress={() => { }} />

        </View>
    );
};

export default NewQueryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF2F1',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '600', marginLeft: 10 },
    headerRight: { flexDirection: 'row', alignItems: 'center' },

    contentContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        marginTop: 10,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginTop: 10,
        marginBottom: 8,
        // backgroundColor: '#FFFFFF',
    },

    textArea: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#333',
        minHeight: 150,
    },

    fileInfo: { fontSize: 14, fontWeight: 400, color: '#00' },
    audioNote: { fontSize: 14, fontWeight: 700, color: '#4E4E4E', marginTop: 2 },

    fileOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        gap: 10,
    },
    fileButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#F2F8F4'
    },
    fileText: {
        marginTop: 4,
        fontSize: 13,
        color: '#000',
        fontWeight: '500',
    },

    submitButton: {
        // backgroundColor: 'linear-gradient(90deg, #00A64F, #00C95A)',
        // backgroundColor: '#00B761',
        paddingVertical: 14,
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        width: '100%',
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
