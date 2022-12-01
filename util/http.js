import axios from "axios";

const BACKEND_URL = "https://bnbgram-default-rtdb.firebaseio.com";

export async function storePlace(place) {
  const response = await axios.post(BACKEND_URL + "/place.json", place);
  const id = response.data.name;
  return id;
}

export async function fetchPlace() {
  const response = await axios.get(BACKEND_URL + "/place.json");

  const places = [];
  console.log("S or randuit in All Places Screen");
  console.log(places);
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      address: response.data[key].address,
      location: response.data[key].location,
      imageUri: response.data[key].imageUri,
      title: response.data[key].title,
    };
    places.push(expenseObj);
  }

  return places;
}
