import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../assets/images";
import { HEToast } from "../../../components/toast";
import { useOperation } from "../../../redux/operation";
import { UserManager } from "../../../storage";
import { isEmpty } from "../../../utils/validator";
import MyCropConatiner from './mycrop.screen'

const MyCropsScreen = ({ }) => {
    const appLanguage = UserManager?.getAppMultiLanguage
    const operation = useOperation();
    const dispatch = useDispatch();
    const isFocussed = useIsFocused();
    const cropList = useSelector((state) => state.advisory.myCropList)
    const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray)
    const farmerLanguage = useSelector((state) => state.farmer.FarmerLanguageID);
    const cropListed = useSelector((state) => state.advisory.HNICropList)

    useEffect(() => {
        if (isFocussed) {
            getMyCropList({
                id: farmerAddress?.id,
                language: farmerLanguage
            })
        }
    }, [isFocussed])

    const getMyCropList = (param) => {
        dispatch(operation.advisory.getMyCropList(param))
    }

    useEffect(() => {
        if (isFocussed) {
            let parms = {
                language: farmerLanguage,
                farmerId: farmerAddress?.farmerIdentityId,
                isHni: 1
            }
            getCrops(parms);
        }
    }, [isFocussed])

    const getCrops = (param) => {
        dispatch(operation.advisory.getCrops(param))
    }

    console.log(cropListed, 'cccccc')
    return (
        <MyCropConatiner
            cropList={cropList}
        />
    )
}

export default MyCropsScreen;
