import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { useAuth } from "../contexts/Auth";

const Appointment = ({ appointment }) => {
  const { authData } = useAuth();

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white shadow p-3 rounded mb-5 flex flex-row items-center justify-between"
      onPress={() =>
        navigation.navigate("AppointmentDetailScreen", {
          appointmentId: appointment.id,
        })
      }
    >
      {authData && authData?.user?.accountType.toLowerCase() == "patient" ? (
        <View className="flex-[.2]">
          <Image
            source={{
              uri: appointment?.doctor?.imgUrl ? appointment?.doctor?.imgUrl :  `https://ui-avatars.com/api/?background=f87171&color=fff&name=${appointment?.doctor?.full_name}`,
            }}
            className="w-[60px] h-[60px] object-right-bottom"
          />
        </View>
      ) : (
        <View className="flex-[.2]">
          <Image
            source={{
              uri: appointment?.patient?.imgUrl ? appointment?.patient?.imgUrl :`https://ui-avatars.com/api/?background=f87171&color=fff&name=${appointment?.patient?.full_name}`,
            }}
            className="w-[60px] h-[60px] object-right-bottom"
          />
        </View>
      )}
      <View className="flex flex-col flex-[.76]">
        {authData && authData?.user?.accountType.toLowerCase() === "patient" ? (
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <View>
                <Text className="text-[14px]">
                  (DR). {appointment.doctor.full_name}
                </Text>
              </View>
            </View>
            <View>
              {/* <Text>Icon</Text> */}
              <Text className="text-[12px] ">{appointment.doctor.email}</Text>
            </View>
          </View>
        ) : (
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <View>
                <Text className="text-[14px]">
                  (P). {appointment.patient.full_name}
                </Text>
              </View>
            </View>
            <View>
              {/* <Text>Icon</Text> */}
              <Text className="text-[12px] ">{appointment.patient.email}</Text>
            </View>
          </View>
        )}
        <View
          className=" p-1 flex-row justify-between "
          style={{
            backgroundColor:
              appointment.status == "CANCELLED"
                ? "#ef4444"
                : appointment.status == "COMPLETED"
                ? "#22c55e"
                : "#0ea5e9",
          }}
        >
          <View>
            <Text className="text-white font-bold">
              {" "}
              {appointment.appointmentDate}
            </Text>
          </View>

          <View>
            <Text className="text-white font-bold">
              {appointment.appointmentSlot}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Appointment;
