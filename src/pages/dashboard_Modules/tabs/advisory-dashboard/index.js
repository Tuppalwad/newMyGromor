// src/screens/CropAdvisoryScreenWithIcons.js
import React, { use, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import leaf from '../../../../assets/images/shop/leaf.png';
import query from '../../../../assets/images/common/query.png';
import CustomHeader from '../../../../components/common/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import chilliImage from '../../../../assets/images/common/chilli.png';
import cottonImage from '../../../../assets/images/common/cotton.png';
import { FlatList } from 'react-native-gesture-handler';
import { Screen } from '../../../../router/screen';
const CropAdvisoryScreen = () => {
    //   const renderCardItem = (title, isHighlighted = false, iconName = null) => (
    //     <View style={[styles.cardItem, isHighlighted && styles.highlightedItem]}>
    //       {iconName && (
    //         <Image source={leaf} 
    //           size={20} 
    //           color={isHighlighted ? '#2e7d32' : '#666'} 
    //           style={styles.icon} 
    //         />
    //       )}
    //       <Text style={[
    //         styles.cardTitle, 
    //         isHighlighted && styles.highlightedText
    //       ]}>
    //         {title}
    //       </Text>
    //     </View>
    //   );
    const crops = [
        { id: 1, name: 'Mango', image: cottonImage },
        { id: 2, name: 'Chilli', image: chilliImage },
        { id: 3, name: 'Black Gram', image: cottonImage },
        { id: 4, name: 'Cabbage', image: chilliImage },
        { id: 5, name: 'Cotton', image: cottonImage }
    ];
    const [activeCategory, setActiveCategory] = useState('Advisory');
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Header */}
            <View>
                <CustomHeader
                    type="services"
                    topTitle="My Advisory"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                    style={styles.header}
                />
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => setActiveCategory('Advisory')}
                    style={styles.tabButton}
                >
                    <View style={styles.tabInner}>
                        <Image source={leaf} style={{
                            width: 24, height: 24,
                            tintColor: activeCategory === 'Advisory' ? '#01AD41' : '#444'
                        }}
                        />
                        <Text style={[
                            styles.tabText,
                            activeCategory === 'Advisory' && styles.activeTabText
                        ]}>
                            Advisory
                        </Text>

                    </View>
                    {activeCategory === 'Advisory' && <View style={styles.greenUnderline} />}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setActiveCategory('Queries');
                    }}
                    style={styles.tabButton}
                >
                    <View style={styles.tabInner}>
                        <Image source={query} style={{ width: 24, height: 24, tintColor: activeCategory === 'Queries' ? '#01AD41' : '#444' }} />
                        <Text style={[
                            styles.tabText,
                            activeCategory === 'Queries' && styles.activeTabText
                        ]}>
                            Queries
                        </Text>

                    </View>
                    {activeCategory === 'Queries' && <View style={styles.greenUnderline} />}
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>

                {/* My Crops Section */}
                <View style={styles.myCropSection}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <Text style={styles.sectionTitle}>My Crops</Text>
                        <TouchableOpacity style={styles.addButton}>
                            {/* <Icon name="add" size={20} color="#4CAF50" /> */}
                            <Text style={styles.addButtonText}>+Add Crop</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.card}>
                        {/* <Image source={chilli} />
                        <Text style={styles.cardTitle}>Chilli</Text>
                         */}
                        {/* <FlatList
                            data={crops}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{ alignItems: 'center', marginRight: 16 }}>
                                    <Image source={item.image} style={{ width: 60, height: 60, borderRadius: 30 }} />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333' }}>{item.name}</Text>
                                </View>
                            )}
                            contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
                        /> */}
                        <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}>
                                    <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                    <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                    </View>
                </View>

                <View style={styles.divider} />

                {/* Vegetables Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vegetables</Text>
                    <View style={styles.card}>
                       <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}>
                                    <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                    <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Home Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Fruit</Text>
                    <View style={styles.card}>
                        <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}>
                                     <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                    <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Fabbage Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cash Crop</Text>
                    <View style={styles.card}>
                       <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}>
                                     <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                    <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>

                    <View style={styles.divider} />
                    {/* Spices Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Spices</Text>
                    <View style={styles.card}>
                       <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}>
                                     <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                    <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
                    <View style={styles.divider} />
                    {/* cereals Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cereals</Text>
                    <View style={styles.card}>
                       <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}>
                                     <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                    <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>

{/* pulses Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pulses</Text>
                    <View style={styles.card}>
                       <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}>
                                     <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                    <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
                    <View style={styles.divider} />
                    {/* oil seeds Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Oil Seeds</Text>
                    <View style={styles.card}>
                       <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}> 
                                <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                    <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.divider} />
                {/* Medicinal Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Medicinal</Text>
                    <View style={styles.card}>
                       
                       <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}>
                                    <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                        <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    
                    </View>
                </View>
                <View style={styles.divider} />
                {/* Flowers Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Flowers</Text>
                    <View style={styles.card}>
                       <FlatList
                            data={crops}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignItems: 'center',
                                    marginBottom: 16,
                                    width: '33.33%' // This ensures 3 items per row
                                }}>
                                     <TouchableOpacity onPress={()=>navigation.navigate(Screen.CropDetailScreen)}>
                                    <Image
                                        source={item.image }
                                        style={{ width: 94, height: 94}}
                                    />
                                    <Text style={{ marginTop: 8, fontSize: 14, color: '#333', textAlign: 'center' }}>
                                        {item.name}
                                    </Text>
                                     </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default CropAdvisoryScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollView: {
        flex: 1,
    },
    myCropSection: {
        backgroundColor: '#FFFBDF',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    section: {
        // backgroundColor: '#FFFBDF',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 10,
    },

    divider: {
        height: 8,
        backgroundColor: '#f1f3f4',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffffffd0',
        paddingVertical: 12,
        borderRadius: 8,
        // marginTop: 20
    },
    tabButton: {
        alignItems: 'center',
        flex: 1
    },
    tabInner: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6
    },
    tabText: {
        fontSize: 16,
        color: '#444'
    },
    activeTabText: {
        color: '#01AD41',
        fontWeight: 'bold'
    },
    badge: {
        minWidth: 20,
        height: 20,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6
    },
    badgeActive: {
        backgroundColor: '#01AD41'
    },
    badgeInactive: {
        backgroundColor: '#E5E5E5'
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600'
    },
    greenUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        top: 58,
        marginTop: 4,
        height: 2,
        backgroundColor: '#01AD41',
        width: '100%'
    },
    inactiveTabText: {
        color: '#555',
    },
     addButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 8,
  },
});
