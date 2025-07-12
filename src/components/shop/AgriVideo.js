// AgriVideo.js

import React, { useState } from 'react';
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

const categories = ['All', 'Newest', 'Most Viewed', 'Learning', 'Advisory'];

const videos = [
    {
        id: '1',
        videoId: 'UhGfgh_cZSo',
        title: "Coromandel's Adhiraj Neem based product vs Others comparison video (Telugu)",
        tag: 'Neem',
    },
    {
        id: '2',
        videoId: 'UhGfgh_cZSo',
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
        const thumbnailUri = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;

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
                                source={{ uri: `https://www.youtube.com/embed/${item.videoId}` }}
                                style={styles.videoPlayer}
                            />
                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => setPlayingVideoId(item.id)} activeOpacity={0.8}>
                            <Image source={{ uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg` }} style={styles.thumbnail} />
                            <Text style={styles.playIcon}>▶</Text>
                        </TouchableOpacity>
                    )}

                </View>

                <View style={styles.videoTextWrapper}>
                    <View style={styles.tagContainer}>
                        <Text style={styles.tag}>{item.tag}</Text>
                    </View>
                    <Text style={styles.videoTitle}>{item.title}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Agri Video</Text>
                <View style={styles.headerIcons}>
                    <Text style={styles.iconText}>🔔</Text>
                    <Text style={styles.iconText}>🛒</Text>
                </View>
            </View>

            {/* Category Filters */}
            <View style={styles.categoryWrapper}>
                {categories.map(renderCategory)}
            </View>

            {/* Video List */}
            <FlatList
                data={videos}
                renderItem={renderVideoCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />

            {/* Sort & Filter */}
            <View style={styles.bottomFilterBar}>
                <TouchableOpacity style={styles.sortButton}>
                    <Text style={styles.sortIcon}>⇅</Text>
                    <Text style={styles.sortText}>Sort by</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.sortIcon}>☰</Text>
                    <Text style={styles.sortText}>Filters</Text>
                </TouchableOpacity>
            </View>
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
    bottomFilterBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#DFF6E7',
        paddingVertical: 12,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    sortIcon: {
        fontSize: 16,
        color: '#000',
    },
    sortText: {
        fontSize: 14,
        color: '#000',
    },
});