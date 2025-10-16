import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import CustomHeader from '../../../../components/common/CustomHeader';
// import { Ionicons, Feather } from '@expo/vector-icons';
import postTypeQuery from '../../../../assets/images/common/queryPostType.png';
import inProgress from '../../../../assets/images/splash/timer.png'
const PostQueryDetail = () => {
    const navigation = useNavigation();
    return (
        <>

            {/* Header */}
            <View>
                <CustomHeader
                    type="services"
                    topTitle="Query Detail"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                    style={styles.header}
                />
            </View>
            <ScrollView style={styles.container}>
                {/* Query Card */}
                <View style={styles.queryCard}>
                    <Image source={postTypeQuery} style={{ width: 24, height: 24 }} />
                    <View style={{ alignItems: 'center', marginVertical: 8 }}>
                        <Text style={styles.queryId}>Query ID</Text>
                        <Text style={styles.queryNumber}>6404</Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <Image source={inProgress} style={{ width: 16, height: 16, tintColor: '#4E4600', resizeMode: 'contain' }} />
                        <Text style={styles.statusText}>In-progress</Text>
                    </View>
                </View>

                {/* Query Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Query Details</Text>
                    <View style={styles.detailRow}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.detailLabel}>Query Date</Text>
                            <Text style={styles.detailValue}>06-05-2025</Text>
                        </View>
                        <View style={styles.greenUnderline}></View>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.detailLabel}>Query Type</Text>
                            <Text style={styles.detailValue}>Post</Text>
                        </View>
                    </View>
                </View>

                {/* Query Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Query Description</Text>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.descriptionText}>
                            Dummy text lorem ipsum dolor sit amet consectetur. Odio ac viverra
                            ipsum massa nulla cursus orci nulla semper. Risus nulla facilisis
                            feugiat molestie nisi laoreet consequat.
                        </Text>
                    </View>
                </View>

                {/* Files Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Files</Text>

                    {/* Audio file */}
                    <TouchableOpacity style={styles.audioBox}>
                        {/* <Ionicons name="headset-outline" size={22} color="#1E7F5A" /> */}
                        <Text style={styles.audioText}>Tap to play</Text>
                        {/* <Feather name="x-circle" size={18} color="#6B5F00" /> */}
                    </TouchableOpacity>

                    {/* Image thumbnails */}
                    <View style={styles.imageRow}>
                        <TouchableOpacity style={styles.imageCard}>
                            <Image
                                source={{ uri: 'https://placekitten.com/200/200' }}
                                style={styles.image}
                            />
                            <View style={styles.playOverlay}>
                                {/* <Ionicons name="play-circle" size={28} color="#fff" /> */}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imageCard}>
                            <Image
                                source={{ uri: 'https://placekitten.com/201/200' }}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default PostQueryDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF2F1',
        paddingHorizontal: 10,
    },

    queryCard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 4,
        paddingVertical: 20,
        elevation: 2,
        marginVertical: 16,
    },
    queryId: {
        fontSize: 16,
        fontWeight: '600',
        // color: '#888',
        marginTop: 6,
    },
    queryNumber: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        marginBottom: 6,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8D5',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    statusText: {
        color: '#4E4600',
        marginLeft: 5,
        fontSize: 13,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8,
    },
    detailRow: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 4,
        // marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
         paddingHorizontal: 15,
         marginVertical:10
    },
    greenUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        top: 33,
        margin: 8,
        height: 1,
        backgroundColor: '#A3D2B5',
        width: '100%',
        marginLeft: 15,
        justifyContent: 'center'
    },
    detailLabel: {
        color: '#4E4E4E',
        fontSize: 14,
        fontWeight: '400',
    },
    detailValue: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
    },
    descriptionBox: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
    },
    descriptionText: {
        color: '#333',
        lineHeight: 20,
    },
    audioBox: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    audioText: {
        flex: 1,
        textAlign: 'center',
        color: '#000',
        fontWeight: '500',
    },
    imageRow: {
        flexDirection: 'row',
        gap: 10,
    },
    imageCard: {
        flex: 1,
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 100,
    },
    playOverlay: {
        position: 'absolute',
        top: '35%',
        left: '35%',
    },
});
