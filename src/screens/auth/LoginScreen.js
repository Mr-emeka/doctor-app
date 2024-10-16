import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Formik } from "formik";
import user from "../../services/user";
import { useAuth } from "../../contexts/Auth";
import { object, string } from "yup";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [error, setError] = useState();
  const [loading, isLoading] = useState();
  const auth = useAuth();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="bg-white w-full h-full">
        <StatusBar style="light" />
        <Image
          className="h-full w-full absolute"
          source={require("../../../assets/background.png")}
        />
        <View className="flex-row justify-around w-full absolute top-20">
          {/* <Image source={require("../../../assets/android.png")} className="w-full h-[30px]"/> */}
        </View>
        <View className="h-full w-full flex justify-around mt-5 pt-33 pb-10">
          <View className="flex items-center">
            <Animated.Text
              entering={FadeInUp.delay(500).duration(1000).springify()}
              className="text-white font-bold tracking-wider text-5xl "
            >
              Login
            </Animated.Text>
          </View>

          {/* form */}
          <View className="flex items-center mx-4 spacing-y-4">
            <Formik
              validationSchema={object({
                email: string().email().required(),
                password: string().required(),
              })}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                isLoading(true);
                const response = await user.loginUser(values);
                if (
                  response.data &&
                  response.data.user &&
                  !response.data.user.active
                ) {
                  return Alert.alert(
                    "Account Blocked Contact Support or Admin"
                  );
                }
                if (response.problem) {
                  isLoading(false);
                  setError(response.problem);
                } else {
                  isLoading(false);
                  auth.signIn(response.data);

                  Alert.alert("Login successful");
                  // return navigation.navigate("HomeScreen");
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
                      placeholder="email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholderTextColor={"gray"}
                      textContentType="emailAddress"
                      keyboardType="email-address"
                    ></TextInput>
                  </Animated.View>

                  <Animated.View
                    entering={FadeInDown.delay(800).duration(1000).springify()}
                    className="bg-slate-800/5 p-4 rounded-2xl w-full mb-3"
                  >
                    <TextInput
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="password"
                      placeholderTextColor={"gray"}
                      secureTextEntry
                    ></TextInput>
                  </Animated.View>

                  <Animated.View
                    entering={FadeInDown.delay(900).duration(1000).springify()}
                    className="w-full"
                  >
                    <TouchableOpacity
                      className="w-full bg-sky-500 p-3 rounded-2xl mb-3"
                      onPress={handleSubmit}
                      disabled={loading || !dirty}
                    >
                      {loading ? (
                        <ActivityIndicator color={"#ffff"} />
                      ) : (
                        <Text className="text-xl font-bold text-white text-center">
                          Login
                        </Text>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View
                    entering={FadeInDown.delay(1000).duration(1000).springify()}
                    className="flex-row justify-center my-5"
                  >
                    <TouchableOpacity
                      onPress={() => navigation.push("ForgotPassword")}
                    >
                      <Text className="text-sky-600">Forgot Password</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View
                    entering={FadeInDown.delay(1000).duration(1000).springify()}
                    className="flex-row justify-center"
                  >
                    <Text>Don't have an account ? </Text>
                    <TouchableOpacity
                      onPress={() => navigation.push("Welcome")}
                    >
                      <Text className="text-sky-600">Signup</Text>
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
