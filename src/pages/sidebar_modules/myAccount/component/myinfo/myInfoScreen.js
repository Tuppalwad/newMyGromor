import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import CustomHeader from "../../../../../components/common/CustomHeader";
import { Picker } from "@react-native-picker/picker";
import FarmerImage from '../../../../../assets/images/common/FarmerImag.png'
import StoreCard from "../../../../../components/common/StoreCard";
import { useSelector } from "react-redux";
import CustomButton from "../../../../../components/common/CustomButton";
import Calendar from '../../../../../assets/images/common/calendar.png'
import CustomCheckbox from "../../../../../components/common/CustomCheckbox";
import CustomRadioGroup from "../../../../../components/common/CustomRadioGroup";
import { isEmpty } from "../../../../../utils/validator";
import { Dropdown } from "react-native-element-dropdown";
import DropdownComponet from "../../../../../components/common/DropdownComponet";
import { palette } from "../../../../../theme/color";
const PersonaInfoContainer = ({ personalInfo, setPersonalInfo, languageList, handleUpdatePersonal,
  errors, namestate, control, error, handleValidation, setValue, myPreferenceDD,
  isLoading, setDisableSubmitInEdit, farmerAddress, StoreCodeDetails, navigation,
  disableSubmitInEdit, educationDD, addressInfo, setAddressInfo, setappSetData, onPressStoreInfo,
  status, stateList, districtList, villageList, onSelectItem, appLanguage, appSetData,
  villageData, districtData, stateData
}) => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [fpo, setFpo] = useState("yes");
  const [social, setSocial] = useState({
    facebook: false,
    youtube: false,
    whatsapp: false,
    instagram: false,
    agri: false,
    others: false,
  });

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("Telangana");
  const [district, setDistrict] = useState("Adilabad");
  const [village, setVillage] = useState("Begumpet");
  const [pincode, setPincode] = useState("");
  const [selected, setSelected] = useState('');

  const toggleSocial = (key) => {
    setSocial({ ...social, [key]: !social[key] });
  };

  const handleUpdate = () => {
    const payload = {
      fullName,
      dob,
      mobile,
      email,
      education,
      fpo,
      social,
      address1,
      address2,
      state,
      district,
      village,
      pincode,
    };
    console.log("Form Data:", payload);
  };



  const yesNoDropdownData = [
    { label: appLanguage?.yes ?? "Yes", value: true },
    { label: appLanguage?.no ?? "No", value: false },
  ];

  useEffect(() => {
    if (!isEmpty(errors?.name?.message) || !isEmpty(errors?.number?.message)) {
      scrollref.current.scrollTo({ y: 0 });
    }
  }, [errors])

  useEffect(() => {
    if (!isEmpty(namestate?.name?.message)) {
      scrollref.current.scrollTo({ y: 0 });
    }
  }, [namestate])

  useEffect(() => {
    if (personalInfo?.name) {
      setValue('name', personalInfo?.name)
    }
    if (personalInfo?.mobileNumber) {
      setValue('number', personalInfo?.mobileNumber)
    }
    if (personalInfo?.email) {
      setValue('mail', personalInfo?.email)
    }
  }, [languageList, personalInfo])


  const onChange = (selectedDate) => {
    setPersonalInfo({ ...personalInfo, dateOfBirth: selectedDate })
    setDisableSubmitInEdit(false)
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4', }}>
      <CustomHeader
        type="info"
        topTitle="My Information"
        subtitle=""
        onBackPress={() => navigation.goBack()}
        onCartPress={() => console.log("Order pressed")}
        onNotificationPress={() => console.log("Notification pressed")}
      />
      <View style={{ borderRadius: 8, justifyContent: 'center', alignItems: 'center', height: 170, backgroundColor: '#fff', marginHorizontal: 16, marginTop: 15 }}>
        <Image
          source={FarmerImage}
          style={{ width: 100, height: 90 }}
        />
        <Text style={{ fontSize: 14, fontWeight: 333, marginTop: 10 }}>Review and update your details</Text>
      </View>
      <View style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 }}>
        <Text style={{ color: '#F52F2F' }}>*All fields are required</Text>
        <Text style={{ color: '#000', fontSize: 16, fontWeight: 700 }}>Personal Details</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, paddingHorizontal: 16 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ marginBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 16, borderRadius: 8, paddingTop: 5, paddingBottom: 10, backgroundColor: '#fff' }}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={personalInfo?.name ?? ""}
              onChangeText={(text) => {
                onChange(text)
                setPersonalInfo({ ...personalInfo, name: text })
                setDisableSubmitInEdit(false)
              }}
              placeholder="Enter full name"
              placeholderTextColor={"#878787"}

            />
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' }}>

              <View style={{ flexDirection: 'column', width: "48%" }}>
                <Text style={styles.label}>Date of Birth</Text>

                {/* Wrap input and icon together */}
                <View
                  style={{
                    position: 'relative',
                    justifyContent: 'center',
                  }}
                >
                  <TextInput
                    style={{
                      ...styles.input,
                      paddingRight: 35, // add space for the icon inside the input
                    }}
                    value={dob}
                    onChangeText={setDob}
                    placeholder="DD-MM-YYYY"
                    placeholderTextColor="#878787"
                  />

                  {/* Calendar icon inside input */}
                  <Image
                    source={Calendar}
                    style={{
                      width: 20,
                      height: 20,
                      position: 'absolute',
                      right: 10,
                      top: '52%',
                      transform: [{ translateY: -10 }], // center vertically
                    }}
                  />
                </View>
              </View>


              <View style={{ flexDirection: 'column', width: "48%", marginLeft: 10 }}>
                <Text style={styles.label}>{appLanguage?.phone_number ?? "Phone Number"}</Text>
                <Text style={{ backgroundColor: "#EFEFEF", padding: 10, marginTop: 5 }}>
                  {personalInfo?.mobileNumber ?? ""}
                </Text>
              </View>
            </View>

            <Text style={styles.label}>Email Address
              <Text style={{ color: "#F52F2F", fontSize: '14', fontWeight: 400 }}>{' (optional)'}</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={personalInfo?.email}
              onChangeText={(text) => {
                onChange(text)
                setPersonalInfo({ ...personalInfo, email: text })
                setDisableSubmitInEdit(false)
              }}
              placeholder="Enter email"
              keyboardType="email-address"
              placeholderTextColor={"#878787"}

            />

            <Text style={styles.label}>Education
              <Text style={{ color: "#F52F2F", fontSize: '14', fontWeight: 400 }}>{' (optional)'}</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={personalInfo?.education ?? ""}
              onSelect={(val, index, item) => {
                setPersonalInfo({ ...personalInfo, education: val?.qualification });
                setDisableSubmitInEdit(false);
              }}
              placeholder="Enter education"
              placeholderTextColor={"#878787"}

            />

            <Text style={styles.sectionTitle}>FPO Info
              <Text style={{ color: "#F52F2F", fontSize: '14', fontWeight: 400 }}>{' (optional)'}</Text>
            </Text>
            <View style={styles.radioGroup}>
              <CustomRadioGroup selected={selected} onSelect={setSelected} />
            </View>

            <Text style={styles.sectionTitle}>Social<Text style={{ color: "#F52F2F", fontSize: '14', fontWeight: 400 }}>{' (optional)'}</Text>
            </Text>
            {Object.keys(social).map((key) => (
              <CustomCheckbox
                key={key}
                checked={social[key]}
                onToggle={() => setSocial({ ...social, [key]: !social[key] })}
                label={key.charAt(0).toUpperCase() + key.slice(1)} // capitalized label
                style={{ marginVertical: 6 }}
              />
            ))}
          </View>
          <Text style={styles.sectionTitle}>My Delivery Address</Text>
          <View style={{ borderRadius: 8, paddingBottom: 19, paddingHorizontal: 16, marginTop: 10, paddingTop: 10, backgroundColor: '#fff' }}>

            <Text style={styles.label}>{appLanguage?.my_address}</Text>

            <TextInput
              style={styles.input}
              value={addressInfo?.addess ?? ""}
              placeholder={appLanguage?.add_here ?? "Add here"}
              onChangeText={(text) => {
                setAddressInfo({ ...addressInfo, addess: text });
                setDisableSubmitInEdit(false)
              }}
              placeholderTextColor={"#878787"}

            />

            {/* <Text style={styles.label}>Address Line 2</Text>

            <TextInput
              style={styles.input}
              placeholder="Address Line 2"
              value={address1}
              onChangeText={setAddress1}
              placeholderTextColor={"#878787"}

            /> */}

            <DropdownComponet
              title={appLanguage?.state ?? "State"}
              data={stateList}
              read={false}
              disabled={status}
              full
              value={stateData?.Name ?? ""}
              onSelect={(val, index, item) => {
                onSelectItem(item, 'state')
              }}
              mandatory={false}
              border={false}
              fieldKey={"name"}
              isSearch={true}
              containerStyle={{ width: status ? '48%' : "100%" }}
              itemStyle={{ flex: 1, backgroundColor: palette.lightWhite, }}
            />

            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'column', width: "48%" }}>
                <DropdownComponet
                  title={appLanguage?.district ?? "District"}
                  data={districtList}
                  read={false}
                  disabled={status}
                  full
                  value={districtData.Name ?? ""}
                  onSelect={(val, index, item) => {
                    onSelectItem(item, 'district')
                  }}
                  mandatory={false}
                  border={false}
                  fieldKey={"district_name"}
                  isSearch={true}
                  containerStyle={{ width: status ? '48%' : "100%" }}
                  itemStyle={{ flex: 1, backgroundColor: palette.lightWhite, }}
                />
              </View>
              <View style={{ flexDirection: 'column', width: "48%", marginLeft: 10 }}>

                <DropdownComponet
                  title={appLanguage?.village ?? "Village"}
                  data={villageList}
                  read={false}
                  disabled={status}
                  full
                  value={villageData.Name ?? ""}
                  onSelect={(val, index, item) => {
                    onSelectItem(item, 'village')
                  }}
                  mandatory={false}
                  border={false}
                  fieldKey={"village_name"}
                  isSearch={true}
                  itemStyle={{ flex: 1, backgroundColor: palette.lightWhite, }}
                />


              </View>

            </View>

            <Text style={styles.label}>{appLanguage?.pincode ?? "Pincode"}</Text>

            <TextInput
              style={styles.input}
              value={addressInfo?.pincode ? (!isEmpty(addressInfo?.pincode) ? String(addressInfo?.pincode) : '') : ''}
              placeholder={appLanguage?.add_here ?? 'Add here'}

              onChangeText={(text) => {
                setAddressInfo({ ...addressInfo, pincode: text })
                setDisableSubmitInEdit(false)
              }}
              maxLength={6}
              keyboardType="numeric"
              placeholderTextColor={"#878787"}
            />
          </View>

          <Text style={styles.sectionTitle}>Store Address</Text>
          <StoreCard
            showChangeButton={true}
            storeCode={StoreCodeDetails.storeCode}
            storeName={StoreCodeDetails?.storeName}
            addressLines={[
              StoreCodeDetails?.address
            ]}
            phoneNumber={StoreCodeDetails?.contactDetails}
          />


        </ScrollView>

      </KeyboardAvoidingView>
      <View>
        <CustomButton
          title="Update"
          onPress={() => { }}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default PersonaInfoContainer;

const styles = StyleSheet.create({
  label: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
    color: "#4E4E4E",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 6,
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 8,
  },
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#555",
    marginRight: 6,
  },
  radioActive: {
    backgroundColor: "green",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#555",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "green",
  },
  bottomBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  btn: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
