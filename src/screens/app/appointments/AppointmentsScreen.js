import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import Constants from "expo-constants";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Categories from "../../../components/Categories";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../../../contexts/Auth";
import appointmentService from "../../../services/appointment.js";
import { useNavigation } from "@react-navigation/native";
import Appointment from "../../../components/Appointment.js";

const AppointmentsScreen = () => {
  const { authData } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState(undefined);
const [status,] = useState(undefined);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getAllUserAppointments();
    setRefreshing(false);
  }, [search]);

  useEffect(() => {
    getAllUserAppointments();
  }, []);

  getAllUserAppointments = async () => {
    const response = await appointmentService.getAllUserAppointments({search, status: status});
    if (response.ok) {
      setAppointments(response.data);
    }
  };

  navigation.addListener("focus", getAllUserAppointments);


  return (
    <SafeAreaView className=" pt-5 bg-white">
      <StatusBar style="dark" translucent />

      <View className="px-4 my-4">
        <Text className="font-bold text-[16px] mb-3"> All Appointments</Text>
      </View>

      {/* <View className="flex-row pb-2 mx-4 items-center space-x-2">
        <View className="flex-row flex-1 space-x-2 bg-gray-100 p-3 rounded-[4px]">
          <TextInput
            placeholder="search"
            keyboardType="default"
            onChangeText={(e) => setSearch(e.target.value)}
          />
        </View>

        <TouchableOpacity>
          <Icon name="search" size={20} color={"#0ea5e9"} onPress={searchAppointment} />
        </TouchableOpacity>
      </View> */}

      {authData && authData?.user?.accountType.toLowerCase() === "patient" && (
        <ScrollView
          className="bg-gray-100 px-4 pt-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {appointments.length > 0 ?
            appointments.map((appointment, index) => {
              return <Appointment appointment={appointment} key={index} />;
            }):     <View className=" flex items-center justify-center">
                <Image
                  style={{ width: 350, height: 350, borderRadius: 400 }}
                  source={require("../../../../assets/doctor_consultation_03.jpg")}
                />
                <Text className="my-3 font-bold text-[20px]">
                  No Appointment
                </Text>
              </View>}
        </ScrollView>
      )}
      {authData && authData?.user?.accountType.toLowerCase() === "doctor" && (
        <ScrollView
          className="bg-gray-100 px-4 pt-6"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {appointments.length > 0 ?
            appointments.map((appointment, index) => {
              return <Appointment appointment={appointment} key={index} />;
            }) :     <View className=" flex items-center justify-center">
                <Image
                  style={{ width: 350, height: 350, borderRadius: 400 }}
                  source={require("../../../../assets/doctor_consultation_03.jpg")}
                />
                <Text className="my-3 font-bold text-[20px]">
                  No Appointment
                </Text>
              </View>}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight + 10,
  },
});

export default AppointmentsScreen;
