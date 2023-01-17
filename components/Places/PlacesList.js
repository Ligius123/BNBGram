import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { useEffect } from "react";

import { PlacesNumberContext } from "../../store/numberPlaces-context";
import { Colors } from "../../constants/styles";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  const navigation = useNavigation();
  const numberOfPlaces = useContext(PlacesNumberContext);

  useEffect(() => {
    numberOfPlaces.getNumberOfPlaces(places.length);
  }, [places.length]);

  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", { placeId: id });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.alignment}>
      <Text style={styles.number}>
        {numberOfPlaces.numberOfPlaces} places to view!
      </Text>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceItem place={item} onSelect={selectPlaceHandler} />
        )}
      />
    </View>
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  alignment: {
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",
  },
  number: {
    marginTop: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "25%",
    padding: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary1000,
    width: "50%",
    elevation: 10,
    opacity: 0.5,
  },
});
