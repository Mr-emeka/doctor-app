import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import HomeScreen from "../screens/app/home/HomeScreen";
import SettingsScreen from "../screens/app/settings/SettingsScreen";
import Appointments from "../screens/app/appointments/AppointmentsScreen";

const Tab = createBottomTabNavigator();
{
  /* <Home2
              color={color}
              size={24}
              variant={color === '#38bdf8' ? 'Bold' : 'Outline'}
            /> */
}
export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        initialRouteName: "Home",
        tabBarActiveTintColor: "#38bdf8",
        inactiveTintColor: "gray",

        tabBarStyle: {
          padding: 5,
        },
        shadowOpacity: 0.5,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarLabel: "Appointments",
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="user" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
