import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import user from "../../../services/user";
import UserCard from "../../../components/UserCard";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../../../contexts/Auth";

const DoctorSearchScreen = ({ route }) => {
  const navigation = useNavigation();
  const { s } = route.params;
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, isLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { authData } = useAuth();

  useEffect(() => {
    async function fetchedDoctors(page, limit, s, accountType) {
      const response = await user.getUser(page, limit, s, accountType);
      if (response.ok) {
        setDoctors(response.data.users);
        setPage(response.data.currentPage);
        setTotal(response.data.pages);
      }
    }
    fetchedDoctors(page, limit, s, "DOCTOR");
    () => {};
  }, [s, page]);

  return (
    <SafeAreaView className=" pt-5">
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
        className="bg-gray-100 px-4 pt-6"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mb-5">
          <Text className="font-bold text-[16px] mb-5">{s}</Text>

          {doctors.length > 0 ? (
            doctors.map((doctor, index) => {
              //specialty here is the doctor
              return (
                <UserCard specialty={doctor} authData={authData} key={index} />
              );
            })
          ) : (
            <View className=" flex items-center justify-center">
              <Image
                style={{ width: 350, height: 350, borderRadius: 400 }}
                source={require("../../../../assets/doctor_consultation_03.jpg")}
              />
              <Text className="my-3 font-bold text-[20px]">
                No Doctors Matching {s}
              </Text>
            </View>
          )}
        </View>
        <View className="flex flex-row items-center justify-end gap-10">
          <TouchableOpacity
            disabled={page === 1}
            onPress={() => setPage(Number(page) - 1)}
            className="disabled: hidden"
          >
            <Icon name="chevron-left" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={page === total}
            onPress={() => setPage(Number(page) + 1)}
            className="disabled: hidden"
          >
            <Icon name="chevron-right" size={25} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default DoctorSearchScreen;
