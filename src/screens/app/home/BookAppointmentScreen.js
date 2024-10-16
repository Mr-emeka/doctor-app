import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  TextInput,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Formik } from "formik";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import appointment from "../../../services/appointment.js";
import { useNavigation } from "@react-navigation/native";

const BookAppointmentScreen = ({ route }) => {
  const navigation = useNavigation();

  const { doctorId, patientId } = route.params;
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [appointmentDate, setAppointmentDate] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {}, []);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setAppointmentDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setAppointmentDate(date.toDateString());
    toggleDatePicker();
  };
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="mb-5">
          <Text className="font-bold text-[16px] mb-5 text-center">
            Book Appointment
          </Text>

          {/* display doctor details  */}

          <Formik
            initialValues={{
              message: "",
            }}
            onSubmit={async (values) => {
              try {
                isLoading(true);
                const response = await appointment.createAppointment({
                  ...values,
                  appointmentSlot: value,
                  appointmentDate,
                  doctorId,
                  patientId,
                });
                if (response.ok) {
                  isLoading(false);
                  Alert.alert("Appointment Booked Successfully");
                  return navigation.navigate("Appointments");
                } else {
                  isLoading(false);
                  setError(response.problem);
                }
              } catch (err) {
                isLoading(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View className="mx-4 mt-5">
                <ScrollView
                  className="bg-gray-100 px-4 pt-6"
                  contentContainerStyle={{ paddingBottom: 100 }}
                >
                  <Animated.View
                    entering={FadeInDown.delay(700).duration(1000).springify()}
                    className="bg-slate-800/5 p-5 rounded-[8px] w-full mb-5"
                  >
                    {!showPicker && (
                      <Pressable onPress={toggleDatePicker}>
                        <TextInput
                          placeholder="Appointment Date"
                          value={appointmentDate}
                          placeholderTextColor={"gray"}
                          editable={false}
                          onPressIn={toggleDatePicker}
                        ></TextInput>
                      </Pressable>
                    )}
                    {showPicker && (
                      <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={date}
                        onChange={onChange}
                        style={styles.datePicker}
                        minimumDate={new Date()}
                      />
                    )}
                    {showPicker && Platform.OS == "ios" && (
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <TouchableOpacity onPress={toggleDatePicker}>
                          <Text className="">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.pickerButton]}
                          onPress={confirmIOSDate}
                        >
                          <Text className="font-bold">Confirm</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </Animated.View>

                  <Animated.View
                    entering={FadeInDown.delay(800).duration(1000).springify()}
                    className="mb-5"
                  >
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={[
                        { label: "8AM to 9AM", value: "8-9" },
                        { label: "9AM to 10AM", value: "9-10" },
                        { label: "10AM to 11AM", value: "10-11" },
                        { label: "11AM to 12PM", value: "11-12" },
                        { label: "4PM to 5PM", value: "4-5" },
                        { label: "6PM to 7PM", value: "6-7" },
                      ]}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Time Slot"
                      searchPlaceholder="Search..."
                      value={value}
                      onChange={(item) => {
                        setValue(item.value);
                      }}
                    />
                  </Animated.View>
                  <Animated.View
                    entering={FadeInDown.delay(700).duration(1000).springify()}
                    className="bg-slate-800/5 p-5 rounded-[8px] w-full mb-5"
                  >
                    <TextInput
                      placeholder="Message optional"
                      onChangeText={handleChange("message")}
                      onBlur={handleBlur("message")}
                      value={values.message}
                      placeholderTextColor={"gray"}
                      numberOfLines={10}
                      multiline={true}
                      style={{ height: 200, textAlignVertical: "top" }}
                    ></TextInput>
                  </Animated.View>

                  <View className="mt-5">
                    <Animated.View
                      entering={FadeInDown.delay(900)
                        .duration(1000)
                        .springify()}
                      className="w-full"
                    >
                      <TouchableOpacity
                        className="w-full bg-sky-500 p-3 rounded-2xl mb-3 flex"
                        onPress={handleSubmit}
                      >
                        {loading ? (
                          <ActivityIndicator color={"#fff"} />
                        ) : (
                          <Text className="text-xl font-bold text-white text-center">
                            Book Appointment
                          </Text>
                        )}
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                </ScrollView>
              </View>
            )}
          </Formik>

          {/* dropdown for time slot */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    color: "#71717a",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 10,
  },
});

export default BookAppointmentScreen;
