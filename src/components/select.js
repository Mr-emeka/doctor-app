import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Touchable = (text = "Select an Option") => {
  const TouchableComponent = () => {
    return (
      <TouchableOpacity>
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };
  return { TouchableComponent };
};

const option = () => {};
export default function select({
  touchableComponent = Touchable,
  touchableText = "Select an Option",
}) {
  const { TouchableComponent } = touchableComponent(touchableText);
  return (
    <>
      <TouchableComponent />
    </>
  );
}
