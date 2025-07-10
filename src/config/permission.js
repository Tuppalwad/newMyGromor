import { Isplatform_IOS } from '../config/resposiveSize';
import { PERMISSIONS, RESULTS, requestMultiple, request } from 'react-native-permissions';

const appPermissions = Isplatform_IOS ? [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.IOS.MEDIA_LIBRARY,
    PERMISSIONS.IOS.LOCATION_ALWAYS,
] : [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    //PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    PERMISSIONS.ANDROID.POST_NOTIFICATIONS
];

const CameraPermission = Isplatform_IOS ? [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.IOS.MEDIA_LIBRARY,
] : [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
];

const RecordPermission = Isplatform_IOS ? [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.IOS.MEDIA_LIBRARY,
] : [
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
];

const requestPermission = async (defpermissions) => {
    try {
        if (defpermissions === "Camera") {
            const PermissionsGranted = await requestMultiple(CameraPermission);
            console.log(PermissionsGranted, "granted")
            if ((PermissionsGranted['android.permission.READ_MEDIA_VIDEO'] === RESULTS.GRANTED) || (PermissionsGranted['android.permission.CAMERA'] === RESULTS.GRANTED) || (PermissionsGranted['android.permission.READ_MEDIA_IMAGES'] === RESULTS.GRANTED) || (PermissionsGranted['android.permission.READ_EXTERNAL_STORAGE'] === RESULTS.GRANTED)) {
                return true;
            } else {
                return false;
            }
        } if (defpermissions === "Record") {
            const PermissionsGranted = await requestMultiple(RecordPermission);
            console.log(PermissionsGranted, "granted")
            if ((PermissionsGranted['android.permission.READ_MEDIA_AUDIO'] === RESULTS.GRANTED) || (PermissionsGranted['android.permission.READ_EXTERNAL_STORAGE'] === RESULTS.GRANTED) || (PermissionsGranted['android.permission.WRITE_EXTERNAL_STORAGE'] === RESULTS.GRANTED) || (PermissionsGranted['android.permission.READ_MEDIA_AUDIO'] === RESULTS.GRANTED)) {
                return true;
            } else {
                return false;
            }
        } else {
            let tempPermission = defpermissions == "Record" ? PERMISSIONS.ANDROID.RECORD_AUDIO : defpermissions == "NOTIFICATIONS" ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS : defpermissions
            const granted = await request(tempPermission);
            if (granted === RESULTS.GRANTED) {
                console.log('You can use the permissions', granted);
                return true;
            } else {
                console.log('location permissions denied', granted);
                return false;
            }
        }
    } catch (err) {
        console.log(err);
    }
};

export { requestPermission };
