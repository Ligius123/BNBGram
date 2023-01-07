import React, { useState } from "react";
import { Image, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet } from "react-native";

import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/styles";
export default function ImagePickerComp() {
  const [pickedImage, setPickedImage] = useState(null);

  async function pickImage({ onChooseImage }) {
    // No permissions request is necessary for launching the image library
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setPickedImage(image.uri);
    onChooseImage(image.uri);
    console.log(image);

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={pickImage}>
        Pick an image from camera roll
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary900,
    borderRadius: 4,
    overflow: "hidden",
    opacity: 0.7,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary500,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
