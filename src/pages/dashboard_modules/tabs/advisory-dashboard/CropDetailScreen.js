import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import CustomHeader from "../../../../components/common/CustomHeader";
// import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import mango from '../../../../assets/images/common/mango.png'
import calender from '../../../../assets/images/common/calender.png'
import irrigation from '../../../../assets/images/common/irrigation.png'
import acres from '../../../../assets/images/common/acres.png'
import floodIrrigation from '../../../../assets/images/common/floodIrrigation.png'
import leaf from '../../../../assets/images/common/crop.png'
const CropDetailsScreen = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleSection = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const sections = [
    {
      title: "Planning & Preparation",
      icon: leaf,
      color: "#00A36C",
      items: ["Introduction", "Mango cultivation method", "Planting method"],
    },
    {
      title: "Nutrient & Growth Management",
      icon: leaf,
      color: "#00A36C",
      items: ["Nutrient Management", "Nutrient deficiency symptoms and their management"],
    },
  ];

  return (
    <>
<CustomHeader
                    type="services"
                    topTitle="crop Detail"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                    style={styles.header}
                />

    <ScrollView style={styles.container}>

      {/* Crop Summary */}
      <View style={styles.cropCard}>
        <View style={styles.rowBetween}>
          <View style={styles.greenBadge}>
            {/* <Ionicons name="checkmark-circle" color="#fff" size={16} /> */}
            <Text style={styles.badgeText}>In your "My Crop"</Text>
          </View>
          <Text style={styles.viewSummary}>View Summary →</Text>
        </View>

        <View style={styles.cropInfo}>
          <Image
            source={mango}
            style={styles.cropImage}
          />
          <View style={styles.cropDetails}>
            <Text style={styles.cropName}>Mango</Text>
            <View style={styles.greenUnderline}></View>
              <Text style={{fontSize:12,fontWeight:500,marginTop:10}}>Showing Details</Text>
            <View style={styles.sowingDetails}>
              <View style={[styles.detailRow,{marginTop:10}]}>
                {/* <MaterialIcons name="event" size={18} color="#00A36C" /> */}
                <Image source={calender} style={{width:18,height:20}}/>
                <Text style={styles.detailText}>07 Apr 2025</Text>
              </View>
              <View style={styles.detailRow}>
                <Image source={irrigation} style={{width:18,height:20}}/>
                {/* <Ionicons name="water-outline" size={18} color="#00A36C" /> */}
                <Text style={styles.detailText}>Irrigation Stage</Text>
              </View>
              <View style={styles.detailRow}>
                <Image source={acres} style={{width:18,height:20}}/>
                {/* <Ionicons name="crop-outline" size={18} color="#00A36C" /> */}
                <Text style={styles.detailText}>2 acres</Text>
              </View>
              <View style={styles.detailRow}>
                <Image source={floodIrrigation} style={{width:18,height:20}}/>
                {/* <Ionicons name="rainy-outline" size={18} color="#00A36C" /> */}
                <Text style={styles.detailText}>Flood Irrigation</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Sections */}
      {sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            {/* <Ionicons name={section.icon} size={18} color={section.color} /> */}
            <Image source={section.icon} style={{height:20,width:20}}/>
            <Text style={[styles.sectionTitle, { color: section.color }]}>{section.title}</Text>
          </View>

          {section.items.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.accordionItem}
              onPress={() => toggleSection(`${section.title}-${idx}`)}
            >
              <View style={styles.accordionHeader}>
                <Text style={styles.accordionTitle}>{item}</Text>
                {/* <Ionicons */}
                  {/* name={expanded === `${section.title}-${idx}` ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#666"
                /> */}
              </View>

              {expanded === `${section.title}-${idx}` && (
                <Text style={styles.accordionContent}>
                  This section provides detailed information about {item.toLowerCase()}.
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
 </>
  );
};

export default CropDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9f8", paddingHorizontal: 12 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  headerIcons: { flexDirection: "row" },
  icon: { marginHorizontal: 8 },

  cropCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  greenBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00A36C",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  badgeText: { color: "#fff", fontSize: 12, marginLeft: 4 },
  viewSummary: { color: "#00A36C", fontWeight: "600", fontSize: 13 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cropInfo: { flexDirection: "row", marginTop: 10 },
  cropImage: { width: 100, height: 100, borderRadius: 4 },
  cropDetails: { flex: 1, marginLeft: 10 },
  cropName: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  sowingDetails: { gap: 10 },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  detailText: { fontSize: 13, color: "#4E4E4E",fontWeight:400 },

  sectionContainer: { marginTop: 12 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  sectionTitle: { fontSize: 14, fontWeight: "700", marginLeft: 6 },

  accordionItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 4,
  },
  accordionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  accordionTitle: { fontSize: 14, color: "#000", fontWeight: "500" },
  accordionContent: { marginTop: 6, color: "#555", fontSize: 13 },
 greenUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        top: 33,
        // marginTop: 4,
        height: 1,
        backgroundColor: '#01AD41',
        width: '100%'
    },
});
