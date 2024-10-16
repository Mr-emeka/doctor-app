import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

const UserCard = ({authData, specialty}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
        className="bg-white rounded-[4px] p-3 flex-row space-x-4 items-center mb-5 shadow-sm justify-between"
      >
        <View className="flex flex-row items-center  flex-[.8] gap-3 justify-start">
          <Image
            source={{
              uri: specialty?.imgUrl ? specialty?.imgUrl : `https://ui-avatars.com/api/?background=38bdf8&color=fff&name=${specialty.full_name}`,
            }}
            className="w-[60px] h-[60px] object-right-bottom  rounded-full"
          />
          <View>
            <Text className="mb-1">
              Dr. {specialty.full_name}
            </Text>
            <Text className="mb-1">{specialty.specialty.name}</Text>
            <Text className="mb-1">{specialty.hospital && specialty.hospital}</Text>
            <Text className="">{specialty.location}, Nigeria</Text>
          </View>
        </View>
        <View className="flex  flex-[.3] items-end">
          <TouchableOpacity
            className="bg-sky-500 p-2  rounded"
            onPress={() =>
              navigation.navigate("BookAppointmentScreen", {
                doctorId: specialty.id,
                patientId: authData?.user?.id,
              })
            }
          >
            <Text className="text-white">Book</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default UserCard;
