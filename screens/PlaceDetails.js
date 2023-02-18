import { useEffect, useState, useLayoutEffect } from "react";
import { ScrollView, Image, View, Text, Modal, StyleSheet } from "react-native";
import { useContext } from "react";
import { FavoritesContext } from "../store/favorites-context";
import { LinearGradient } from "expo-linear-gradient";

import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/styles";
import { fetchPlaceDetails, deletePlace } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import IconButton from "../components/ui/IconButton";
import FavoriteButton from "../components/ui/FavoriteButton";
import BackgroundImage from "../components/ui/BackgroundImage";

function PlaceDetails({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [fetchedPlace, setFetchedPlace] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  function acceptDeleteHandler() {
    setModalVisible(true);
  }

  async function deletePlaceHandler() {
    setIsDeleting(true);
    try {
      await deletePlace(selectedPlaceId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete place!" + selectedPlaceId.title);
    }
    setIsDeleting(false);
  }

  if (error && !isDeleting) {
    return <ErrorOverlay message={error} />;
  }

  if (isDeleting) {
    return <LoadingOverlay message="Deleting place..." />;
  }

  if (modalVisible) {
    return (
      // <LinearGradient colors={[Colors.primary1100, Colors.primary1200]}>
      <BackgroundImage>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Are you sure you want to delete this item?
                </Text>
                <View style={styles.modalButtons}>
                  <OutlinedButton onPress={deletePlaceHandler}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </OutlinedButton>
                  <OutlinedButton
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>No</Text>
                  </OutlinedButton>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </BackgroundImage>
    );
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
              onPress={acceptDeleteHandler}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
