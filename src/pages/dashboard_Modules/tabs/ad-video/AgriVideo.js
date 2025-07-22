// AgriVideo.js

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview'; // ✅ WebView import
import { useOperation } from '../../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { createLoadingSelector } from '../../../../redux/loading-reducer';
import { UserManager } from '../../../../storage';
import { ProductType } from '../../../../redux/product/type';
import { isEmpty } from '../../../../utils/validator';
import CustomHeader from '../../../../components/common/CustomHeader';
import { extractVideoData } from '../../../../utils/utils';
import FilterModal from '../../../product_Modules/components/FilterModal';

const categories = ['All', 'Newest', 'Most Viewed', 'Learning', 'Advisory'];

const videos = [
    {
        id: '1',
        videoId: '5bQlbxTBteQ',
        title: "Coromandel's Adhiraj Neem based product vs Others comparison video (Telugu)",
        tag: 'Neem',
    },
    {
        id: '2',
        videoId: '5bQlbxTBteQ',
        title: 'Fertilizer recommendation for cotton crops in June',
        tag: 'Cotton',
    },
];

const AgriVideo = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [playingVideoId, setPlayingVideoId] = useState(null);

    const renderCategory = (item) => (
        <TouchableOpacity
            key={item}
            style={[
                styles.categoryButton,
                selectedCategory === item && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(item)}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === item && styles.categoryTextActive,
                ]}
            >
                {item}
            </Text>
            {selectedCategory === item && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
    );

    const renderVideoCard = ({ item }) => {
        const isPlaying = playingVideoId === item.id;

        const { videoId, title } = extractVideoData(item.videoUrl);


        return (
            <View style={styles.card}>
                <View style={styles.thumbnailWrapper}>
                    {isPlaying ? (
                        <View style={styles.videoWrapper}>
                            <WebView
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                allowsFullscreenVideo={true}
                                originWhitelist={['*']}
                                source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                                style={styles.videoPlayer}
                            />
                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => setPlayingVideoId(item.id)} activeOpacity={0.8}>
                            <Image source={{ uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }} style={styles.thumbnail} />
                            <Text style={styles.playIcon}>▶</Text>
                        </TouchableOpacity>
                    )}

                </View>

                <View style={styles.videoTextWrapper}>
                    <View style={styles.tagContainer}>
                        <Text style={styles.tag}>{item.tag}</Text>
                    </View>
                    <Text style={styles.videoTitle}>{title}</Text>
                </View>
            </View>
        );
    };

    const navigate = useNavigation()

    const operation = useOperation();
    const dispatch = useDispatch();
    const isFocussed = useIsFocused();
    const appLanguage = UserManager?.getAppMultiLanguage
    const [params, setParams] = useState({ page: 1, pageSize: 5 })
    const [adsData, setAdsData] = useState([])
    const [adsResponse, setAdsResponse] = useState(null)
    const loadingSelector = createLoadingSelector([ProductType.video]);
    const isLoading = useSelector(state => loadingSelector(state));
    const videoArray = useSelector((state) => state.product.videoArray);
    const [filterVisible, setFilterVisible] = useState(false);

    useEffect(() => {
        if (isFocussed && isEmpty(videoArray)) {
            getVideoAds(params)
        } else {
            setAdsData(videoArray?.data ?? [])
            setAdsResponse({ totalRecords: videoArray?.totalRecords })
        }
    }, [isFocussed])

    const getVideoAds = (params, isEnd = false) => {
        try {
            dispatch(operation.product.getProductVideo(params)).then((res) => {
                if (res?.data) {
                    if (isEnd) {
                        tempArr = [...adsData, ...res?.data]
                    } else {
                        tempArr = [...res?.data]
                    }
                } else {
                    if (isEnd) {
                        tempArr = [...adsData]
                    }
                }
                setAdsData(tempArr)
                setAdsResponse({ totalRecords: res?.totalRecords })
            }).catch((err) => {
                dispatch(operation.user.getErrorHandling(err, "getProductVideo"));
            })
        } catch (e) {

        }
    }

    const onEndReached = () => {
        let total = adsResponse?.totalRecords ?? 0
        let count = adsData?.length
        if (!isLoading && (count < total)) {
            let param = {
                page: params?.page + 1,
                pageSize: params?.pageSize,
            };
            setParams(param)
            getVideoAds(param, true)
        }
    };



    const renderFetchSpinner = () => {
        if (isLoading) {
            return (
                <View style={{ flex: 1, marginVertical: height / 100 * 10 }}>
                    <Indicator isSmall={true} show={isLoading} Indicator={true} />
                </View>
            );
        }
    };

    console.log(videoArray, "cccccccccccccccc")


    return (

        <View style={styles.container}>
            <View style={{ marginTop: 15 }}>
                <CustomHeader
                    type="video"
                    topTitle="Agri Video"
                    subtitle=""
                    onBackPress={() => navigate.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />
            </View>

            {/* Category Filters */}
            <View style={styles.categoryWrapper}>
                {categories.map(renderCategory)}
            </View>

            {/* Video List */}
            <ScrollView style={{ flex: 1 }}>
                <FlatList
                    data={videoArray?.data || []}
                    renderItem={renderVideoCard}
                    onEndReached={() => { onEndReached() }}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </ScrollView>

            {/* Sort & Filter */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => console.log('Sort pressed')}>
                    <Text style={styles.bottomIcon}>⇅</Text>
                    <Text style={styles.bottomText}>Sort by</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.bottomButton} onPress={() => setFilterVisible(true)}>
                    <Text style={styles.bottomIcon}>≡</Text>
                    <Text style={styles.bottomText}>Filters</Text>
                    <View style={styles.dot} />
                </TouchableOpacity>
            </View>
            <FilterModal visible={filterVisible} onClose={() => setFilterVisible(false)} />

        </View>
    );
};

export default AgriVideo;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        paddingTop: 16,
    },
    header: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 12,
    },
    iconText: {
        fontSize: 18,
        marginLeft: 12,
    },
    categoryWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
        marginTop: 20
    },

    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#1E8153',
        backgroundColor: '#fff',
    },

    categoryButtonActive: {
        backgroundColor: '#DFF6E7',
        borderColor: '#1E8153',
    },

    categoryText: {
        fontSize: 14,
        color: '#1E8153',
        fontWeight: '500',
    },

    categoryTextActive: {
        fontSize: 14,
        color: '#1E8153',
        fontWeight: '600',
    },

    checkmark: {
        fontSize: 14,
        color: '#1E8153',
        marginLeft: 6,
        marginTop: 1,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    thumbnailWrapper: {
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
    },
    playIcon: {
        position: 'absolute',
        top: '40%',
        left: '45%',
        fontSize: 32,
        color: 'red',
    },
    videoTextWrapper: {
        padding: 12,
    },
    videoWrapper: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#000',
    },

    videoPlayer: {
        flex: 1,
    },

    playIcon: {
        position: 'absolute',
        top: '40%',
        left: '45%',
        fontSize: 32,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },

    tagContainer: {
        backgroundColor: '#DFF6E7',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    tag: {
        fontSize: 11,
        color: '#1E8153',
        fontWeight: '600',
    },
    videoTitle: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0A8F43', // fallback for gradient
        paddingHorizontal: 16,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderColor: '#ddd',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 8,
    },

    bottomIcon: {
        fontSize: 16,
        color: '#fff',
        marginRight: 8,
        lineHeight: 15
    },

    bottomText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },

    divider: {
        width: 1,
        height: '80%',
        backgroundColor: '#fff',
        opacity: 0.3,
    },

    dot: {
        width: 4,
        height: 4,
        borderRadius: 6,
        backgroundColor: '#FFD700',
        marginLeft: 6,
    },
});