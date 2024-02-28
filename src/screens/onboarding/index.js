// import { AppButton, AppTextLink } from '@components';
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Animated, { FadeInDown , FadeInRight} from "react-native-reanimated";
// import AppText from '../../../components/AppText';
// import { mixpanel } from '../../../services/mixpanel';
import { Pagination } from "./Pagination";
import { slides, styles } from "../../constant";

export default function OnboardingScreen({ navigation }) {
  
  useEffect(() => {
    // mixpanel.track('visited_onboarding_screen');
  }, []);

  let params = {
    alias: "my custom alias",
    custom_data: {
      Custom_Event_Property_Key1: "Custom_Event_Property_val1",
      Custom_Event_Property_Key2: "Custom_Event_Property_val2",
    },
  };
  // let event = new BranchEvent("TEST_ONBOARDING", params)
  const onDone = () => navigation.navigate("Welcome");
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMethod="auto" />
        <View style={styles.bottom}>
          <Animated.Text entering={FadeInDown.delay(400).duration(1000).springify()} style={styles.title}>{item.title}</Animated.Text>
          <Animated.Text style={styles.text} centered  entering={FadeInDown.delay(400).duration(1000).springify()}>
            {item.text}
          </Animated.Text>
          {/* App Button */}
          <View className="w-full">
          <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl my-3" onPress={()=> navigation.navigate("Welcome")}>
            <Text className="text-xl font-bold text-white text-center">
              Create Account
            </Text>
          </TouchableOpacity>
          </View>
          {/* APP Link text */}
          <View entering={FadeInRight.delay(500).duration(1000).springify()}>

          <TouchableOpacity
            onPress={()=>navigation.navigate('Login')}
            className="flex justify-center align-center"
          >
            <Text className="text-xl font-bold text-sky-400 text-center">
              Login
            </Text>
          </TouchableOpacity>
          </View>
          {/* <AppTextLink title="Login" onPress={() => navigation.navigate('Login')} /> */}
        </View>
      </View>
    );
  };
  return (
    <>
      <StatusBar style="light" translucent />
      <AppIntroSlider
        activeDotStyle={styles.activeDot}
        renderItem={renderItem}
        renderPagination={Pagination}
        data={slides}
        // onDone={onDone}
        showPrevButton={false}
        showNextButton={false}
        showDoneButton
        // showSkipButton={true}
        onSkip={onDone}
      />
    </>
  );
}
