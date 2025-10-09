import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
// Import your local static images
import tractorImg from "../../../../assets/images/common/tractorImg.png";
import cowImg from "../../../../assets/images/common/cow.png";
import buffaloImg from "../../../../assets/images/common/buffalo.png";
import goatImg from "../../../../assets/images/common/goat.png";
import bikeImg from "../../../../assets/images/common/bike.png";
import carImg from "../../../../assets/images/common/car.png";
import plusIcon from "../../../../assets/images/common/circleplus.png";
import minusIcon from "../../../../assets/images/common/circle_minuse.png";
import CustomHeader from "../../../../components/common/CustomHeader";
import CustomButton from "../../../../components/common/CustomButton";

const CounterRow = ({ icon, label, value, onIncrease, onDecrease }) => {
  return (
    <View style={styles.counterRow}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.counterLabel}>{label}</Text>
      <TouchableOpacity onPress={onDecrease} style={styles.circleBtn}>
        <Image source={minusIcon} style={styles.btnIcon} />
      </TouchableOpacity>
      <Text style={styles.counterValue}>{value}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.circleBtn}>
        <Image source={plusIcon} style={styles.btnIcon} />
      </TouchableOpacity>
    </View>
  );
};

const MyAssets = ({ navigation }) => {

  const [cows, setCows] = useState(1);
  const [buffaloes, setBuffaloes] = useState(0);
  const [goats, setGoats] = useState(2);
  const [twoWheeler, setTwoWheeler] = useState(0);
  const [fourWheeler, setFourWheeler] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: "#F2F5F4" }}>
      <CustomHeader
        type="assets"
        topTitle="My Assets"
        subtitle=""
        onBackPress={() => navigation.goBack()}
        onCartPress={() => console.log("Cart pressed")}
        onNotificationPress={() => console.log("Notification pressed")}
      />

      {/* Tractor Banner */}
      <View style={styles.banner}>
        <Image source={tractorImg} style={{ width: 190, height: 60, resizeMode: 'contain' }} />
        <Text style={styles.bannerText}>Manage your livestock and vehicles</Text>
      </View>

      {/* Livestock */}
      <Text style={styles.sectionTitle}>Livestock</Text>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Select No. of</Text>

        <CounterRow
          icon={cowImg}
          label="Cows"
          value={cows}
          onIncrease={() => setCows(cows + 1)}
          onDecrease={() => setCows(Math.max(0, cows - 1))}
        />
        <CounterRow
          icon={buffaloImg}
          label="Buffaloes"
          value={buffaloes}
          onIncrease={() => setBuffaloes(buffaloes + 1)}
          onDecrease={() => setBuffaloes(Math.max(0, buffaloes - 1))}
        />
        <CounterRow
          icon={goatImg}
          label="Goats"
          value={goats}
          onIncrease={() => setGoats(goats + 1)}
          onDecrease={() => setGoats(Math.max(0, goats - 1))}
        />
      </View>

      {/* Vehicle */}
      <Text style={styles.sectionTitle}>Vehicle</Text>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Select No. of</Text>

        {/* Update Button */}


        <CounterRow
          icon={bikeImg}
          label="2 Wheeler"
          value={twoWheeler}
          onIncrease={() => setTwoWheeler(twoWheeler + 1)}
          onDecrease={() => setTwoWheeler(Math.max(0, twoWheeler - 1))}
        />
        <CounterRow
          icon={carImg}
          label="4 Wheeler"
          value={fourWheeler}
          onIncrease={() => setFourWheeler(fourWheeler + 1)}
          onDecrease={() => setFourWheeler(Math.max(0, fourWheeler - 1))}
        />
      </View>

      <View style={{ position: "absolute", bottom: 0, left: 0 ,width:"100%"}}>
        <CustomButton
          title={"Update"}
        />
      </View>
    </View>
  );
};

export default MyAssets;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bannerText: {
    marginTop: 8,
    color: "#333",
    fontSize: 14,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
    paddingHorizontal: 16
  },
  subTitle: {
    color: "#000",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 12,
    tintColor: "green",
  },
  counterLabel: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  circleBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  btnIcon: {
    width: 16,
    height: 16,
    tintColor: "#01AD41",
  },
  counterValue: {
    width: 24,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  updateBtn: {
    backgroundColor: "#2E8B57",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 10,
  },
});
