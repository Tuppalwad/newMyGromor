import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import CustomHeader from '../../../../components/common/CustomHeader'
import GroupIcon from '../../../../assets/images/common/publicGroup.png'
import removeImg from '../../../../assets/images/common/removeIcon.png'
import righArrow from '../../../../assets/images/common/rightArrow.png'

const MyPublicGroups = ({ navigation }) => {
    const groups = [
        {
            id: 1,
            name: "Chilli",
            memberCount: 1,
            image: require('../../../../assets/images/common/savedFeed.png')
        },
        {
            id: 2,
            name: "Bottle Gourd",
            memberCount: 79,
            image: require('../../../../assets/images/common/savedFeed.png')
        }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "#F2F5F4" }}>
            <CustomHeader
                type="Groups"
                topTitle="My Groups"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log("Cart pressed")}
                onNotificationPress={() => console.log("Notification pressed")}
            />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.sectionHeader}>
                <Image
                    source={GroupIcon}
                    style={{ width: 100, height: 80, resizeMode: 'contain' }}
                />
                <Text style={styles.sectionTitle}>Groups you are part of</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.totalGroups}>Total {groups.length} Joined</Text>

                {/* Groups List */}
                <ScrollView style={styles.groupsContainer} showsVerticalScrollIndicator={false}>
                    {groups.map((group) => (
                        <View key={group.id} style={styles.groupCard}>
                            {/* Group Image and Content */}
                            <View style={styles.groupContent}>
                                {/* Group Image */}
                                <Image
                                    source={group.image}
                                    style={styles.groupImage}
                                    resizeMode="cover"
                                />

                                {/* Group Details */}
                                <View style={styles.groupDetails}>
                                    {/* Top Row: Name and Remove Button */}
                                    <View style={styles.topRow}>
                                        <Text style={styles.groupName}>{group.name}</Text>
                                        <TouchableOpacity style={styles.removeButton}>
                                            <Image
                                                source={removeImg}
                                                style={styles.removeIcon}
                                            />
                                            <Text style={styles.removeText}>Join Group</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Separator Line */}
                                    <View style={styles.separator}></View>

                                    {/* Members Info */}
                                    <View style={styles.memberContainer}>
                                        <Text style={styles.memberText}>
                                            Group Members {group.memberCount}
                                        </Text>
                                        <Image
                                            source={righArrow}
                                            style={{ width: 15, height: 15, resizeMode: 'contain', tintColor: '#000' }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default MyPublicGroups

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 16,
    },
    searchContainer: {
        marginBottom: 10,
    },
    searchInput: {
        padding: 10,
        height: 50,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff'
    },
    sectionHeader: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginTop: 4,
    },
    totalGroups: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    groupsContainer: {
        flex: 1,
    },
    groupCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    groupContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    groupImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#E5E5E5',
        marginRight: 12,
    },
    groupDetails: {
        flex: 1,
        flexDirection: 'column',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    groupName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    removeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderColor: "#147045",
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    removeIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    removeText: {
        color: '#147045',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#A3D2B5',
        marginBottom: 8,
    },
    memberContainer: {
        justifyContent: 'space-between',
        flexDirection: "row",
        // backgroundColor: '#F8F9FA',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        // alignSelf: 'flex-start',
    },
    memberText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
})