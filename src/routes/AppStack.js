import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Tabs from "./Tabs";
import CategoryScreen from "../screens/app/home/CategoryScreen";
import BookAppointmentScreen from "../screens/app/home/BookAppointmentScreen";
import AppointmentDetailScreen from "../screens/app/appointments/AppointmentDetailScreen";
import { useAuth } from "../contexts/Auth";
import DoctorSearchScreen from "../screens/app/home/DoctorSearchScreen";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={Tabs} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen
        name="BookAppointmentScreen"
        component={BookAppointmentScreen}
      />
      <Stack.Screen
        name="AppointmentDetailScreen"
        component={AppointmentDetailScreen}
      />

<Stack.Screen
        name="DoctorSearchScreen"
        component={DoctorSearchScreen}
      />

      {/* <Stack.Screen name="Article" component={ArticleScreen} />
      <Stack.Screen name="blog" component={Blog} />
      <Stack.Screen name="ArticleCategories" component={ArticleCategoryScreen} /> */}
    </Stack.Navigator>
  );
};
