import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  const navigation = useNavigation();

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
    marginLeft: "5%",
    marginRight: "5%",
  },
});
