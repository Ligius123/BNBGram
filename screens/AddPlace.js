import { Alert } from "react-native";

import PlaceForm from "../components/Places/PlaceForm";
import BackgroundImage from "../components/ui/BackgroundImage";
import { storePlace } from "../util/http";
function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    const id = await storePlace(place);
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }

  return (
    <BackgroundImage>
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </BackgroundImage>
  );
}

export default AddPlace;
