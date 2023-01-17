import { View, Text } from "react-native";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import BackgroundImage from "../components/ui/BackgroundImage";
import { PlacesNumberContext } from "../store/numberPlaces-context";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
function HowMany({ navigation }) {
  numberPlaces = useContext(PlacesNumberContext);

  function seePlacesHandler() {
    navigation.navigate("AllPlaces", {
      numberOfPlaces: numberPlaces.numberOfPlaces,
    });
  }

  return (
    <BackgroundImage>
      <View style={styles.viewPort}>
        <View style={styles.box}>
          <Text style={styles.text}>
            You have {numberPlaces.numberOfPlaces} places to view !
          </Text>

          <Button onPress={seePlacesHandler}>View Places</Button>
        </View>
      </View>
    </BackgroundImage>
  );
}

export default HowMany;

const styles = StyleSheet.create({
  viewPort: {
    height: "50%",
    marginTop: "30%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: Colors.primary1000,
    width: "80%",
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 16,
    elevation: 5,
    shadowColor: Colors.primary500,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    padding: 24,
    opacity: 0.7,
  },
  text: {
    textShadowColor: Colors.primary500,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    flex: 2,
    fontSize: 20,
  },
});
