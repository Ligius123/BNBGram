import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import BackgroundImage from "../components/ui/BackgroundImage";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return (
    <BackgroundImage>
      <PlacesList places={loadedPlaces} />
    </BackgroundImage>
  );
}

export default AllPlaces;
