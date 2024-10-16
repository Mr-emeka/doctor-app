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
} from "react-native";
import Constants from "expo-constants";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Categories from "../../../components/Categories";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../../../contexts/Auth";
import specialty from "../../../services/specialty.js";
import user from "../../../services/user.js";
import appointmentService from "../../../services/appointment.js";
import { useNavigation } from "@react-navigation/native";
import Appointment from "../../../components/Appointment.js";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { authData } = useAuth();
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState(undefined);

  useEffect(() => {
    getSpecialties();
    getNewDoctors();
    getAllUserAppointments();
  }, []);

  getSpecialties = async () => {
    const response = await specialty.getSpecialties();
    if (response.ok) {
      setSpecialties(response.data);
    }
  };

  getNewDoctors = async () => {
    const response = await user.getNewDoctors();
    if (response.ok) {
      setDoctors(response.data);
    }
  };

  searchDoctor = async (e) => {
    navigation.navigate("DoctorSearchScreen", {
      s: search,
    });
  };

  getAllUserAppointments = async () => {
    const response = await appointmentService.getAllUserAppointments({
      status: "BOOKED",
    });
    if (response.ok) {
      setAppointments(response.data);
    }
  };

  navigation.addListener("focus", getAllUserAppointments);

  return (
    <SafeAreaView className=" pt-5 bg-white">
      <StatusBar style="dark" translucent />

      <View className="flex-row pb-3 items-center mx-4 space-x-2 justify-between">
        <View>
          <Text className="text-[#6B7280] text-[14px] text-normal">
            Location
          </Text>
          <Text className="text-[#374151] font-medium text-[14px] mt-1">
            Enugu , Nigeria
          </Text>
        </View>

        <View>
          <Text>
            {/* <Icon name='notification' size={16} color={'#292D32'} /> */}
          </Text>
        </View>
      </View>

      {/*  */}

      {authData && authData?.user?.accountType.toLowerCase() === "patient" && (
        <View className="flex-row pb-2 mx-4 items-center space-x-2">
          <View className="flex-row flex-1 space-x-2 bg-gray-100 p-3 rounded-[4px]">
            <TextInput
              placeholder="search"
              keyboardType="default"
              onChangeText={(value) => setSearch(value)}
            />
          </View>

          <TouchableOpacity onPress={searchDoctor}>
            <Icon name="search" size={20} color={"#0ea5e9"} />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        className="bg-gray-100 px-4 pt-6"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {authData && authData?.user?.accountType.toLowerCase() == "doctor" && (
          <View className="">
            {appointments.length > 0 && (
              <Text className="font-bold text-[16px] mb-5">
                {" "}
                Upcoming Appointments
              </Text>
            )}
            {appointments.length > 0 ? (
              appointments.slice(0, 3).map((appointment, index) => {
                return <Appointment appointment={appointment} key={index} />;
              })
            ) : (
              <View className=" flex items-center justify-center">
                <Image
                  style={{ width: 350, height: 350, borderRadius: 400 }}
                  source={require("../../../../assets/doctor_consultation_03.jpg")}
                />
                {/* <Text className="my-3 font-bold text-[20px]">
                  No Appointment
                </Text> */}
              </View>
            )}
          </View>
        )}
        {authData && authData?.user?.accountType.toLowerCase() == "patient" && (
          <View className="">
            {appointments.length > 0 && (
              <Text className="font-bold text-[16px] mb-5">
                {" "}
                Upcoming Appointments
              </Text>
            )}
            {appointments.length > 0 ? (
              appointments.slice(0, 3).map((appointment, index) => {
                return <Appointment appointment={appointment} key={index} />;
              })
            ) : (
              <View className="flex items-center justify-center">
                <Image
                  style={{ width: 350, height: 350, borderRadius: 400 }}
                  source={require("../../../../assets/doctor_consultation_03.jpg")}
                />
                {/* <Text className="my-3 font-bold text-[20px]">
                  No Appointment
                </Text> */}
              </View>
            )}
          </View>
        )}

        {authData &&
          authData?.user?.accountType.toLowerCase() === "patient" && (
            <View className="mb-10">
              <Text className="text-[16px] mb-3  font-medium">
                {" "}
                Specialties
              </Text>
              <Categories specialties={specialties && specialties} />

              {/* <View className="mt-5 p-2">
                {doctors.length > 0 &&
                  doctors.map((doctor, index) => {
                    return (
                      <TouchableOpacity
                        className="bg-white rounded-[4px] p-3 flex-row space-x-4 items-center mb-5 shadow-sm justify-between "
                        key={index}
                      >
                        <View className="flex-1 flex flex-row items-center gap-4">
                          <Image
                            source={{
                              uri: `https://ui-avatars.com/api/?background=555&color=fff&name=${specialty.full_name}`,
                            }}
                            className="w-[50px] h-[50px] object-right-bottom  rounded-full"
                          />
                          <View>
                            <Text className="mb-1">Dr. {doctor.full_name}</Text>
                            <Text className="mb-1">
                              {doctor.specialty.name}
                            </Text>
                            <Text className="">{doctor.location}, Nigeria</Text>
                          </View>
                        </View>
                        <View className="flex  flex-[.5] items-end">
                          <TouchableOpacity className="bg-sky-500 p-2  rounded">
                            <Text className="text-white">Book</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </View> */}
            </View>
          )}

        <View className="mb-10">
          <Text className="text-bold text-[20px]">
            Experts Health Tips and Advice
          </Text>
          <Text className="text-[12px] mb-3">
            Articles by highly qualified doctors on everyday health
          </Text>


          <View className="w-full p-2 bg-white rounded-[6px] my-2 shadow-sm">
            <Image
              source={require("../../../../assets/threadmil.jpeg")}
              className="w-full h-[200px] mb-4"
            />
            <View>
              <Text className="mb-2 text-[14px]">Health</Text>
              <Text className="font-bold text-[16px] mb-2">
                Every Day Exercising
              </Text>
              <Text className="mb-2 font-normal text-[14px]">
                REBECCA BAYLIS, 19 MAY 2024 sending your precious littlies into
                the world might bring feelings- anticipation
              </Text>
              <Text className="">by Goldenmace 2 months ago</Text>
            </View>
          </View>

          <View className="w-full p-2 bg-white rounded-[6px] my-2 shadow-sm">
            <Image
              source={require("../../../../assets/apple.jpeg")}
              className="w-full h-[200px] mb-4"
            />
            <View>
              <Text className="mb-2 text-[14px]">Health</Text>
              <Text className="font-bold text-[16px] mb-2">
              Eat a balanced diet
              </Text>
              <Text className="mb-2 font-normal text-[14px]">
                REBECCA BAYLIS, 19 MAY 2024 sending your precious littlies into
                the world might bring feelings- anticipation
              </Text>
              <Text className="">by Goldenmace 2 months ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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

export default HomeScreen;
