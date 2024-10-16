import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function SelectScreen() {
  const navigation = useNavigation();
  return (
    <View className="bg-white w-full h-full">
      <StatusBar style="light" />
      <ImageBackground
        className="h-full w-full"
        source={require("../../../assets/onboarding/slide-1.jpeg")}
      >
        <View className="bg-sky-500/70 absolute  h-full w-full top-0 "></View>
        <View className="flex  items-center justify-center flex-1">
          <Text className="font-bold text-white text-[40px] ">
            {" "}
            Select Account
          </Text>
          <Text></Text>
          <View className="w-full px-10 my-10">
            <TouchableOpacity
              className="w-full bg-white p-3 rounded-md my-5 text-center border border-sky-500 border-1 h-[60px] flex items-center justify-center"
              onPress={() =>
                navigation.navigate("Signup", {
                  accountType: "DOCTOR",
                })
              }
            >
              <Text className="text-sky-500 font-bold text-center text-[25px]">
                Doctor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full bg-white p-3 rounded-md my-5 text-center border border-sky-500 border-1 h-[60px] flex items-center justify-center"
              onPress={() =>
                navigation.navigate("Signup", {
                  accountType: "PATIENT",
                })
              }
            >
              <Text className="text-sky-500 font-bold text-center text-[25px]">
                Patient
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
