import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const CategoryCard = ({ id, title }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ width: 100 / 3 + "%" }}
      onPress={() =>
        navigation.navigate("CategoryScreen", {
          id,
          title
        })
      }
    >
      <View style={{ padding: 5 }}>
        <View
          className="bg-sky-500"
          style={{
            height: 70,
            borderRadius: 5,
            marginBottom: 5,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Text className="text-white  leading-1 text-[15px] text-center">
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CategoryCard;
