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
import { useNavigation } from "@react-navigation/native";
import UserCard from "../../../components/UserCard.js";

const CategoryScreen = ({ route }) => {
  const { authData } = useAuth();
  const [specialties, setSpecialties] = useState([]);
  const { id, title } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    getUsersBySpecialty(id);
  }, []);

  getUsersBySpecialty = async (id) => {
    const response = await user.getUsersBySpecialty(id);
    if (response.ok) {
      setSpecialties(response.data);
    }
  };
  return (
    <SafeAreaView className=" pt-5">
      <StatusBar style="dark" translucent />
      <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
        <TouchableOpacity
        className="flex flex-row gap-2 items-center"
          onPress={() =>
            navigation.goBack() ?? navigation.navigate("HomeScreen")
          }
        >
          <Icon name="chevron-left" size={15} color={'#64748b'} />
          <Text style={{fontSize: 15, color: '#64748b'}}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="bg-gray-100 px-4 pt-6"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mb-5">
          <Text className="font-bold text-[16px] mb-5">{title}</Text>

          {specialties.length > 0 &&
            specialties.map((specialty, index) => {
              return (
                <UserCard
                  specialty={specialty}
                  authData={authData}
                  key={index}
                />
              );
            })}
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

export default CategoryScreen;
