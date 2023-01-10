import { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";

import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/styles";
import { fetchPlaceDetails } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function PlaceDetails({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {}

  const selectedPlaceId = route.params.placeId;

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

  // function errorHandler() {
  //   setError(null);
  // }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View place details..." />;
  }

  // if (!fetchedPlace) {
  //   return (
  //     <View style={styles.fallback}>
  //       <LoadingOverlay message="View place details..." />
  //     </View>
  //   );
  // }

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
});
