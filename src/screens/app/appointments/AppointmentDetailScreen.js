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
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../../../contexts/Auth";
import appointmentService from "../../../services/appointment.js";
import { useNavigation } from "@react-navigation/native";

const AppointmentDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { authData } = useAuth();
  const { appointmentId } = route.params;
  const [appointment, setAppointment] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUserAppointmentById(appointmentId);
  }, [appointmentId]);

  getUserAppointmentById = async (id) => {
    const response = await appointmentService.getAppointmentById(id);
    if (response.ok) {
      setAppointment(response.data);
    }
  };

  cancel = async (id) => {
    try {
      setLoading(true);
      const response = await appointmentService.cancelAppointment(id);
      if (response.ok) {
        navigation.navigate("Appointments");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className=" pt-5 bg-white h-full">
      <StatusBar style="dark" translucent />
      <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
        <TouchableOpacity
          className="flex flex-row gap-2 items-center"
          onPress={() =>
            navigation.goBack() ?? navigation.navigate("HomeScreen")
          }
        >
          <Icon name="chevron-left" size={15} color={"#64748b"} />
          <Text style={{ fontSize: 15, color: "#64748b" }}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className=" px-4 pt-6"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="text-[20px]">Appointment Details</Text>

        <View className="flex flex-row items-center gap-3 mt-5">
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?background=f87171&color=fff&name=${appointment?.doctor?.full_name}`,
            }}
            className="w-[70px] h-[70px] object-right-bottom rounded-full "
          />

          <View className=" mt-5 w-full">
            <Text className="font-medium text-[18px]">
              DR.{appointment && appointment?.doctor?.full_name}
            </Text>
            <Text className="my-1">
              {appointment && appointment?.doctor?.specialty?.name}
            </Text>
            <Text className="">
              {appointment && appointment?.doctor?.location}
            </Text>
          </View>
        </View>
        <View className="h-[1px] bg-slate-200 my-4 rounded-sm"></View>

        <View>
          <Text className="font-bold text-[16px]">Scheduled Appointment :</Text>
          <View className="flex flex-row">
            <View className="flex p-0 my-3 flex-1">
              <Text className="mb-10 font-medium">Date</Text>
              <Text>Time</Text>
            </View>
            <View className="flex p-0 my-3 items-end flex-1">
              <Text className="mb-10 font-medium">
                {appointment && appointment.appointmentDate}
              </Text>
              <Text>{appointment && appointment.appointmentSlot} </Text>
            </View>
          </View>
        </View>

        <View className="h-[1px] bg-slate-200 my-4 rounded-sm"></View>

        <View>
          <Text className="font-bold text-[16px]">Patient Info:</Text>
          <View className="flex flex-row">
            <View className="flex p-0 my-3 flex-1">
              <Text className="mb-10 font-medium">Full Name</Text>
              <Text className=" font-medium mb-10">Gender</Text>
              <Text className=" font-medium">Status</Text>
            </View>
            <View className="flex p-0 my-3 items-end flex-1">
              <Text className="mb-10 font-medium">
                {appointment && appointment?.patient?.full_name}
              </Text>
              <Text className="mb-10 font-medium">
                {appointment && appointment?.patient?.gender}{" "}
              </Text>
              <Text className="font-medium">
                {appointment && appointment?.status}
              </Text>
            </View>
          </View>
        </View>

        <View className="h-[1px] bg-slate-200 my-4 rounded-sm"></View>

        <View>
          <Text className="font-bold text-[16px] mb-2">Message:</Text>
          <Text className="mb-10 font-medium">{appointment.message}</Text>
        </View>
      </ScrollView>
      {authData &&
        authData?.user?.accountType.toLowerCase() === "patient" &&
        appointment.status && (
          <View className="px-2">
            <TouchableOpacity
              disabled={
                loading || appointment.status.toLowerCase() !== "cancelled"
              }
              className="w-full  p-3 rounded-2xl mb-3 flex"
              style={{
                backgroundColor:
                  appointment.status.toLowerCase() == "cancelled"
                    ? "#ef4444"
                    : "#0ea5e9",
              }}
              onPress={() => cancel(appointment.id)}
            >
              {loading ? (
                <ActivityIndicator color={"#ffff"} />
              ) : (
                <Text className="text-xl font-bold text-white text-center">
                  Cancel Appointment
                </Text>
              )}
            </TouchableOpacity>
          </View>
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

export default AppointmentDetailScreen;
