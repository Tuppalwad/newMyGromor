import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import user from '../../../../assets/images/shop/user.png';
import Farm from '../../../../assets/images/common/communityFarm.png'
import thumb from '../../../../assets/images/common/thumb.png'
import message from '../../../../assets/images/common/message.png'
import share from '../../../../assets/images/common/share.png'
import verifyTick from '../../../../assets/images/common/greenVerifyTick.png'
import savePost from '../../../../assets/images/common/savePost.png'
import { navigate } from '../../../../router/root-navigation';
import CustomHeader from '../../../../components/common/CustomHeader';
import dot from '../../../../assets/images/common/grayDot.png'
import postAddIcon from '../../../../assets/images/common/postAddIcon.png'
import LinearGradient from 'react-native-linear-gradient';
import PostDetailScreen from './PostDetail';
import { Screen } from '../../../../router/screen';
import CommanPost from '../../component/commanPost';

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

const Community = ({ navigation }) => {
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

            <TouchableOpacity onPress={() => navigation.navigate(Screen.PostDetail)}    >
                <Image
                    source={item.image}
                    style={styles.postImage}
                    resizeMode="cover"
                />
                <Text style={styles.questionText}>{item.question}</Text>
            </TouchableOpacity>
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
    );

    return (

        <>
            <CustomHeader
                type=""
                topTitle="Community"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />
            <View style={styles.container}>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={(item)=><CommanPost {...item} navigation={navigation} />}
                    ListHeaderComponent={() => (
                        <Text style={styles.headerText}>
                            Join 30,00,000+ Farmers Community
                        </Text>
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
                <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate(Screen.NewPost)}>
                    <LinearGradient
                        colors={['#1E8153', '#4EA618']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ padding: 10, borderRadius: 25, flexDirection: 'row', gap: 6, alignItems: 'center', width: 110, justifyContent: 'center', height: 45 }}
                    >

                        <Image source={postAddIcon} style={{ height: 24, width: 24, resizeMode: "contain" }} /><Text style={{ color: 'white', fontSize: 18, fontWeight: 600 }}> Post</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </>
    );
};
export default Community;
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EEF2F1' },
    headerText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
        color: '#a3d9a5',
        fontWeight: '700',
    },
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
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: '25%',
        // backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        elevation: 5,
    },
});

