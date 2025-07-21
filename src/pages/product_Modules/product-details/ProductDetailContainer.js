import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
// import CustomHeader from '../common/CustomHeader';
// import CustomButton from '../common/CustomButton';
import product1 from '../../../assets/images/shop/product1.png';
import specification from '../../../assets/images/shop/specification.png';
import downArrow from '../../../assets/images/shop/downArrow.png'
import leaf from '../../../assets/images/shop/leaf.png';
import dropDose from '../../../assets/images/shop/doseDrop.png';
import upArrow from '../../../assets/images/shop/upArrow.png';
import doorStep from '../../../assets/images/shop/doorStep.png';
import payOn from '../../../assets/images/shop/payOn.png';
import farmar from '../../../assets/images/shop/farmar.png';
import gst from '../../../assets/images/shop/GST.png';
import SimilarProducts from '../components/SimilarProducts';
import FarmersAlsoBought from '../components/FarmersAlsoBought';
import CustomerReviews from '../components/CustomerReview';
import CustomHeader from '../../../components/common/CustomHeader';
import CustomButton from '../../../components/common/CustomButton';
import { capitalizeAll } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { defConfigImageURL } from '../../dashboard_Modules/tabs/home/index.service';
import ProductImageSlider from '../components/ProductImageSlider';
import { useNavigation } from '@react-navigation/native';
import LoadingInfo from '../../../components/common/loadingInfo';
import Indicator from '../../../components/common/Indicator';
import SizeSelector from './SizeSelector';


export default function ProductDetailContainer(
    {
        productData,
        isLoading,
        specificationData,
        similarProductData,
        onPressFavourite, onPressAddToCart, onPressDeleteFav,
        reviewData
    }
) {

    console.log(reviewData,'kkkkkkkkkkrrrrrrrrrrr')


    const [selectedSizeId, setSelectedSizeId] = useState(productData?.costings?.[0] ?? null);

    const navigation = useNavigation()

    const [quantity, setQuantity] = useState(1);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isDosageExpanded, setIsDosageExpanded] = useState(false);
    const [isHowToUseExpanded, setIsHowToUseExpanded] = useState(false);
    const [isAdvantagesExpanded, setIsAdvantagesExpanded] = useState(false);
    const advantagesRef = useRef(null);
    const dosageRef = React.useRef(null);
    const howToUseRef = React.useRef(null);
    const scrollViewRef = React.useRef(null);
    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };


    const data = [
        { crop: 'Cotton', dose: '0.5 - 1 ml' },
        { crop: 'Chilli', dose: '1 - 1.5 ml' },
        { crop: 'Capsicum', dose: '1 ml' },
        { crop: 'Sugarcane', dose: '1 - 1.5 ml' },
        { crop: 'Onion &Tomato & Potato', dose: '1 ml' },
        { crop: 'Cauliflower', dose: '0.5 - 1 ml' },
        { crop: 'Cucumber, & Carrot', dose: '0.5 - 0.75 ml' },
    ];

    const BannerData = useSelector(state => state.product.bannerData);

    console.log(productData, 'kkkkkkkkkkk')

    return (
        <>
            <View style={{ marginTop: 30 }}>
                <CustomHeader
                    type="detail"
                    topTitle={capitalizeAll(productData?.nameToShowOnSite ?? " ")}
                    subtitle={true}
                    showLocation={true}
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Order pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />
            </View>
            <View style={styles.container}>


                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={{ marginTop: 10 }}>
                        <ProductImageSlider
                            productData={productData}
                            BannerData={BannerData}
                        />
                    </View>

                    {/* Product Info */}
                    <View style={styles.infoContainer}>
                        <Text style={styles.type}>FERTILIZER</Text>
                        <Text style={styles.productName}>{productData?.nameToShowOnSite}</Text>
                        {/* <Text style={styles.cropTypeBadge}>{productData?.description}</Text> */}

                        {/* Price & Quantity */}
                        <View style={styles.rowBetween}>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>₹{selectedSizeId?.sellingPrice}</Text>
                                <Text style={styles.originalPrice}>₹{selectedSizeId?.mrp}</Text>
                            </View>

                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={handleDecrement} style={styles.qtyCircleButton}>
                                    <Text style={styles.qtyText}>−</Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.qtyInput}
                                    value={quantity?.toString()}
                                    keyboardType="numeric"
                                    onChangeText={(val) => setQuantity(parseInt(val) || 1)}
                                />
                                <TouchableOpacity onPress={handleIncrement} style={styles.qtyCircleButton}>
                                    <Text style={styles.qtyText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <SizeSelector sizesData={productData?.costings || []} setSelectedSizeId={setSelectedSizeId} selectedSizeId={selectedSizeId} />


                    {/* Specifications */}
                    <View style={styles.specificationsContainer}>
                        <View >
                            <Image source={specification} style={styles.specificationImg} />
                        </View>
                        <View style={{ flexDirection: "column", marginLeft: 20 }}>
                            <View style={styles.specificationHeader}>
                                <Text style={styles.specificationHeaderText}>Specifications</Text>
                            </View>
                            <View style={{ width: "96%" }}>
                                <Text style={styles.specificationContent}>
                                    {productData?.controls?.information}
                                </Text>
                            </View>
                        </View>

                    </View>

                    {/* Description - Collapsible */}
                    <View>
                        <TouchableOpacity
                            style={styles.descriptionContainer}
                            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        >
                            <Text style={styles.descriptionTitle}>Description</Text>
                            <Image source={!isDescriptionExpanded ? downArrow : upArrow} style={{ height: 7, width: 12 }} />
                        </TouchableOpacity>
                        {isDescriptionExpanded && (
                            <View style={styles.expandedDescriptionContent}>
                                <Text style={styles.descriptionText}>
                                    {productData?.description}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.doseContainer} ref={(ref) => (dosageRef.current = ref)}  >
                        <TouchableOpacity
                            style={styles.doseContainerHeader}
                            onPress={() => {
                                const nextState = !isDosageExpanded;
                                setIsDosageExpanded(nextState);

                                if (nextState && dosageRef.current && scrollViewRef.current) {
                                    setTimeout(() => {
                                        dosageRef.current.measureLayout(
                                            scrollViewRef.current,
                                            (x, y) => {
                                                scrollViewRef.current.scrollTo({ y: y - 20, animated: true }); // Scroll with offset
                                            },
                                            (error) => console.error('Measure layout error', error)
                                        );
                                    }, 200);
                                }
                            }}
                        >
                            <Text style={styles.doseTitle}>Dosage</Text>
                            <Image source={isDosageExpanded ? upArrow : downArrow} style={{ height: 7, width: 12 }} />
                        </TouchableOpacity>

                        {isDosageExpanded && (
                            <View style={styles.tableContainer}>
                                {/* Table Header */}
                                <View style={[styles.row, styles.headerRow]}>
                                    {/* CROP */}
                                    <View style={styles.headerCell}>
                                        <Image source={leaf} style={{ height: 20, width: 20 }} />
                                        <Text style={styles.headerText}>  CROP</Text>
                                    </View>

                                    {/* Vertical Line */}
                                    <View style={{ width: 1, backgroundColor: '#d8e2e0', marginHorizontal: 8, height: '170%', marginTop: -12 }} />

                                    {/* DOSE */}
                                    <View style={styles.headerCell}>
                                        <Image source={dropDose} style={{ height: 20, width: 20 }} />
                                        <Text style={styles.headerText}>
                                            DOSE <Text style={styles.unitText}> (per Litre)</Text>
                                        </Text>
                                    </View>
                                </View>


                                {/* Table Body */}
                                {data.map((item, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.row,
                                            index === data.length - 1 ? styles.lastRow : null,
                                        ]}
                                    >
                                        <View style={[styles.cell, styles.leftColumn]}>
                                            <Text style={{ ...styles.cellText, textAlign: 'left' }}>{item.crop}</Text>
                                        </View>
                                        <View style={styles.cell}>
                                            <Text style={styles.cellText}>{item.dose}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* How to Use - Collapsible */}
                    <View
                        ref={(ref) => (howToUseRef.current = ref)} >
                        <TouchableOpacity
                            style={styles.howToUseContainer}
                            onPress={() => {
                                const nextState = !isHowToUseExpanded;
                                setIsHowToUseExpanded(nextState);

                                if (nextState && howToUseRef.current && scrollViewRef.current) {
                                    setTimeout(() => {
                                        howToUseRef.current.measureLayout(
                                            scrollViewRef.current,
                                            (x, y) => {
                                                scrollViewRef.current.scrollTo({ y: y - 20, animated: true });
                                            },
                                            (error) => console.error('Measure layout error', error)
                                        );
                                    }, 200);
                                }
                            }}
                        >
                            <Text style={styles.howToUseTitle}>How to Use</Text>
                            <Image source={!isHowToUseExpanded ? downArrow : upArrow} style={{ height: 7, width: 12 }} />
                        </TouchableOpacity>
                        {isHowToUseExpanded && (
                            <View style={styles.howToUseContent}>
                                <Text style={styles.howToUseText}>
                                    {specificationData?.content[0]}
                                </Text>
                            </View>
                        )}
                    </View>
                    {/* Advantage  - Collapsible  */}

                    <View
                        ref={(ref) => (advantagesRef.current = ref)} // Attach ref for scrolling
                    >
                        <TouchableOpacity
                            style={styles.advantagesContainer}
                            onPress={() => {
                                const nextState = !isAdvantagesExpanded;
                                setIsAdvantagesExpanded(nextState);

                                if (nextState && advantagesRef.current && scrollViewRef.current) {
                                    setTimeout(() => {
                                        advantagesRef.current.measureLayout(
                                            scrollViewRef.current,
                                            (x, y) => {
                                                scrollViewRef.current.scrollTo({ y: y - 20, animated: true });
                                            },
                                            (error) => console.error('Measure layout error', error)
                                        );
                                    }, 200);
                                }
                            }}
                        >
                            <Text style={styles.advantagesTitle}>Advantages</Text>
                            <Image source={!isAdvantagesExpanded ? downArrow : upArrow} style={{ height: 7, width: 12 }} />
                        </TouchableOpacity>

                        {isAdvantagesExpanded && (
                            <View style={styles.advantagesContent}>
                                <Text style={styles.advantagesText}>
                                    {specificationData?.content[1]}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* dilevry section  */}
                    <View style={{ marginVertical: 0, paddingHorizontal: 16, backgroundColor: '#fff', marginTop: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', padding: 10 }}>

                            {/* Doorstep Delivery */}
                            <View style={styles.delivaryCard}>
                                <Image source={doorStep} style={styles.delivaryImg} />
                                <View style={[styles.delivaryText, { flex: 1 }]}>
                                    <Text style={{ fontWeight: 'bold' }}>Doorstep Delivery</Text>
                                    <Text style={{ fontSize: 12, color: '#555' }}>*Available Even in Remote Villages</Text>
                                </View>
                            </View>

                            {/* Pay on Delivery */}
                            <View style={styles.delivaryCard}>
                                <Image source={payOn} style={styles.delivaryImg} />
                                <View style={[styles.delivaryText, { flex: 1 }]}>
                                    <Text style={{ fontWeight: 'bold' }}>Pay on Delivery</Text>
                                    <Text style={{ fontSize: 12, color: '#555' }}>Payment at the Time of Delivery</Text>
                                </View>
                            </View>

                            {/* 100% Quality Products */}
                            <View style={styles.delivaryCard}>
                                <Image source={farmar} style={styles.delivaryImg} />
                                <View style={[styles.delivaryText, { flex: 1 }]}>
                                    <Text style={{ fontWeight: 'bold' }}>100% Quality Products</Text>
                                    <Text style={{ fontSize: 12, color: '#555' }}>Trusted by 3+ Millions Farmers</Text>
                                </View>
                            </View>

                            {/* Original GST Bill */}
                            <View style={styles.delivaryCard}>
                                <Image source={gst} style={styles.delivaryImg} />
                                <View style={[styles.delivaryText, { flex: 1 }]}>
                                    <Text style={{ fontWeight: 'bold' }}>Original GST Bill</Text>
                                    <Text style={{ fontSize: 12, color: '#555' }}>Official Bill for Your Records</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    <SimilarProducts
                        productdata={similarProductData}
                        onPressProductItem={onPressAddToCart}
                        onPressFavourite={onPressFavourite}
                        onPressDeleteFav={onPressDeleteFav}
                    />
                    {/* <FarmersAlsoBought
                        productdata={ }
                        onPressProductItem={ }
                        onPressFavourite={ }
                        onPressDeleteFav={ }
                    /> */}
                    <CustomerReviews />

                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>

                    <TouchableOpacity
                        style={[styles.footerButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0A8F43' }]}
                        onPress={() => console.log('Buy Now pressed')}
                    >
                        <Text style={[styles.footerButtonText, { color: '#004F34' }]}>Buy Now</Text>
                    </TouchableOpacity>

                    <CustomButton style={{ width: '50%' }}
                        title="Add to Cart"
                        buttonStyle={[styles.footerButton, { backgroundColor: '#0A8F43' }]}
                        textStyle={[styles.footerButtonText, { color: '#fff' }]}
                    />

                </View>

                <Indicator Indicator={productData ? true : false} />
            </View >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        // marginTop: 35,
        paddingHorizontal: 10
    },

    infoContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 8,
    },
    type: {
        fontSize: 12,
        color: '#888',
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#000',
    },
    cropTypeBadge: {
        fontSize: 12,
        color: '#1E8153',
        backgroundColor: '#E6F4EC',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52
    },
    price: {
        fontSize: 18,
        fontWeight: 600,
        color: '#000',
        marginRight: 12,
        lineHeight: 15
    },
    originalPrice: {
        fontSize: 16,
        color: '#E53935',
        textDecorationLine: 'line-through',
        lineHeight: 15
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyCircleButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#0A8F43',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    qtyText: {
        fontSize: 18,
        color: '#0A8F43',
        lineHeight: 10

    },
    qtyInput: {
        width: 69,
        height: 36,
        borderWidth: 1,
        borderColor: '#0A8F43',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        marginHorizontal: 4,
        lineHeight: 10

    },

    sizesContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 8,
        flexDirection: 'row'
    },
    sizesTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginTop: 4,
    },
    specificationsContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFF9E6',
        padding: 16,
        marginTop: 8,
        borderRadius: 4,
    },
    specificationImg: {
        width: 50,
        height: 50,
    },
    specificationHeader: {
        backgroundColor: '#F57C00',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 8,

    },
    specificationHeaderText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    specificationContent: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        paddingRight: 10
    },
    descriptionContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    descriptionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    chevronIcon: {
        fontSize: 14,
        color: '#666',
    },
    expandedDescriptionContent: {
        backgroundColor: '#fff',
        padding: 16,
        paddingTop: 0,
    },
    descriptionText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    doseContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        marginTop: 8,
    },
    doseContainerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 12,
    },
    doseTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    tableContainer: {
        margin: 16,
        borderWidth: 1,
        borderColor: '#cce0dd',
        borderRadius: 5,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#d8e2e0',
        backgroundColor: '#fff',
    },
    headerRow: {
        backgroundColor: '#f3f7f6',
        paddingVertical: 12,
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    leftColumn: {
        borderRightWidth: 1,
        borderRightColor: '#d8e2e0',
        justifyContent: 'flex-start',
        textAlign: 'left',
        alignSelf: 'flex-start',
    },

    headerCell: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    unitText: {
        fontSize: 10,
        color: '#666', fontWeight: 400
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#222',
    },
    cell: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 15
    },

    howToUseContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    howToUseTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },

    howToUseContent: {
        backgroundColor: '#fff',
        padding: 16,
        paddingTop: 0,
    },

    howToUseText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    advantagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        marginTop: 8,

    },

    advantagesTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },

    advantagesContent: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: '#fff'
    },

    advantagesText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    delivaryCard: {
        width: 78,
        height: 'auto',
        flexDirection: 'column',
        // marginBottom: 20,
        backgroundColor: '#fff',
    },
    delivaryImg: {
        width: 50,
        height: 58,
        marginRight: 10,
        marginBottom: 10,
    },
    delivaryText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'baseline',
        // marginLeft: 10,
        gap: 6,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    footerButton: {
        flex: 1,
        marginHorizontal: 6,
        paddingVertical: 12,
        borderRadius: 6,
        maxWidth: '50%'
    },
    footerButtonText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});
