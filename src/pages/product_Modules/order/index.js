import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useOperation } from '../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { UserManager } from '../../../storage';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyOrdersScreen from './component/orderScreen';
import { OrderType } from '../../../redux/order/type';
import { Screen } from '../../../router/screen';

const MyOrders = ({ navigation }) => {

    const state = useRoute().params?.state

    const [activeCategory, setActiveCategory] = useState(state ?? 'purchases');
    const [page, setPage] = useState(0);
    const operation = useOperation();
    const dispatch = useDispatch();
    const loadingSelector = createLoadingSelector([OrderType.completedOrder]);
    const isLoading = useSelector(state => loadingSelector(state));
    const appLanguage = UserManager?.getAppMultiLanguage;
    const isFocussed = useIsFocused();
    const bookingList = useSelector((state) => state.product.bookingHistoryArray)

    const [selectedSort, setSelectedSort] = useState({
        key: appLanguage.lblAll ?? 'All',
        value: 'all',
    });
    const completedOrderList = useSelector(state => state.order.completed);
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);
    const filterStatusArray = useSelector(
        state => state.product.getFilterStatusArray,
    );
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);

    useEffect(() => {
        if (isFocussed) {
            if (activeCategory == "purchases") {
                getFetchAPIMethod();
                dispatch(operation.product.getFilterStatus(farmerLanguage ?? 1));
            }
            else {
                getBooking();
            }
        }
    }, [selectedSort, isFocussed, activeCategory]);

    const getFetchAPIMethod = () => {
        let param = {
            Status: (selectedSort?.value).toLocaleLowerCase(),
            language: farmerLanguage,
            pageNo: 1,
            pageSize: 10,
            farmerIdentityId: farmerAddress?.farmerIdentityId,
        };
        getOrders(param);
    };

    const getOrders = params => {
        dispatch(operation.order.completedOrder(params)).catch(err => {
            const { message, detail } = err;
            if (message?.includes('401')) {
                navigation.dispatch(
                    CommonActions.reset({ index: 1, routes: [{ name: Screen.welcome }] }),
                );
            }
        });
    };


    const getBooking = (param) => {
        let tempParam = {
            language: farmerLanguage,
            pageNo: 1,
            pageSize: 10,
            farmerId: farmerAddress?.farmerIdentityId
        };
        dispatch(operation.product.getBookingHistory(tempParam))
    }

    const onPressItem = item => {
        if (activeCategory == "purchases") {
            navigation.navigate(Screen.PurchaseDetail, {
                data: item,
            });
        }
        else {
            navigation.navigate(Screen.BookingDetails, {
                data: item,
            });
        }
    };

    const onPressContinue = () => {
        navigation.replace(Screen.dashboard, {
            screen: appLanguage?.buy_products ?? Screen.product,
        });
    };

    const onEndReached = () => {
        let total = completedOrderList?.totalRecords ?? 0;
        let count = completedOrderList?.data?.length;
        if (!isLoading && count < total) {
            let param = {
                Status: (selectedSort?.value).toLocaleLowerCase(),
                language: farmerLanguage,
                pageNo: completedOrderList?.pageNo + 1,
                pageSize: completedOrderList?.pageSize,
                farmerIdentityId: farmerAddress?.farmerIdentityId,
            };
            getOrders(param);
        }
    };


    const data = activeCategory == "purchases" ? completedOrderList.data : bookingList.data


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MyOrdersScreen
                onPressBack={() => navigation.goBack()}
                onPressItem={onPressItem}
                onPressContinue={onPressContinue}
                isLoading={isLoading}
                appLanguage={appLanguage}
                sortData={filterStatusArray}
                setSelectedSort={setSelectedSort}
                selectedSort={selectedSort}
                OrderArray={data}
                onEndReached={onEndReached}
                getFetchAPIMethod={getFetchAPIMethod}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
            />
        </SafeAreaView>
    )
}

export default MyOrders

const styles = StyleSheet.create({})