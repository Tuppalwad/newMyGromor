import React, { useState } from "react";
import { 
  View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView 
} from "react-native";
// import { Ionicons, Feather } from "@expo/vector-icons";
import plantix from '../../../../assets/images/common/plantix.png'
import CustomHeader from "../../../../components/common/CustomHeader";

export default function HealthyCropScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHealth, setSelectedHealth] = useState("Healthy");

  const handleSelect = (value) => {
    setSelectedHealth(value);
    setModalVisible(false);
  };

  return (
    <>
      {/* Header */}
          <CustomHeader
                type="crop doctor"
                topTitle="Predicted Diagnosis"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
                style={styles.header}
              />
    

<ScrollView contentContainerStyle={styles.container}>
      {/* Image */}

      <Image
        source={{ uri: "https://images.unsplash.com/photo-1627894480162-f3e6ef8e68b9?auto=format&fit=crop&w=800&q=80" }}
        style={styles.image}
      />

      {/* Crop Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Crop Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Input Crop</Text>
          <Text style={styles.value}>Mango</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Identified Crop</Text>
          <Text style={styles.value}>Mango</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Crop Health</Text>
          <Text style={styles.value}>Healthy</Text>
        </View>

        {/* green line */}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Image Quality</Text>
          <Text style={styles.value}>Good</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Diagnosis Date</Text>
          <Text style={styles.value}>10-07-2025</Text>
        </View>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        {/* <Ionicons name="information-circle-outline" size={18} color="#d97706" /> */}
        <Text style={styles.infoText}>
          Please check if your crop damage is matching with any below diseases.
        </Text>
      </View>

      {/* Dropdown (Modal) */}
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{selectedHealth}</Text>
        {/* <Ionicons name="chevron-down" size={20} color="#000" /> */}
      </TouchableOpacity>

      {/* Modal for Dropdown */}
      {/* <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Crop Health</Text>
            {["Healthy", "Mild Infection", "Severe Infection"].map((item) => (
              <Pressable 
                key={item}
                style={styles.modalOption}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.modalText}>{item}</Text>
              </Pressable>
            ))}
            <Pressable 
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}

      {/* Footer */}
      <View style={{borderWidth:1,borderColor:'#a9a8a8ff',alignSelf:'center',bottom: 0, position: 'absolute',width:'100%'}}>

      <Image source={plantix} style={{ width: 181, height: 32, alignSelf: 'center',  }} />
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {height: '100%',
    // position: "relative",
    // backgroundColor: "#f9fafb",
    // paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
  },
  card: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    color: "#555",
  },
  value: {
    fontWeight: "600",
    color: "#000",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff7ed",
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  infoText: {
    flex: 1,
    color: "#92400e",
    fontSize: 13,
    marginLeft: 8,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    marginTop: 15,
    color: "#6b7280",
    fontSize: 13,
  },
  brand: {
    color: "#059669",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 15,
    color: "#111",
  },
  modalClose: {
    marginTop: 15,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#ef4444",
    fontWeight: "600",
  },
});
