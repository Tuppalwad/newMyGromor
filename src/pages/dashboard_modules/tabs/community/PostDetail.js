import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
    ScrollView,
} from 'react-native';
// import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import user from '../../../../assets/images/shop/user.png';
import { navigate } from '../../../../router/root-navigation';
import CustomHeader from '../../../../components/common/CustomHeader';
import Farm from '../../../../assets/images/common/communityFarm.png'
import thumb from '../../../../assets/images/common/thumb.png'
import message from '../../../../assets/images/common/message.png'
import share from '../../../../assets/images/common/share.png'
import verifyTick from '../../../../assets/images/common/greenVerifyTick.png'
import savePost from '../../../../assets/images/common/savePost.png'
import pin from '../../../../assets/images/common/pin.png'
import send from '../../../../assets/images/common/send.png'
import dot from '../../../../assets/images/common/grayDot.png'
import LinearGradient from 'react-native-linear-gradient';
import CommanPost from '../../component/commanPost';


const comments = [
    {
        id: '1',
        name: 'Mukesh Kumar Prajapat',
        verified: true,
        pinned: true,
        time: '6h',
        comment:
            'बदला 10-12 दिन में आ जाएगा, 2 हफ्ते में पत्ते! बिना मिट्टी के घर बैठे पालक खाओ!',
        likes: 678,
        profile: user, // replace with your image path
    },
    {
        id: '2',
        name: 'Mukesh Kumar Prajapat',
        verified: true,
        pinned: false,
        time: '10h',
        comment:
            'बदला 10-12 दिन में आ जाएगा, 2 हफ्ते में पत्ते! बिना मिट्टी के घर बैठे पालक खाओ!',
        likes: 580,
        profile: user, // replace with your image path
    },
    {
        id: '3',
        name: 'Mukesh Kumar Prajapat',
        verified: true,
        pinned: false,
        time: '16h',
        comment:
            'बदला 10-12 दिन में आ जाएगा, 2 हफ्ते में पत्ते! बिना मिट्टी के घर बैठे पालक खाओ!',
        likes: 653,
        profile: user, // replace with your image path
    },
];
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
]

const PostDetailScreen = ({navigation}) => {

    const renderPost = ({ item }) => (
        <View style={styles.postCard}>
            <View style={styles.userInfo}>
                <Image
                    source={user} // replace with avatar
                    style={styles.avatar}
                />
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>

                        <Text style={styles.userName}>{item.name}</Text>
                        <Image source={verifyTick} style={{ width: 15, height: 15 }} />
                        <Image source={dot} style={{ height: 3, width: 3, color: '#B4B4B4' }} />
                        <TouchableOpacity style={styles.followButton}>
                            <Text style={{ color: 'green' }}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userLocation}>{item.location}</Text>
                    <Text style={styles.postDate}>{item.date}</Text>
                </View>

            </View>


            <Image
                source={item.image}
                style={styles.postImage}
                resizeMode="cover"
            />
            <Text style={styles.questionText}>{item.question}</Text>

            <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{item.tag}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Image source={thumb} style={{ height: 20, width: 20 }} />
                        <Text>{item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Image source={message} style={{ height: 20, width: 20 }} />
                        <Text>{item.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Image source={share} style={{ height: 15, width: 15, tintColor: "green", resizeMode: "contain" }} />
                        <Text>{item.shares}</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <TouchableOpacity style={styles.actionButton}>
                        <Image source={savePost} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                        <Text>{item.save}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <ScrollView>
                <CustomHeader
                    type=""
                    topTitle="Post Detail"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />

                {/* Post Card */}
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => <CommanPost {...item} navigation={navigation} />}
                />


                {/* Comments Section */}
                <Text style={styles.commentHeader}>5 Comments</Text>

                {comments.map(item => (
                    <View
                        key={item.id}
                        style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 6 }}
                    >
                        {/* Avatar */}
                        <Image source={user} style={styles.commentAvatar} />

                        {/* Comment Card */}
                        <View style={[styles.commentCard, item.pinned && styles.pinnedComment]}>
                            <View style={styles.commentHeaderRow}>
                                <View style={{ flex: 1 }}>
                                    {item.pinned && (
                                        <View style={styles.pinnedLabel}>
                                            <Image
                                                source={pin}
                                                style={{ resizeMode: 'contain', height: 21, width: 21, tintColor: '#FF9800' }}
                                            />
                                            <Text style={styles.pinnedText}>Pinned Comment</Text>
                                        </View>
                                    )}

                                    <View style={styles.commentNameRow}>
                                        <Text style={styles.commentName}>{item.name}</Text>
                                        {item.verified && (
                                            <Image
                                                source={verifyTick}
                                                style={{ height: 16, width: 16, marginLeft: 4 }}
                                            />
                                        )}
                                    </View>

                                    <Text style={styles.commentTime}>{item.time}</Text>
                                    <Text style={styles.commentText}>{item.comment}</Text>

                                    <View style={styles.commentLikeRow}>
                                        <Image source={thumb} style={{ height: 16, width: 16 }} />
                                        <Text style={styles.commentLikeText}>{item.likes}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}


            </ScrollView>

            {/* Comment Input */}
            <View style={styles.commentInputRow}>
                <Image
                    source={user}
                    style={styles.commentAvatar}
                />
                <TextInput
                    placeholder="Write your comment"
                    style={styles.commentInput}
                />
                <TouchableOpacity style={styles.sendBtn}>
                    <LinearGradient
                        colors={['#1E8153', '#4EA618']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ padding: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center', height: 40, width: 40, }}
                    >

                        <Image source={send} style={{ resizeMode: 'contain', height: 24, width: 24 }} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F7F7' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    headerTitle: { fontSize: 18, fontWeight: '600' },
    headerIcons: { flexDirection: 'row', alignItems: 'center' },
    icon: { marginRight: 10 },

    postCard: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    userName: { fontWeight: 'bold' },
    userLocation: { color: 'gray', fontSize: 12 },
    postDate: { color: 'gray', fontSize: 10 },
    followButton: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    postImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
    questionText: { fontSize: 14, marginBottom: 5 },
    tagContainer: {
        backgroundColor: '#e0f2e9',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        marginBottom: 10,
    },
    tagText: { color: 'green', fontWeight: 'bold', fontSize: 12 },
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
    actionButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },

    commentHeader: {
        fontSize: 15,
        fontWeight: '600',
        marginHorizontal: 14,
        marginTop: 8,
    },
    // commentCard: {
    //     backgroundColor: '#fff',
    //     marginHorizontal: 10,
    //     marginTop: 10,
    //     padding: 10,
    //     borderRadius: 10,
    // },
    commentAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
        marginTop: 4,
    },

    commentCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    pinnedComment: { backgroundColor: '#FFF7E6' },
    commentHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    // commentAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
    commentNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    commentName: { fontWeight: '600', fontSize: 14 },
    commentTime: { color: '#777', fontSize: 12 },
    commentText: { marginTop: 6, color: '#333', fontSize: 13, fontWeight: '700' },
    commentLikeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    commentLikeText: { marginLeft: 4, color: '#333', fontSize: 12 },

    pinnedLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#FFF0D4',
        borderRadius: 6,
        paddingHorizontal: 6,
        // paddingVertical: 2,
    },
    pinnedText: { color: '#FF9800', fontSize: 10, fontWeight: '500' },

    commentInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 13,
        marginRight: 8,
    },
    sendBtn: {
        // backgroundColor: '#00B761',
        padding: 0,
        borderRadius: 10,
    },
});
