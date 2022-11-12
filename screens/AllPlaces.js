import PlacesList from "../components/Places/PlacesList";
import { ImageBackground, StyleSheet } from "react-native";

function AllPlaces() {
  return (
    <ImageBackground
      source={require("../assets/images/roma.png")}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
    >
      <PlacesList />
    </ImageBackground>
  );
}

export default AllPlaces;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
