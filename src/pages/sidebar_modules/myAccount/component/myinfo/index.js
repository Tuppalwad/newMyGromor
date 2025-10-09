import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HEToast } from "../../../../../components/toast";
import { useOperation } from "../../../../../redux/operation";
import { UserManager } from "../../../../../storage";
import { isEmpty } from "../../../../../utils/validator";
import { UserType } from "../../../../../redux/user/type";
import { createLoadingSelector } from "../../../../../redux/loading-reducer";
import { Screen } from "../../../../../router/screen";
import { CommonActions, useIsFocused, useTheme } from '@react-navigation/native';
import PersonaInfoContainer from "./myInfoScreen";


const PersonalInfoScreen = ({ navigation }) => {
    const appLanguage = UserManager?.getAppMultiLanguage
    const dispatch = useDispatch();
    const operation = useOperation();
    const languageList = useSelector((state) => state.user.appLanguage);
    const { control, formState: { errors }, handleSubmit, setValue } = useForm({ mode: 'onBlur' });
    const [disableSubmitInEdit, setDisableSubmitInEdit] = useState(true);
    const isFocussed = useIsFocused();
    const [appSetData, setappSetData] = useState([]);
    const myPreferenceDD = useSelector((state) => state.master.myPreferenceDropdown);
    const [error, setError] = useState(null);
    const farmerLanguage = useSelector((state) => state.farmer.FarmerLanguageID);
    const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray)
    const StoreCodeDetails = useSelector((state) => state.farmer.farmerStoreCodeDetails)

    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        mobileNumber: '',
        email: '',
        language: 0,
        education: '',
        dateOfBirth: '',
        memberOfFPOS: null,
        nameOfFPOS: '',
        preferencesApp: ""
    });

    const educationDD = useSelector((state) => state.master.educationDropDown);
    const [addressInfo, setAddressInfo] = useState(null);
    const [stateList, setStateList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [villageList, setVillageList] = useState([]);
    const [status, setStatus] = useState(false);

    const loadingSelector = createLoadingSelector([
        UserType.magicDistrictList, UserType.magicVillageList, UserType.updateUserInfo,
        UserType.appLanguage, UserType.stateList, UserType.getFarmerDetails,
    ])
    const isLoading = useSelector(state => loadingSelector(state))
    const [villageData, setVillageData] = useState({ "Name": "", "Code": "" });
    const [districtData, setDistrictData] = useState({ "Name": "", "Code": "" });
    const [stateData, setStateData] = useState({ "Name": "", "Code": "" });

    useEffect(() => {
        setError(null)
    }, [personalInfo, addressInfo])

    useEffect(() => {
        if (isFocussed) {
            let parms = {
                language: farmerLanguage
            }
            dispatch(operation.master.getMyPreferenceDDList(parms));
        }
    }, [isFocussed])

    useEffect(() => {
        let FinalApps_Array = []
        for (let i = 0; i < appSetData.length; i++) {
            FinalApps_Array.push(appSetData[i].preference)
        }
        setPersonalInfo({ ...personalInfo, preferencesApp: FinalApps_Array.toString() })
    }, [appSetData])

    useEffect(() => {
        if (!isEmpty(farmerAddress?.socialMediaApps)) {
            let FinalApps_Array = []
            for (let i = 0; i < myPreferenceDD.length; i++) {
                for (let j = 0; j < farmerAddress?.socialMediaApps.length; j++) {
                    if (farmerAddress?.socialMediaApps[j] == myPreferenceDD[i].preference) {
                        FinalApps_Array.push(myPreferenceDD[i])
                    }
                }
            }
            setappSetData(FinalApps_Array)
        }
    }, [farmerAddress, myPreferenceDD])

    useEffect(() => {
        if (!isEmpty(farmerAddress)) {
            setPersonalInfo({
                name: farmerAddress?.name,
                mobileNumber: farmerAddress?.mobileNumber,
                email: farmerAddress?.emailId,
                language: farmerAddress?.language,
                education: farmerAddress.educationalQualification,
                dateOfBirth: farmerAddress?.dateOfBirth,
                memberOfFPOS: farmerAddress?.isMemeberOfFPOS ?? null,
                nameOfFPOS: farmerAddress?.nameOfFPO,
                preferencesApp: isEmpty(farmerAddress?.socialMediaApps) ? "" : farmerAddress?.socialMediaApps?.toString()
            })

            setAddressInfo({
                storeCode: farmerAddress?.storeCode ?? '',
                addess: farmerAddress?.address?.addressLine1 ?? '',
                pincode: farmerAddress?.address?.pincode ?? 0,
                tehsil: farmerAddress?.address?.mandel ?? '',
                mandel: farmerAddress?.address?.mandel ?? '',
                taluk: farmerAddress?.address?.taluk ?? '',
            })

            getStateList(farmerAddress?.address);
            if (!isEmpty(farmerAddress?.address?.stateCode) && !isEmpty(farmerAddress?.address?.state)) {
                getDistrictList(farmerAddress?.address?.stateCode, farmerAddress?.address)
                if (!isEmpty(farmerAddress?.address?.districtCode) && !isEmpty(farmerAddress?.address?.district)) {
                    getVillageList(farmerAddress?.address?.stateCode, farmerAddress?.address?.districtCode, farmerAddress?.address)
                }
            }
        }
    }, [farmerAddress])


    const getStateList = (type) => {
        let param = {
            language: farmerLanguage
        }
        dispatch(operation.user.getMagicStateList(param)).then((res) => {
            let tempResults = res ?? []
            if (!isEmpty(tempResults)) {
                if (!isEmpty(type?.stateCode)) {
                    for (let i = 0; i < tempResults.length; i++) {
                        if (type.stateCode === tempResults[i].stateCode) {
                            setStateData({ "Code": type.stateCode, "Name": tempResults[i]?.name })
                        }
                    }
                }
                setStateList(tempResults);
            } else {
                setStateList([])
            }
        })
    }

    const getDistrictList = (state_code, type) => {
        let param = {
            state_code: state_code,
            language: farmerLanguage
        }
        dispatch(operation.user.getMagicDistrictList(param)).then((res) => {
            let tempResults = res?.results ?? []
            if (!isEmpty(tempResults)) {
                if (!isEmpty(type?.districtCode)) {
                    for (let i = 0; i < tempResults.length; i++) {
                        if (type.districtCode === tempResults[i].district_code) {
                            setDistrictData({ "Code": type.districtCode, "Name": tempResults[i]?.district_name })
                        }
                    }
                }
                setDistrictList(tempResults);
            } else {
                setDistrictList([])
                setVillageList([])
            }
        })
    }

    const getVillageList = (state_code, district_code, type) => {
        let param = {
            state_code: state_code,
            district_code: district_code,
            language: farmerLanguage
        }
        dispatch(operation.user.getMagicVillageList(param)).then((res) => {
            let tempResults = res?.results ?? []
            if (!isEmpty(tempResults)) {
                if (!isEmpty(type?.villageCode)) {
                    for (let i = 0; i < tempResults.length; i++) {
                        if (type.villageCode === tempResults[i].village_code) {
                            setVillageData({ "Code": type.villageCode, "Name": tempResults[i]?.village_name })
                        }
                    }
                }
                setVillageList(tempResults);
            } else {
                setVillageList([])
            }
        })
    }


    const onSelectItem = (item, type) => {
        setDisableSubmitInEdit(false)
        if (!isEmpty(item)) {
            if (type === 'state') {
                setStateData({ "Name": item?.name, "Code": item?.stateCode })
                setVillageData({ "Code": "", "Name": "" })
                setDistrictData({ "Code": "", "Name": "" })
                getDistrictList(item?.stateCode)
            } else if (type === 'district') {
                setVillageData({ "Code": "", "Name": "" })
                setDistrictData({ "Code": item?.district_code, "Name": item?.district_name })
                getVillageList(item?.state_code, item?.district_code)
            } else if (type === 'village') {
                setVillageData({ "Code": item?.village_code, "Name": item?.village_name })
            }
        }
    };


    const handleUpdatePersonal = async () => {


        if (isEmpty(personalInfo?.name)) {
            HEToast(appLanguage?.name_required ?? 'Name is required');
            setError({ field: 'name', text: appLanguage?.name_required ?? 'Name is required' })
            return
        }

        if (isEmpty(personalInfo?.dateOfBirth)) {
            HEToast(appLanguage?.lbldateofbirthvalid ?? "Please select Date of Birth");
            setError({ field: 'dob', text: appLanguage?.lbldateofbirthvalid ?? "Please select Date of Birth" })
            return
        }

        if (isEmpty(addressInfo?.addess)) {
            HEToast(appLanguage?.lblCheckAddressDecs ?? 'Please provide your address to make payment');
            setError({ field: 'address', text: appLanguage?.lblCheckAddressDecs ?? 'Please provide your address to make payment' })
            return
        }

        let personalParam = {
            "farmerIdentityId": farmerAddress?.farmerIdentityId,
            "language": farmerLanguage ?? 1,
            "isHNI": farmerAddress?.isHNI ?? false,
            "name": personalInfo?.name ?? '',
            "emailId": personalInfo.email ?? '',
            "villageCode": villageData?.Code ?? '',
            "isMemeberOfFPOS": isEmpty(personalInfo?.memberOfFPOS) ? false : (personalInfo?.memberOfFPOS),
            "nameOfFPO": personalInfo.nameOfFPOS ?? '',
            "educationalQualification": personalInfo?.education ?? '',
            "dateOfBirth": personalInfo?.dateOfBirth,
            "socialMediaApps": personalInfo?.preferencesApp?.split(",") ?? [],
            "address": {
                "addressLine1": addressInfo?.addess ?? '',
                "addressLine2": null,
                "addresseName": null,
                "phoneNumber": personalInfo?.mobileNumber ?? '',
                "state": stateData?.Name ?? '',
                "stateCode": stateData?.Code ?? '',
                "district": districtData?.Name ?? '',
                "districtCode": districtData?.Code ?? '',
                "village": villageData?.Name ?? '',
                "villageCode": villageData?.Code ?? '',
                "mandel": addressInfo?.mandel ?? '',
                "taluk": addressInfo?.taluk ?? '',
                "pincode": addressInfo?.pincode ?? 0,
            }
        }

        await dispatch(operation.user.updateUserDetails(personalParam, farmerAddress?.farmerIdentityId)).then((res) => {
            HEToast(appLanguage?.successful_message ?? 'Submitted successfully!', 'success');
            setDisableSubmitInEdit(true)
            getFarmerDetails();
        }).catch((err) => {
            dispatch(operation.user.getErrorHandling(err, "updateUserDetails"))
        });

    };

    const getFarmerDetails = () => {
        let parms = {
            farmerIdentityId: farmerAddress?.farmerIdentityId
        }
        dispatch(operation.user.getFarmerDetails(parms))
        navigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: Screen.dashboard }] }))
    }

    const onPressStoreInfo = () => {
        navigation.navigate(Screen.ChangeStoreDetails)
    }

    return (
        <PersonaInfoContainer
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            languageList={languageList}
            handleUpdatePersonal={handleUpdatePersonal}
            farmerAddress={farmerAddress}
            control={control}
            handleValidation={handleSubmit}
            setValue={setValue}
            isLoading={isLoading}
            errors={errors}
            error={error}
            navigation={navigation}
            setDisableSubmitInEdit={setDisableSubmitInEdit}
            disableSubmitInEdit={disableSubmitInEdit}
            educationDD={educationDD}
            addressInfo={addressInfo}
            setAddressInfo={setAddressInfo}
            status={status}
            appSetData={appSetData}
            setappSetData={setappSetData}
            stateList={stateList}
            districtList={districtList}
            villageList={villageList}
            onSelectItem={onSelectItem}
            appLanguage={appLanguage}
            myPreferenceDD={myPreferenceDD}

            villageData={villageData}
            districtData={districtData}
            stateData={stateData}
            StoreCodeDetails={StoreCodeDetails}
            onPressStoreInfo={onPressStoreInfo}
        />
    );
};


export default PersonalInfoScreen;