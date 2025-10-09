


import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import CustomHeader from '../../../../components/common/CustomHeader';
import profileImg from "../../../../assets/images/common/FarmerImag.png";
import FollowingIcon from "../../../../assets/images/common/following.png";

const followersData = [
  {
    id: '1',
    name: 'Kissanlal Yadav',
    location: 'Kolhapur, Maharashtra',
    image: profileImg, // put your local image
  },
  {
    id: '2',
    name: 'Kissanlal Yadav',
    location: 'Kolhapur, Maharashtra',
    image: profileImg, // put your local image
  },
];

const Following = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F2F5F4" }}>
      <CustomHeader
        type="Followers"
        topTitle="Followers"
        subtitle=""
        onBackPress={() => navigation.goBack()}
        onCartPress={() => console.log("Cart pressed")}
        onNotificationPress={() => console.log("Notification pressed")}
      />

      {/* Top Card */}
      <View style={styles.card}>
        <Image
          source={FollowingIcon} // your static image
          style={{ width: 60, height: 60, marginBottom: 8 }}
          resizeMode="contain"
        />
        <Text style={styles.cardTitle}>People who follow you</Text>
      </View>

      {/* Followers Count */}
      <Text style={styles.totalFollowers}>Total 4 Followers</Text>

      {/* Followers List */}
      <FlatList
        data={followersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.followerCard}>
            <Image source={item.image} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.name}>{item.name}</Text>
                <Image
                  source={require('../../../../assets/images/common/verified.png')} // static verified icon
                  style={styles.verifiedIcon}
                />
              </View>
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <TouchableOpacity style={styles.removeBtn}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default Following

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    paddingVertical: 20,
  },
  cardTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalFollowers: {
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  followerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  verifiedIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  location: {
    fontSize: 12,
    color: '#777',
  },
  removeBtn: {
    backgroundColor: '#E6F5EC',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2E8B57',
  },
  removeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2E8B57',
  },
})
