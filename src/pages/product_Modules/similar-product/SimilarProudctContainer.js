import React from 'react'
import { FlatList, StyleSheet, Text, View, } from 'react-native'
import { Icon } from '../../../../assets/images';
import { RFValue } from "react-native-responsive-fontsize";
import CTText from "../../../components/ctText";
import CustomPopupModal from '../../../components/common/CustomPopupModal';
import LoadingInfo from '../../../components/loadingInfo';
import { palette } from '../../../theme/color';
import CustomHeader from '../../../components/common/CustomHeader';
import ProductCard from '../components/ProductCard';

const SimilarProudctContainer = ({ data, onPressProductItem,
    onPressFavourite, isLoading, onEndReached,
    showNoCode, onPressGoToAddress, onPressDeleteFav, appLanguage }) => {

    const renderProduct = ({ item, index, isSimilar }) => <ProductCard item={item} index={index} onPressProductItem={onPressProductItem} onPressFavourite={onPressFavourite} onPressDeleteFav={onPressDeleteFav} type={isSimilar} />;

    return (
        <View style={styles.container}>

            <CustomHeader
                type={appLanguage?.similar_products ?? 'Similar Products'}
                topTitle={appLanguage?.similar_products ?? 'Similar Products'}
                showLocation={true}
                subtitle={true}
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />


            <Text style={styles.itemCount}>{data.length} items</Text>

            <FlatList
                data={data || []}
                keyExtractor={(item) => item?.id}
                renderItem={({ item, index }) => renderProduct({ item, index, isSimilar: true })}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 80 }}
                onEndReached={onEndReached}

            />


            {/* <LoadingInfo isLoading={isLoading} /> */}

            <CustomPopupModal
                visible={showNoCode}
                icon={Icon.warning}
                isRed={true}
                title={appLanguage?.check_your_address ?? 'Check Your Address'}
                buttonText={appLanguage?.is_done ?? 'Done'}
                BottomPopupStatus={true}
                onPressDone={() => { onPressGoToAddress() }}>

                <CTText
                    text={appLanguage?.pls_provide_your ?? 'Please provide your State, District and Village to view products'}
                    fontSize={RFValue(12)}
                    semiBold
                    textColor={palette.grey}
                    style={{ textAlign: 'center' }}
                />

            </CustomPopupModal>

        </View>
    )
}


export default SimilarProudctContainer


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#F9FAFB',
    },
    itemCount: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 16,
        marginVertical: 8,
    },
})