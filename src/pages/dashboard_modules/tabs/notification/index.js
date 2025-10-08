import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import dotIcon from '../../../../assets/images/common/dotIcon.png';
import greenBell from '../../../../assets/images/splash/BellIcon.png'
import CustomHeader from "../../../../components/common/CustomHeader";
// Sample notifications
const notifications = [
    {
        id: "1",
        title: "Service added ✅",
        description: "A new service has been added with service id ss250405750765.",
        time: "30 Jun 25, 8:48 pm",
    },
    {
        id: "2",
        title: "Service completed 🎉",
        description: "Your service with service id ss250404806181 has been completed",
        time: "30 Jun 25, 8:48 pm",
    },
    {
        id: "3",
        title: "Service rescheduled ⏰",
        description: "Your service with service id ss250405756248 has been rescheduled.",
        time: "30 Jun 25, 8:48 pm",
    },
    {
        id: "4",
        title: "Prepare for Irrigation 🌱",
        description: "Your cotton crop is ready for next stage.",
        time: "30 Jun 25, 8:48 pm",
    },
];

const NotificationScreen = ({ navigation }) => {
    const [data, setData] = useState(notifications);
    const [menuVisible, setMenuVisible] = useState(false);

    const clearAll = () => {
        setData([]);
        setMenuVisible(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={greenBell} style={{ tintColor: '#1E8153', width: 16, height: 18 }} />
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Notification</Text>
                <View style={styles.headerIcons}>
            {/* Notifications icon */}
            <TouchableOpacity style={{ marginRight: 15 }}>
                        <Text>🔔</Text>
                    </TouchableOpacity>

            {/* 3-dot menu */}
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                        <Image
                            source={dotIcon} // your 3-dot image path
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <CustomHeader
                type=""
                topTitle="Notification"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            /> */}

            {/* Notification List */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/* Custom Menu Modal */}
            <Modal
                transparent={true}
                visible={menuVisible}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={clearAll}>
                            <Text style={styles.menuItem}>Clear All</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F8F4",
        padding: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    card: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#FFF",
        gap: 10, 
        marginTop: 5,                                                   
            
    },
    title: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    desc: {
        lineHeight: 20,
        width: 250,
        color: "#444",
        marginBottom: 5,
        fontSize: 14,
        lineHeight: 18,
    },
    time: {
        fontSize: 12,
        color: "gray",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 50,
        paddingRight: 10,
    },
    menu: {
        backgroundColor: "#fff",
        borderRadius: 5,
        elevation: 5,
        padding: 10,
        width: 120,
    },
    menuItem: {
        paddingVertical: 8,
        fontSize: 16,
    },
});

export default NotificationScreen;
