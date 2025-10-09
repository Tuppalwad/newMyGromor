
import React, { useEffect, useState } from 'react';
import { useOperation } from "../../../redux/operation";
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../../router/screen';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { ProductType } from '../../../redux/product/type';
import { UserManager } from '../../../storage';
import { HEToast } from '../../../components/toast';
import FavouriteProductContainer from './product-fav.screen';

const FavouriteProductScreen = ({ navigation, route }) => {
    const appLanguage = UserManager?.getAppMultiLanguage
    const dispatch = useDispatch();
    const operation = useOperation();
    const loadingSelector = createLoadingSelector([ProductType.favProductByFarmerId, ProductType.deleteFavProduct]);
    const isLoading = useSelector(state => loadingSelector(state));
    const isFocussed = useIsFocused();
    const [showDelete, setShowDelete] = useState({ item: null, visible: false })
    const [favNoData, setNoFavData] = useState(false)
    const farmerLanguage = useSelector((state) => state.farmer.FarmerLanguageID);
    const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray)
    const favData = useSelector((state) => state.product.favProductArray)

    useEffect(() => {
        if (isFocussed) {
            let temp = {
                farmerId: farmerAddress.farmerIdentityId,
                language: farmerLanguage,
                storeCode:farmerAddress.storeCode,
            }
            getFavProductByFarmerID(temp)
        }
    }, [isFocussed])


    useEffect(() => {
        if (favData?.length == 0) {
            setNoFavData(true)
        }
    }, [favData])


    const getFavProductByFarmerID = (param) => {
        dispatch(operation.product.getFavProductByFarmerID(param))
    }

    const onPressProductItem = (item) => {
        navigation.navigate(Screen.productDetails, {
            data: item,
            storeCode: farmerAddress?.storeCode
        })
    }

    const onPressItem = (item, index) => {
        setShowDelete({ visible: true, item: item })
    }

    const onPressDelete = (item) => {
        let param = {
            farmerId: farmerAddress.farmerIdentityId,
            productCode: showDelete?.item?.itemNumber ?? '',
            productId: showDelete?.item?.id
        }
        dispatch(operation.product.deleteFavProduct(param)).then((res) => {
            setShowDelete({ visible: false, item: null })
            HEToast(appLanguage?.removed_from_favourte ?? 'Successfully removed from favourites', 'success')
            let temp = {
                farmerId: farmerAddress.farmerIdentityId,
                language: farmerLanguage
            }
            getFavProductByFarmerID(temp)
        }).catch((err) => {
            dispatch(operation.user.getErrorHandling(err,"deleteFavProduct"));
        })
    }

    return (
        <FavouriteProductContainer
            navigation={navigation}
            data={favData}
            onPressProductItem={onPressProductItem}
            onPressDelete={onPressDelete}
            isLoading={isLoading}
            favNoData={favNoData}
            onPressItem={onPressItem}
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            appLanguage={appLanguage}
        />
    );
};
export default FavouriteProductScreen;
