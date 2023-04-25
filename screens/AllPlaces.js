import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

import PlacesList from "../components/Places/PlacesList";
import BackgroundImage from "../components/ui/BackgroundImage";
import { fetchPlace } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { Colors } from "../constants/styles";

function AllPlaces({ route }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [search, setSearch] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchPlace();
        setLoadedPlaces(places);
      } catch (error) {
        setError("Could not fetch places!");
      }
      setIsFetching(false);
    }

    loadPlaces();
    // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
  }, [isFocused, route]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View all places..." />;
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = loadedPlaces.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setLoadedPlaces(newData);
      setSearch(text);
    } else {
      setLoadedPlaces(loadedPlaces);
      setSearch(text);
    }
  };

  return (
    <BackgroundImage>
       <TextInput
        style={styles.searchBar}
        value={search}
        placeholder="Search for places here"
        onChangeText={(text) => searchFilter(text)}
      />
      <PlacesList places={loadedPlaces} />
    </BackgroundImage>
  );
}

export default AllPlaces;

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary1100,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary900,
    opacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: Colors.primary500,
    elevation: 7,
  },
})
