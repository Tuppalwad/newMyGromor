import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import PostQuery from '../../../../assets/images/common/PostQuery.png';
import VideoConsultation from '../../../../assets/images/common/VideoConsultation.png';
import PhysicalConsultation from '../../../../assets/images/common/PhysicalConsultation.png'
import LinearGradient from "react-native-linear-gradient";
import timer from '../../../../assets/images/splash/timer.png'
// import complete from '../../../../assets/images/common/success.png'
import filter from '../../../../assets/images/common/filter.png'
import rightArrow from '../../../../assets/images/common/rightArrow.png';


const queries = [
  {
    id: "6404",
    description: "Dummy text Lorem ipsum dol...",
    type: "Post",
    date: "06-05-2025",
    status: "In-progress",
  },
  {
    id: "3796",
    description: "",
    type: "Post",
    date: "06-05-2025",
    status: "Completed",
  },
  {
    id: "3796",
    description: "",
    type: "Physical Consultation",
    date: "06-05-2025",
    status: "Completed",
  },
];


const QuriesScreen = () => {
  const renderStatus = (status) => {
    const isCompleted = status === "Completed";
    return (
      <View
        style={[
          styles.statusContainer,
          { backgroundColor: isCompleted ? "#E8F8EE" : "#FFF8E1" },
        ]}
      >
        <Image source={timer}
          size={14}
          color={isCompleted ? "#32C86E" : "#E5B700"}
          style={{ marginRight: 4, tintColor: isCompleted ? "#32C86E" : "#E5B700", height: 12, width: 12 }}
        />
        <Text
          style={[
            styles.statusText,
            { color: isCompleted ? "#32C86E" : "#E5B700" },
          ]}
        >
          {status}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.queryId}>Query ID</Text>
        {renderStatus(item.status)}
      </View>
      <Text style={styles.queryNumber}>{item.id}</Text>
      <View style={styles.greenUnderline}></View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View>
        <Text style={styles.description}>
          <Text style={styles.bold}>Description: </Text>
          <Text style={{ fontWeight: 400, fontSize: 13, color: '#4E4E4E' }}>{item.description}</Text>
        </Text>
        <Text style={styles.queryDetail}>
          <Text style={styles.bold}>Query Type: </Text>
          {item.type}
        </Text>
        <Text style={styles.queryDetail}>
          <Text style={styles.bold}>Query Date: </Text>
          {item.date}
        </Text>
      </View>
      <View style={{marginTop:10}}>
        <TouchableOpacity onPress={() => onPressItem(item)}>
          <Image source={rightArrow} style={{ width: 16, height: 16, tintColor: '#000', resizeMode: 'contain', }} />
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );



  return (<>
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Ask the Expert</Text>
        <Text style={styles.subtitle}>Select how you want to consult</Text>

        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.optionCard}>
            <Image
              source={PostQuery} // replace with your icon
              style={styles.icon}
            />
            <Text style={styles.optionText}>Post a Query</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard}>
            <Image
              source={VideoConsultation} // replace with your icon
              style={styles.icon}
            />
            <Text style={styles.optionText}>Video Consultation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard}>
            <Image
              source={PhysicalConsultation} // replace with your icon
              style={styles.icon}
            />
            <Text style={styles.optionText}>Physical Consultation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    <View style={{ marginTop: 20 }}>

      <Text style={styles.totalText}>Total 3 Queries</Text>

      <FlatList
        data={queries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Filter Bar */}
      <LinearGradient
        colors={["#52C234", "#06B34F"]}
        style={styles.filterBar}
      >
        <TouchableOpacity style={styles.filterButton}>
          <Image source={filter} />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 8,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  optionCard: {
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: 90,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 6,
    resizeMode: "contain",
  },
  optionText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 12,
    marginTop: 10,
    // marginBottom: 12,
    elevation: 2,
    position: "relative",
    marginHorizontal: 10
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  queryId: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  queryNumber: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    marginBottom: 4,
    // lineHeight:10
  },
  description: {
    fontSize: 13,
    fontWeight: 600,
    color: "#4E4E4E",
    marginTop: 10,

  },
  queryDetail: {
    fontSize: 13,
    fontWeight: 400,
    color: "#4E4E4E",
    marginBottom: 2,
  },
  bold: {
    fontWeight: "600",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  greenUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 33,
    marginTop: 20,
    height: 1,
    backgroundColor: '#01AD41',
    width: '100%',
    marginLeft: 15,
    justifyContent: 'center'
  },
  totalText: {
    fontSize: 12,
    fontWeight: 500,
    color: "#4E4E4E",
    marginLeft: 10
  }
});

export default QuriesScreen;
