import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

// Static local images (replace with your assets)
import coverImg from "../../../../assets/images/common/cover.png";
import profileImg from "../../../../assets/images/common/FarmerImag.png";
import post1Img from "../../../../assets/images/common/farmLand.png";
import post2Img from "../../../../assets/images/common/farmLand.png";
import verifiedIcon from "../../../../assets/images/common/verified.png";
import moreIcon from "../../../../assets/images/common/more.png";
import likeIcon from "../../../../assets/images/common/like.png";
import commentIcon from "../../../../assets/images/common/comment.png";
import shareIcon from "../../../../assets/images/common/share.png";
import CustomHeader from "../../../../components/common/CustomHeader";

const FeedCard = ({ profile, name, location, time, postImg, title, tag }) => {
    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <Image source={profile} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>
                        {name}{" "}
                        <Image source={verifiedIcon} style={styles.verified} resizeMode="contain" />
                    </Text>
                    <Text style={styles.location}>{location}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <TouchableOpacity>
                    <Image source={moreIcon} style={{ width: 18, height: 18, tintColor: "#555" }} />
                </TouchableOpacity>
            </View>

            {/* Post Image */}
            <Image source={postImg} style={styles.postImg} resizeMode="cover" />

            {/* Post Title */}
            <Text style={styles.postTitle}>{title}</Text>

            {/* Tag */}
            <View style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <View style={styles.actionRow}>
                    <Image source={likeIcon} style={styles.actionIcon} />
                    <Text style={styles.actionText}>678</Text>
                </View>
                <View style={styles.actionRow}>
                    <Image source={commentIcon} style={styles.actionIcon} />
                    <Text style={styles.actionText}>40</Text>
                </View>
                <View style={styles.actionRow}>
                    <Image source={shareIcon} style={styles.actionIcon} />
                    <Text style={styles.actionText}>60</Text>
                </View>
            </View>
        </View>
    );
};

const MyFeedsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#F2F5F4" }}>
            <CustomHeader
                type="Feeds"
                topTitle="My Feeds"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log("Cart pressed")}
                onNotificationPress={() => console.log("Notification pressed")}
            />

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Cover Section */}
                <View style={styles.cover}>
                    <Image source={coverImg} style={{ width: 60, height: 60 }} resizeMode="contain" />
                    <Text style={styles.coverText}>View all your posts here</Text>

                </View>

                {/* Total Feeds */}
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 16 }}>
                    <Text style={styles.totalFeeds}>Total 4 Feeds</Text>
                    <TouchableOpacity style={styles.newPostBtn}>
                        <Text style={{ color: "#fff", fontWeight: "600" }}>+ New Post</Text>
                    </TouchableOpacity>
                </View>

                {/* Feed List */}
                <FeedCard
                    profile={profileImg}
                    name="Kissankal Yadav"
                    location="Kolhapur, Maharashtra"
                    time="30 Jun 25, 8:43 pm"
                    postImg={post1Img}
                    title="How to grow water spinach in plastic bottles with water very easily and quickly?"
                    tag="Spinach"
                />
                <FeedCard
                    profile={profileImg}
                    name="Kissankal Yadav"
                    location="Kolhapur, Maharashtra"
                    time="30 Jun 25, 8:43 pm"
                    postImg={post2Img}
                    title="How to grow water spinach in plastic bottles with water very easily and quickly?"
                    tag="Spinach"
                />
            </ScrollView>
        </View>
    );
};

export default MyFeedsScreen;

const styles = StyleSheet.create({
    cover: {
        backgroundColor: "#fff",
        margin: 12,
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    coverText: {
        marginTop: 8,
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    newPostBtn: {
        backgroundColor: "#2E8B57",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    totalFeeds: {
        fontSize: 13,
        color: "#555",
    },
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 8,
        paddingBottom: 8,
        overflow: "hidden",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    name: {
        fontWeight: "600",
        fontSize: 14,
        color: "#222",
    },
    verified: {
        width: 14,
        height: 14,
        marginLeft: 4,
    },
    location: {
        fontSize: 12,
        color: "#777",
    },
    time: {
        fontSize: 11,
        color: "#999",
    },
    postImg: {
        width: "100%",
        height: 180,
    },
    postTitle: {
        paddingHorizontal: 12,
        marginTop: 8,
        fontSize: 13,
        color: "#333",
    },
    tag: {
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: "#e6f7e6",
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 4,
        alignSelf: "flex-start",
    },
    tagText: {
        fontSize: 12,
        color: "#2E8B57",
        fontWeight: "600",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 6,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        marginHorizontal: 12,
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionIcon: {
        width: 16,
        height: 16,
        tintColor: "#01AD41",
        marginRight: 4,

        resizeMode: 'contain'
    },
    actionText: {
        fontSize: 13,
        color: "#444",
    },
});
