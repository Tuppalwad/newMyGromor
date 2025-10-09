import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
// import { MaterialIcons, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons'; // For icons

const CropDetails = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Mango</Text>

            {/* Details Box */}
            <View style={styles.detailsBox}>
                <Text style={styles.sectionTitle}>Details</Text>

                <View style={styles.detailRow}>
                    {/* <MaterialIcons name="calendar-today" size={20} color="green" /> */}
                    <Text style={styles.detailLabel}>Sowing Date:</Text>
                    <Text style={styles.detailValue}>05-07-2025</Text>
                </View>

                <View style={styles.detailRow}>
                    {/* <FontAwesome5 name="map-marked-alt" size={18} color="green" /> */}
                    <Text style={styles.detailLabel}>Coverage Area:</Text>
                    <Text style={styles.detailValue}>2 acres</Text>
                </View>

                <View style={styles.detailRow}>
                    {/* <Ionicons name="per/son" size={20} color="green" /> */}
                    <Text style={styles.detailLabel}>Ownership:</Text>
                    <Text style={styles.detailValue}>Own</Text>
                </View>

                <View style={styles.detailRow}>
                    {/* <Entypo name="leaf" size={20} color="green" /> */}
                    <Text style={styles.detailLabel}>Soil Type:</Text>
                    <Text style={styles.detailValue}>Red Soil</Text>
                </View>

                <View style={styles.detailRow}>
                    {/* <Entypo name="drop" size={20} color="green" /> */}
                    <Text style={styles.detailLabel}>Irrigation Type:</Text>
                    <Text style={styles.detailValue}>Flood Irrigation</Text>
                </View>

                {/* Edit Button */}
                <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>

            {/* Crop Stage Tracker */}
            <View style={styles.stageBox}>
                <Text style={styles.sectionTitle}>Crop Stage</Text>

                {/* Stage 1: Sow */}
                <View style={styles.stageItem}>
                    <View style={styles.checkedCircle} />
                    <View style={styles.stageInfo}>
                        <Text style={styles.stageTitle}>Sowed</Text>
                        <Text style={styles.stageDate}>Wednesday, 06-05-2025</Text>
                    </View>
                </View>

                {/* Stage 2: Irrigation - Ongoing */}
                <View style={styles.stageItem}>
                    <View style={styles.ongoingCircle} />
                    <View style={styles.stageInfo}>
                        <Text style={styles.stageTitle}>Irrigation</Text>
                        <Text style={styles.stageStatus}>Ongoing Stage</Text>
                    </View>
                </View>

                {/* Stage 3: Pending */}
                {['Crop Growth & Maintenance', 'Flowering & Pollination', 'Harvesting'].map((stage, index) => (
                    <View key={index} style={styles.stageItem}>
                        <View style={styles.pendingCircle} />
                        <View style={styles.stageInfo}>
                            <Text style={styles.stageTitle}>{stage}</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Delete Button */}
            <TouchableOpacity style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Delete Crop</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CropDetails;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        paddingBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    detailsBox: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailLabel: {
        marginLeft: 10,
        color: '#333',
        fontWeight: '600',
        flex: 1,
    },
    detailValue: {
        fontWeight: '500',
        color: '#555',
    },
    editBtn: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'orange',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 6,
        marginTop: 12,
    },
    editText: {
        color: 'orange',
        fontWeight: '600',
    },
    stageBox: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
    },
    stageItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    stageInfo: {
        marginLeft: 12,
        flex: 1,
    },
    stageTitle: {
        fontWeight: '600',
        fontSize: 14,
        color: '#333',
    },
    stageDate: {
        fontSize: 13,
        color: 'gray',
        marginTop: 2,
    },
    stageStatus: {
        fontSize: 13,
        color: 'orange',
        marginTop: 2,
    },
    checkedCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    ongoingCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: 'orange',
        borderWidth: 2,
        marginTop: 4,
    },
    pendingCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: '#999',
        borderWidth: 1,
        marginTop: 4,
    },
    deleteBtn: {
        marginTop: 24,
        backgroundColor: 'green',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
