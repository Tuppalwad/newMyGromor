import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import post from '../../../../assets/images/common/posts.png';
import followers from '../../../../assets/images/common/followers.png';
import following from '../../../../assets/images/common/following.png';
import verifyTick from '../../../../assets/images/common/greenVerifyTick.png';
import user from '../../../../assets/images/shop/user.png';
import share from '../../../../assets/images/common/share.png';
import CustomHeader from '../../../../components/common/CustomHeader';
import CommanPost from '../../component/commanPost';
import Farm from '../../../../assets/images/common/communityFarm.png';
import dotIcon from '../../../../assets/images/common/dotIcon.png';
import report from '../../../../assets/images/common/report.png'
import ReportModal from './ReportModal';
import LinearGradient from 'react-native-linear-gradient';
const posts = [
    {
        id: '1',
        name: 'Kissanlal Yadav',
        location: 'Kolhapur, Maharashtra',
        date: '30 Jun 25, 8:48 pm',
        image: Farm, // replace with your image URL or local asset
        question: 'How to grow water spinach in plastic bottles with water very easily and quickly?',
        tag: 'Spinach',
        likes: 678,
        comments: 14,
        shares: 60,
    },
    {
        id: '2',
        name: 'Mukesh Kumar',
        location: 'Hindoli, Rajasthan',
        date: '15 Apr 25, 9:30 am',
        image: Farm,
        question: 'Sample question here...',
        tag: 'Tomato',
        likes: 123,
        comments: 5,
        shares: 12,
    },
];
const ProfileCard = ({ navigation }) => {
    const [showReport, setShowReport] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    return (
        <>
            <CustomHeader
                type=""
                topTitle="Profile"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />
            <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
                <View style={styles.card}>

                    {/* Profile Image */}
                    <Image
                        source={user} // Replace with actual image path
                        style={styles.profileImage}
                    />

                    {/* Name and Location */}
                    <Text style={styles.name}>
                        Kissanlal Yadav <Image source={verifyTick} style={{ width: 16, height: 16 }} />
                    </Text>
                    <Text style={styles.location}>Kolhapur, Maharashtra</Text>
                    <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20, }} onPress={() => setShowReport(!showReport)}  >
                        <Image source={dotIcon} style={{ height: 20, width: 20, }} />
                        {showReport &&
                            <TouchableOpacity onPress={() => setIsVisible(true)} style={{ position: 'absolute', top: 25, right: 0, backgroundColor: '#fff', padding: 10, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, position: 'absolute', top: 25, right: 0, backgroundColor: '#fff' }}>
                                    <Image source={report} style={{ width: 16, height: 16 }} />
                                    <Text>Report</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </TouchableOpacity>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Image source={post} style={{ width: 24, height: 24 }} />
                            <Text style={styles.statValue}>10</Text>
                            <Text style={styles.statLabel}>Posts</Text>
                        </View>

                        <View style={styles.statBox}>
                            <Image source={followers} style={{ width: 24, height: 24 }} />
                            <Text style={styles.statValue}>1.2K</Text>
                            <Text style={styles.statLabel}>Followers</Text>
                        </View>

                        <View style={styles.statBox}>
                            <Image source={following} style={{ width: 24, height: 24 }} />
                            <Text style={styles.statValue}>56</Text>
                            <Text style={styles.statLabel}>Following</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.shareBtn}>
                            <Image source={share} style={{ width: 18, height: 18, tintColor: '#F58220', resizeMode: 'contain' }} />
                            <Text style={styles.shareText}>Share</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.followBtn}>
                            <LinearGradient
                                colors={['#1E8153', '#4EA618']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ padding: 10, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '100%' }}
                            >

                                <Image source={following} style={{ width: 18, height: 18, tintColor: '#fff' }} />
                                <Text style={styles.followText}>Follow</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, margin: 10 }}>10 Posts</Text>
                    <FlatList
                        data={posts}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => <CommanPost {...item} navigation={navigation} />}
                    />

                </ScrollView>
                <ReportModal
                    isVisible={isVisible}
                    onClose={() => setIsVisible(false)}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        elevation: 4,
        margin: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000',
    },
    location: {
        fontSize: 14,
        color: '#777',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        width: '90%',
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        fontWeight: 'bold',
        color: '#000',
        marginTop: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#777',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '90%',
    },
    shareBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#F58220',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 25,
        width: '48%',
        justifyContent: 'center',   
    },
    shareText: {
        color: '#F58220',
        fontWeight: '600',
        marginLeft: 6,
    },
    followBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        width: '48%',
        justifyContent: 'center',
    },
    followText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 6,
    },
});

export default ProfileCard;
