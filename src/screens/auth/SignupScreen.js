import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Formik } from "formik";
import user from "../../services/user";
import specialty from "../../services/specialty";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Feather";
import { object, string, email } from "yup";

export default function SignupScreen({ route }) {
  const navigation = useNavigation();
  const { accountType } = route.params;
  const [error, setError] = useState(false);
  const [loading, isLoading] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    getSpecialties();
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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <View className="bg-white w-full h-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("../../../assets/background.png")}
      />
      <View className="flex-row justify-around w-full absolute top-20">
        {/* <Image source={require("../../../assets/android.png")} className="w-full h-[30px]"/> */}
      </View>
      <View className="h-full w-full flex justify-around mt-10 pt-34 pb-5">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.delay(500).duration(1000).springify()}
            className="text-white font-bold tracking-smaller text-5xl "
          >
            Sign Up
          </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-4 spacing-y-4">
          <Formik
            initialValues={{ email: "", accountType }}
            validationSchema={object({
              email: string().email().required(),
              full_name: string().required(),
              password: string().required(),
            })}
            onSubmit={async (values) => {
              try {
                isLoading(true);
                const response = await user.registerUser({
                  ...values,
                  accountType,
                  specialty: value,
                });
                if (response.ok) {
                  isLoading(false);
                  Alert.alert("Created Account Successfully");
                  return navigation.navigate("Login");
                } else {
                  isLoading(false);
                  setError(response.data);
                }
              } catch (err) {
                isLoading(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, dirty }) => (
              <View className="flex w-full">
                {error && (
                  <Text className="text-red-500 text-center mb-5 text-[18px]">
                    {"Sorry, "}
                    {error}
                  </Text>
                )}
                <Animated.View
                  entering={FadeInDown.delay(700).duration(1000).springify()}
                  className="bg-slate-800/5 p-4 rounded-2xl w-full mb-3"
                >
                  <TextInput
                    placeholder="Full name"
                    onChangeText={handleChange("full_name")}
                    onBlur={handleBlur("full_name")}
                    value={values.full_name}
                    placeholderTextColor={"gray"}
                  ></TextInput>
                </Animated.View>
                <Animated.View
                  entering={FadeInDown.delay(700).duration(1000).springify()}
                  className="bg-slate-800/5 p-4 rounded-2xl w-full mb-3"
                >
                  <TextInput
                    placeholder="email"
                    placeholderTextColor={"gray"}
                    textContentType="emailAddress"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  ></TextInput>
                </Animated.View>
                {accountType.toLowerCase() === "doctor" && (
                  <Animated.View
                    entering={FadeInDown.delay(800).duration(1000).springify()}
                  >
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
                <Animated.View
                  entering={FadeInDown.delay(900).duration(1000).springify()}
                  className="bg-slate-800/5 p-4 rounded-2xl w-full mb-3"
                >
                  <TextInput
                    placeholder="password"
                    placeholderTextColor={"gray"}
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  ></TextInput>
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(900).duration(1000).springify()}
                  className="w-full"
                >
                  <TouchableOpacity
                    disabled={loading || !dirty}
                    className="w-full bg-sky-500 p-3 rounded-2xl mb-3 flex"
                    onPress={handleSubmit}
                  >
                    {loading ? (
                      <ActivityIndicator color={"#ffff"} />
                    ) : (
                      <Text className="text-xl font-bold text-white text-center">
                        Sign Up
                      </Text>
                    )}
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(1000).duration(1000).springify()}
                  className="flex-row justify-center"
                >
                  <Text>Already have an account ? </Text>
                  <TouchableOpacity onPress={() => navigation.push("Login")}>
                    <Text className="text-sky-600">login</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    marginBottom: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 5,
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
