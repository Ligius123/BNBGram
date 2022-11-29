import PlaceForm from "../components/Places/PlaceForm";
import BackgroundImage from "../components/ui/BackgroundImage";
function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
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
