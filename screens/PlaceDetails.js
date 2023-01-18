import { useEffect, useState, useLayoutEffect } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { FavoritesContext } from "../store/favorites-context";

import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/styles";
import { fetchPlaceDetails, deletePlace } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import IconButton from "../components/ui/IconButton";
import FavoriteButton from "../components/ui/FavoriteButton";
import { LinearGradient } from "expo-linear-gradient";

function PlaceDetails({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [fetchedPlace, setFetchedPlace] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const favoritePlaces = useContext(FavoritesContext);
  const selectedPlaceId = route.params.placeId;

  const placeIsFavorite = favoritePlaces.ids.includes(selectedPlaceId);

  async function changeFavoriteStatusHandler() {
    console.log("pressed!");
    if (placeIsFavorite) {
      favoritePlaces.removeFavorite(selectedPlaceId);
    } else {
      favoritePlaces.addFavorite(selectedPlaceId);
    }
    navigation.navigate("FavoritePlaces", {
      ids: favoritePlaces.ids,
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <FavoriteButton
            icon={placeIsFavorite ? "star" : "star-outline"}
            color="white"
            onCreateFavoritePlace={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  useEffect(() => {
    async function loadPlaceData() {
      setIsFetching(true);
      try {
        const place = await fetchPlaceDetails(selectedPlaceId);
        setFetchedPlace(place);
        navigation.setOptions({
          title: place.title,
        });
      } catch (error) {
        setError(
          "Could not fetch place details for " + selectedPlaceId.title + "!"
        );
      }
      setIsFetching(false);
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View place details..." />;
  }

  async function deletePlaceHandler() {
    setIsDeleting(true);
    try {
      await deletePlace(selectedPlaceId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete place!" + selectedPlaceId.id);
    }
    setIsDeleting(false);
  }

  if (error && !isDeleting) {
    return <ErrorOverlay message={error} />;
  }

  if (isDeleting) {
    return <LoadingOverlay message="Deleting place..." />;
  }

  return (
    <ScrollView>
      <LinearGradient colors={[Colors.primary1100, Colors.primary1200]}>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUriC }} />
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUriG }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace.address}</Text>
          </View>
          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.description}>"{fetchedPlace.description}"</Text>
          </ScrollView>
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View on Map
          </OutlinedButton>
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={"black"}
              size={36}
              onPress={deletePlaceHandler}
            />
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    elevation: 5,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
    // height: "100%",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: Colors.primary300,
    opacity: 0.5,
    borderRadius: 16,
    elevation: 5,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    marginBottom: 8,
    width: "90%",
  },
  description: {
    color: Colors.primary500,
    textAlign: "center",
    fontSize: 16,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "whites",
    alignItems: "center",
    marginBottom: 32,
  },
});
