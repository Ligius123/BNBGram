import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import BackgroundImage from "../components/ui/BackgroundImage";
import { fetchPlace } from "../util/http";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlace();
      setLoadedPlaces(places);
    }

    if (isFocused && route.params) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return (
    <BackgroundImage>
      <PlacesList places={loadedPlaces} />
    </BackgroundImage>
  );
}

export default AllPlaces;
