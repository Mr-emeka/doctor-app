import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import React, { useRef } from "react";

import { Loading } from "../components/Loading";
import { useAuth } from "../contexts/Auth";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

export const Router = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  const { authData, loading } = useAuth();
  
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
    >
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
