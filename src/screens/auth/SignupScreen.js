import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function SignupScreen({ route }) {
  const navigation = useNavigation();
  const { accountType } = route.params;

  return (
    <View className="bg-white w-full h-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("../../../assets/background.png")}
      />
      <View className="flex-row justify-around w-full absolute top-20">
        {/* <Image source={require("../../../assets/android.png")} className="w-full h-[30px]"/> */}
      </View>
      <View className="h-full w-full flex justify-around pt-40 pb-5">
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
      <Text>{accountType}</Text>
          <Animated.View
            entering={FadeInDown.delay(700).duration(1000).springify()}
            className="bg-slate-800/5 p-5 rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="Full name"
              placeholderTextColor={"gray"}
            ></TextInput>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(700).duration(1000).springify()}
            className="bg-slate-800/5 p-5 rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="email"
              placeholderTextColor={"gray"}
              textContentType="emailAddress"
              keyboardType="email-address"
            ></TextInput>
          </Animated.View>
          {/* <Animated.View
            entering={FadeInDown.delay(700).duration(1000).springify()}
            className="bg-slate-800/5 p-5 rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="location"
              placeholderTextColor={"gray"}
            ></TextInput>
          </Animated.View> */}
          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="bg-slate-800/5 p-5 rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="password"
              placeholderTextColor={"gray"}
              secureTextEntry
            ></TextInput>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(900).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
              <Text className="text-xl font-bold text-white text-center">
                Sign Up
              </Text>
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
      </View>
    </View>
  );
}
