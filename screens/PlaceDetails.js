import { useEffect, useState, useLayoutEffect } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";

import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/styles";
import { fetchPlaceDetails, deletePlace } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import IconButton from "../components/ui/IconButton";
import FavoriteButton from "../components/ui/FavoriteButton";

function PlaceDetails({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [fetchedPlace, setFetchedPlace] = useState();

  const [isFavorite, setIsFavorite] = useState(false);

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  async function changeFavoriteStatusHandler() {
    setIsFetching(true);
    try {
      const favPlace = await fetchFavoritePlace(selectedPlaceId);
      setIsFavorite(true);
      setFetchedPlace(favPlace);
      navigation.navigate("FavoritePlaces", {
        place: place,
      });
    } catch (error) {
      setError("Could not add a place!");
      Alert.alert("Not enough arguments", "You have to fill al the fields");
    }
    setIsFetching(false);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <FavoriteButton
            icon={isFavorite ? "star" : "star-outline"}
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
        setError("Could not fetch place details!" + selectedPlaceId);
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
    await deletePlace(selectedPlaceId);
    navigation.goBack();
    console.log("Delete");
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUriC }} />
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUriG }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{fetchedPlace.description}</Text>
        </View>
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
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
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
