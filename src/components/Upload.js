import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import user from "../services/user";
export default function UploadImage({ img , id}) {
  const [image, setImage] = useState({ uri: img });
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState();

  const addImage = async () => {
    isLoading(true);
    // No permissions request is necessary for launching the image library
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });

      if (!result.canceled) {
       await  setImage(result.assets[0]);
        console.log(result.assets[0].fileSize / 1024);
       await  changeAvatar(result.assets[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading(false);
    }
  };

  const changeAvatar = async (image) => {
    try {
      isLoading(true);
      const data = new FormData();
      data.append("file", {
        uri: image.uri,
        name:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
        type: image.type,
      });
      console.log({
        uri: image.uri,
        name:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
        type: image.type,
      })
      const res = await user.uploadImg(data, id);

      if (res.ok) {
        // refreshUser();
        Alert.alert("Photo Updated Successfully.");
      } else {
        console.log(res.data);
        Alert.alert("Error Uploading Photo");
      }
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      isLoading(false);
    }
  };


  return (
    <View style={imageUploaderStyles.container} className="mx-auto">
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 120, height: 120 }}
        />
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text className="text-white mb-1 font-bold text-[10px]">
            {image?.uri ? "Edit" : "Upload"} Image
          </Text>
          <Icon name="camera" size={10} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 120,
    width: 120,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#38bdf8",
    width: "100%",
    height: "30%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
});
