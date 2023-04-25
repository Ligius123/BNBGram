import { useEffect, useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

import PlacesList from "../components/Places/PlacesList";
import BackgroundImage from "../components/ui/BackgroundImage";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { UserContext } from "../store/user-context";

function MyPlaces({ route }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const BACKEND_URL = "https://bnbgram-default-rtdb.firebaseio.com";

  const userCtx = useContext(UserContext);

  const isFocused = useIsFocused();

  async function fetchMyPlace() {
    const response = await axios.get(BACKEND_URL + "/place.json");

    const places = [];

    for (const key in response.data) {
      if (response.data[key].user === userCtx.email) {
        const placeObj = {
          id: key,
          address: response.data[key].address,
          description: response.data[key].description,
          location: response.data[key].location,
          imageUriC: response.data[key].imageUriC,
          imageUriG: response.data[key].imageUriG,
          title: response.data[key].title,
          date: response.data[key].date,
          favorite: response.data[key].favorite,
          user: response.data[key].user,
        };
        places.push(placeObj);
      }
    }
    return places;
  }

  useEffect(() => {
    async function loadPlaces() {
      setIsFetching(true);
      try {
        const myPlaces = await fetchMyPlace();
        setLoadedPlaces(myPlaces);
      } catch (error) {
        setError("Could not fetch my places!");
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
    return <LoadingOverlay message="View my places..." />;
  }

  return (
    <BackgroundImage>
      <PlacesList places={loadedPlaces} />
    </BackgroundImage>
  );
}

export default MyPlaces;
