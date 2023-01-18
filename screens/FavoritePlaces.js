import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";

import PlacesList from "../components/Places/PlacesList";
import { FavoritesContext } from "../store/favorites-context";

function FavoritesScreen() {
  const favoritePlacesCtx = useContext(FavoritesContext);

  const favoritePlaces = favoritePlacesCtx.allIds.filter((placeId) =>
    favoritePlacesCtx.ids.includes(placeId)
  );

  if (favoritePlaces.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite places yet.</Text>
      </View>
    );
  }

  return <PlacesList items={favoritePlaces} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
