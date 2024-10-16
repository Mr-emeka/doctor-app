import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import CategoryCard from "./CategoryCard";

const Categories = ({ specialties }) => {
  return (
  <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>

{specialties.map((specialty, index) => {
  return <CategoryCard title={specialty.name} id={specialty.id} key={index}/>;
})}
  </View>
  );
};

const styles = StyleSheet.create({});

export default Categories;
