import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from '../../../redux/loading-reducer';
import ChangeStoreDetailsContainer from './ChangeStoreDetails.screen';
import { UserManager } from '../../../storage';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { HEToast } from '../../../components/toast';
import { useOperation } from "../../../redux/operation";
import { isEmpty } from '../../../utils/validator';
import { StoreType } from '../../../redux/gromor-store/type';
import { Screen } from "../../../router/screen"
import { FarmerType } from '../../../redux/farmer/type';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, RESULTS,request } from 'react-native-permissions';
import { Isplatform_IOS } from '../../../config/resposiveSize';

const ChangeStoreDetails = ({ navigation, route, }) => {
    UserManager.loadUser()
    const appLanguage = UserManager?.getAppMultiLanguage
    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([StoreType.getRecommenedStore, FarmerType.UpdateStore]);
    const isLoading = useSelector(state => loadingSelector(state));
    const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray);
    const StoreDetails = useSelector((state) => state.store.RecommenedStoreDetails);
    const isFocussed = useIsFocused();
    const [isNodata, setIsNoData] = useState(false)
    const [showDelete, setShowDelete] = useState({
        "visible": false,
        "delete_ID": 0
    })

    const [currentLocation, setcurrentLocation] = useState({
        latitude: UserManager?.getUserLocation?.latitude ?? 0,
        longitude: UserManager?.getUserLocation?.longitude ?? 0
    })

    useEffect(() => {
        if (isFocussed) {
            requestLocationPermission(farmerAddress)
        }
    }, [isFocussed,farmerAddress])


    const requestLocationPermission = async (farmerAddress) => {
        if (Isplatform_IOS) {
            getCurrentLocation(farmerAddress);
        } else {
            try {
                const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    {
                        title: appLanguage?.lblLocationAccessRequired ?? 'Location Access Required',
                        message: appLanguage?.lblThisAppneedscurrent ?? 'This App needs to Access your current location',
                        buttonNegative: appLanguage?.cancel ?? "Cancel",
                        buttonPositive: appLanguage?.lblOk ?? "OK"
                    },
                );
                if (granted === RESULTS.GRANTED) {
                    getCurrentLocation(farmerAddress);
                } else {
                    HEToast(appLanguage?.lblAuthorization ?? "Location access is denied")
                }
            } catch (err) {
                HEToast(appLanguage?.lblLocationservice ?? "Location service is disabled or unavailable")
            }
        }
    };

    const getCurrentLocation = (farmerAddress) => {

        Geolocation.getCurrentPosition(
            (position) => {
                let userLocation = {
                    latitude: position.coords?.latitude,
                    longitude: position.coords?.longitude,
                    mobileNumber: farmerAddress?.mobileNumber ?? "",
                }
                getStoreDetails(userLocation)
            },
            (error) => {
                let userLocation = {
                    latitude: 0,
                    longitude:0,
                    mobileNumber: farmerAddress?.mobileNumber ?? "",
                }
                getStoreDetails(userLocation)
                const { code, message } = error;
                if (code === 'CANCELLED') {
                    HEToast(appLanguage?.lblLocationcancelled ?? "Location cancelled by user or by another request")
                }
                if (code === 'UNAVAILABLE') {
                    HEToast(appLanguage?.lblLocationservice ?? "Location service is disabled or unavailable")
                }
                if (code === 'TIMEOUT') {
                    HEToast(appLanguage?.lblLocationrequest ?? "Location request timed out")
                }
                if (code === 'UNAUTHORIZED') {
                    HEToast(appLanguage?.lblAuthorization ?? "Location access is denied")
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    // useEffect(() => {
    //     if (isFocussed) {
    //         let locationInfo = UserManager.getUserLocation
    //         let param = {
    //             mobileNumber: farmerAddress?.mobileNumber ?? "",
    //             latitude: locationInfo?.latitude ?? 0,
    //             longitude: locationInfo?.longitude ?? 0,
    //         }
    //         getStoreDetails(param)
    //     }
    // }, [isFocussed])


    useEffect(() => {
        if (isEmpty(StoreDetails)) {
            setIsNoData(true)
        } else {
            setIsNoData(false)
        }
    }, [StoreDetails])

    const getStoreDetails = (param) => {
        let current_location = {
            latitude: param?.latitude,
            longitude: param?.longitude,
        }
        setcurrentLocation(current_location)
        dispatch(operation.store.getRecommenedStore(param))
    }

    const updateStore = (param) => {
        if (!isEmpty(param?.storeCode)) {
            setShowDelete({
                "visible": true,
                "delete_ID": param?.storeCode ?? 0
            })
        } else {
            HEToast(appLanguage?.lblPleaseselectvalidstorecode ?? "Please select valid store code")
        }
    }

    const handleOnpressdone = () => {

        let temp = {
            "mobileNumber": farmerAddress?.mobileNumber,
            "storeCode": showDelete.delete_ID
        }
        dispatch(operation.farmer.getUpdateStore(temp)).then((res) => {
            navigation.navigate(Screen.dashboard)
            setTimeout(() => {
                HEToast(appLanguage?.lblStorechangedsuccessfully ?? 'Store changed successfully', 'success')
            }, 1000);
        }).catch((err) => {
            dispatch(operation.user.getErrorHandling(err, "getUpdateStore"))
        })
    }

    const handleOnpressclose = (param) => {
        setShowDelete({ "visible": false, "delete_ID": 0 })
    }

    return (
        <ChangeStoreDetailsContainer
            isLoading={isLoading}
            appLanguage={appLanguage}
            gromorStoreData={StoreDetails}
            isNodata={isNodata}
            updateStore={updateStore}
            handleOnpressdone={handleOnpressdone}
            showDelete={showDelete}
            currentLocation={currentLocation}
            handleOnpressclose={handleOnpressclose}
            farmerAddress={farmerAddress}
        />
    );
};

export default ChangeStoreDetails;
