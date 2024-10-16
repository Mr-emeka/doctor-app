import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import  OnboardingScreen  from "../screens/onboarding/";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from '../screens/auth/SignupScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import OTPScreen from "../screens/auth/OTPScreen";



const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      
      <Stack.Screen name="ResetPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
};
