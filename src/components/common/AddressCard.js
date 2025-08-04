import { capitalize } from 'lodash';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
// import { UserManager } from '../../../../storage';
// import { palette } from '../../../../theme';
// import { isEmpty } from '../../../../utils/validator';
import { useDispatch, useSelector } from 'react-redux';
// import CTText from '../../../../components/ctText';
import { RFValue } from 'react-native-responsive-fontsize';
import CTText from '../ctText';
import { isEmpty } from '../../utils/validator';
import { UserManager } from '../../storage';
import { palette } from '../../theme/color';
import StoreCard from './StoreCard';
import Contact from '../../assets/images/common/phone.png'
import Location from '../../assets/images/common/location.png'


const AddressCard = ({ style, title = '', data = {}, cardType = '' }) => {
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const appLanguage = UserManager?.getAppMultiLanguage;
    const StoreCodeDetails = useSelector(
        state => state.farmer.farmerStoreCodeDetails,
    );
    let address = '';
    address = `${capitalize(
        farmerAddress.address?.addressLine1 ?? '-',
    )}, ${capitalize(farmerAddress.address?.district ?? '-')}, ${capitalize(
        farmerAddress.address?.state ?? '-',
    )}, 
    ${capitalize(
        farmerAddress.address?.village?.replace(/"/g, '') ?? '-',
    )}, ${capitalize(farmerAddress.address?.taluk ?? '-')}, ${capitalize(
        farmerAddress.address?.pincode ?? '-',
    )}`;

    let checkAddress = address?.replace(/,/g, '');
    checkAddress = checkAddress?.replace(/-/g, '');

    if (isEmpty(checkAddress)) {
        address = '-';
    } else {
        if (checkAddress?.replace(/^\s+|\s+$/gm, '') !== '0') {
            address = address?.replace(/-,/g, '');
            address = address?.replace(/ ,/g, '');
            address = address?.replace(/^\s+|\s+$/gm, '');
        } else {
            address = '-';
        }
    }

    return (
        <>

            <View style={[style]}>
                {cardType == 'StoreType' ? (

                    <StoreCard
                        storeCode={StoreCodeDetails.storeCode}
                        storeName={StoreCodeDetails?.storeName}
                        addressLines={[
                            StoreCodeDetails?.address
                        ]}
                        phoneNumber={StoreCodeDetails?.contactDetails}
                    />

                ) : (
                    <View style={styles.container}>


                        <Text style={{ marginTop: 5, color: '#000000', marginLeft: 20, fontWeight: 600 }}>
                            {capitalize(farmerAddress?.name) ?? ''}
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                            <Image source={Location} style={{ ...styles.icon, marginTop: 9, tintColor: '#4E4E4E' }} />


                            <Text style={{ color: palette.seperator, marginTop: 5, marginLeft: 10, color: '#000000' }}>
                                {address}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

                            <Image source={Contact} style={{ ...styles.icon, marginTop: 7, tintColor: '#4E4E4E' }} />

                            <Text
                                style={{ color: "#4E4E4E", marginTop: 5, marginLeft: 10 }}

                            >
                                {`+91 ${farmerAddress.mobileNumber === null
                                    ? '-'
                                    : farmerAddress.mobileNumber
                                    }`}
                            </Text>
                        </View>

                    </View>
                )}
            </View>
        </>
    );
};

export default AddressCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: palette.white,
        padding: 10,
        borderRadius: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 2,
        marginBottom: 4,
    },
    offer: {
        backgroundColor: palette.darkOrange,
        paddingHorizontal: 5,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 8,
        // paddingBottom: 3
    },
    icon: {
        width: 14,
        height: 14,
        resizeMode: 'contain'

    },
});
