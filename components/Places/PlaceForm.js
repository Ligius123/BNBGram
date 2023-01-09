import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";

import { Colors } from "../../constants/styles";
import Button from "../ui/Button";
import ImagePicker from "./ImagePicker";
import Camera from "./Camera";
import LocationPicker from "./LocationPicker";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredText, setEnteredText] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function changeTextHandler(enteredText) {
    setEnteredText(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  function chooseImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(
      enteredTitle,
      enteredText,
      selectedImage,
      pickedLocation
    );
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={[styles.input, enteredTitle.length > 0 && styles.highlight]}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
        <Text style={styles.label}>Description</Text>
        <ScrollView>
          <TextInput
            style={[
              styles.description,
              enteredText.length > 0 && styles.highlight,
            ]}
            onChangeText={changeTextHandler}
            value={enteredText}
          />
        </ScrollView>
      </View>
      <Camera onTakeImage={takeImageHandler} />
      <ImagePicker onChooseImage={chooseImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary900,
    opacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary500,
    elevation: 7,
  },
  description: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary900,
    opacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary500,
    elevation: 7,
    height: 100,
  },
  highlight: {
    borderBottomColor: Colors.primary800,
    borderBottomWidth: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary900,
    elevation: 10,
    fontWeight: "bold",
  },
});
