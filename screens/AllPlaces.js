import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import BackgroundImage from "../components/ui/BackgroundImage";
import { fetchPlace } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function AllPlaces({ route }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

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

    if (isFocused && route.params) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View all places..." />;
  }

  return (
    <BackgroundImage>
      <PlacesList places={loadedPlaces} />
    </BackgroundImage>
  );
}

export default AllPlaces;
