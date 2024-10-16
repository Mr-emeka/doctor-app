import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../../../contexts/Auth";
import user from "../../../services/user";
import { Dropdown } from "react-native-element-dropdown";
import specialty from "../../../services/specialty";
import KeyboardAvoiding from "../../../components/KeyboardAvoiding";
import UploadImage from "../../../components/Upload";

const SettingsScreen = () => {
  const [specialties, setSpecialties] = useState([]);
  const [value, setValue] = useState("");
  const auth = useAuth();
  const [fetchedUser, setFetchedUser] = useState(auth.authData.user);
  const [loading, isLoading] = useState(false);
  const [gender, setGender] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    isLoading(true);
    if (auth.authData.user.accountType.toLowerCase() == "doctor") {
      getSpecialties();
    }
    isLoading(false);
  }, []);

  getSpecialties = async () => {
    try {
      const response = await specialty.getSpecialties();

      const processed = response.data.map((s, index) => {
        return {
          label: s.name,
          value: s.id,
        };
      });
      setSpecialties(processed);
    } catch (err) {}
  };

  if (loading) return <ActivityIndicator color={"#000"} />;

  return (
    <KeyboardAvoiding>
      <SafeAreaView className="flex-1 pt-5 bg-white">
        <StatusBar style="dark" translucent />

        <View className="mt-1">
          <View styles={{ marginVertical: 0, flexDirection: "row" }}>
            {fetchedUser && (
              <UploadImage
                img={
                  fetchedUser.imgUrl ||
                  `https://ui-avatars.com/api/?background=f87171&color=fff&name=${
                    fetchedUser ? fetchedUser.full_name : "Null"
                  }`
                }
                id={fetchedUser.id}
              />
            )}
            <View className="flex items-center mb-2">
              <Text className="text-[20px] mb-3 uppercase">
                {fetchedUser ? fetchedUser.full_name : ""}
              </Text>

              <Text className="uppercase text-red-500">
                {fetchedUser ? fetchedUser.accountType : ""}
              </Text>
            </View>
          </View>

          <Formik
            initialValues={{
              email: fetchedUser && fetchedUser.email,
              location: fetchedUser && fetchedUser.location,
              bio: fetchedUser && fetchedUser.bio,
              hospital: fetchedUser && fetchedUser.hospital,
            }}
            onSubmit={async (values) => {
              try {
                const response = await user.updateUser({
                  ...values,
                  gender,
                  specialty: value !== "" ? value : null,
                });
                if (response.ok) {
                  isLoading(false);
                  Alert.alert(" Account Updated Successfully");
                }
                isLoading(false);
              } catch (err) {
                console.log(err);
                isLoading(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => {
              return (
                <View className="mx-4 mt-3">
                  <Animated.View className="bg-slate-800/5 p-4 rounded-[8px] w-full mb-3">
                    <TextInput
                      placeholder="email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholderTextColor={"gray"}
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      readOnly
                    ></TextInput>
                  </Animated.View>
                  <Animated.View className="bg-slate-800/5 p-5 rounded-[8px] w-full mb-3">
                    <TextInput
                      placeholder="Bio"
                      onChangeText={handleChange("bio")}
                      onBlur={handleBlur("bio")}
                      value={values.bio}
                      placeholderTextColor={"gray"}
                      numberOfLines={10}
                      multiline={true}
                      style={{ height: 50, textAlignVertical: "top" }}
                    ></TextInput>
                  </Animated.View>

                  {fetchedUser?.accountType?.toLowerCase() === "doctor" && (
                    <Animated.View className="mb-3">
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={specialties}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Specialty"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={(item) => {
                          setValue(item.value);
                        }}
                      />
                    </Animated.View>
                  )}

                  {fetchedUser?.accountType?.toLowerCase() === "doctor" && (
                    <Animated.View className="bg-slate-800/5 p-5 rounded-[8px] w-full mb-3">
                      <TextInput
                        placeholder="Hospital"
                        onChangeText={handleChange("hospital")}
                        onBlur={handleBlur("hospital")}
                        value={values.hospital}
                        placeholderTextColor={"gray"}
                      ></TextInput>
                    </Animated.View>
                  )}

                  <Animated.View className="mb-3">
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={[
                        { label: "male", value: "MALE" },
                        { label: "female", value: "FEMALE" },
                        { label: "other", value: "OTHER" },
                      ]}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Gender"
                      searchPlaceholder="Gender"
                      value={gender}
                      onChange={(item) => {
                        setGender(item.value);
                      }}
                    />
                  </Animated.View>
                  <Animated.View className="bg-slate-800/5 p-4 rounded-[8px] w-full mb-3">
                    <TextInput
                      placeholder="Location"
                      onChangeText={handleChange("location")}
                      onBlur={handleBlur("location")}
                      value={values.location}
                      placeholderTextColor={"gray"}
                      readOnly
                    ></TextInput>
                  </Animated.View>

                  <View className="mt-1">
                    <Animated.View className="w-full">
                      <TouchableOpacity
                        className="w-full bg-sky-500 p-3 rounded-[8px] mb-3"
                        onPress={handleSubmit}
                      >
                        {loading ? (
                          <ActivityIndicator color={"#ffff"} />
                        ) : (
                          <Text className="text-xl font-bold text-white text-center">
                            Save
                          </Text>
                        )}
                      </TouchableOpacity>
                    </Animated.View>
                    <Animated.View className="w-full ">
                      <TouchableOpacity
                        className="w-full  p-3 rounded-[8px] mb-3 flex items-center  justify-center flex-row gap-2"
                        onPress={() => auth.signOut()}
                      >
                        <Icon name="log-out" size={22} color="#38bdf8" />
                        <Text className=" text-[18px] font-bold text-sky-500 text-center items-center gap-2 justify-center">
                          Log out
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAvoiding>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 12,
    color: "#71717a",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SettingsScreen;
