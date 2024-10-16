import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./src/contexts/Auth";
import { Router } from "./src/routes";

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 5000);
// In App.js in a new project


function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
