import PlaceForm from "../components/Places/PlaceForm";
import { ImageBackground, StyleSheet } from "react-native";

function AddPlace() {
  return (
    <ImageBackground
      source={require("../assets/images/roma.png")}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
    >
      <PlaceForm />
    </ImageBackground>
  );
}

export default AddPlace;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
