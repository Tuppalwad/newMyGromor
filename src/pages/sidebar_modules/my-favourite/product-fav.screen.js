import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../../components/common/CustomHeader'
import ProductCard from '../../product_modules/components/ProductCard';
import Indicator from '../../../components/common/Indicator';
import Errordisplaycomponent from '../../../components/Error-display-component';
import { Icon } from '../../../../assets/images';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import { Screen } from '../../../router/screen';

const FavouriteProductContainer = ({ navigation,
    data, onPressProductItem, onPressDelete, isLoading,
    showDelete, setShowDelete, onPressItem, favNoData, appLanguage
}) => {

    console.log(showDelete,'ssssssss')
    const renderProduct = ({ item, index, type }) => <ProductCard showRemove={true} item={item} index={index} onPressProductItem={onPressProductItem} onpressRemove={onPressItem} onPressDeleteFav={onPressDelete} type={type} />;

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader
                type="shop"
                topTitle="My Favourites"
                showLocation={true}
                subtitle={true}
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />
            <FlatList
                data={data || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={{ marginTop: 10 }}>
                        {renderProduct({ item, index, type: 'isfovourite' })}
                    </View>
                )}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ListEmptyComponent={() => {
                    if (data.length == 0) {
                        return (
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Errordisplaycomponent
                                    Error_Title={appLanguage?.no_data_found ?? "No data found"}
                                    Error_Message={""}
                                    Error_Image={Icon.store}
                                    Error_Status={false}
                                />
                            </View>
                        );
                    }
                    return null;
                }}
            />

            <Indicator show={isLoading} />
            <ConfirmationModal
                visible={showDelete.visible ?? false}
                title="Confirm"
                rightButtonText="Remove"
                subtitle={"Are you sure you want to remove this product from your my favourites?"}
                onCancel={() => { setShowDelete(false) }}
                onConfirm={onPressDelete}
                position="bottom"
            />
        </View>
    )
}

export default FavouriteProductContainer

const styles = StyleSheet.create({})