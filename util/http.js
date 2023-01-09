import axios from "axios";

const BACKEND_URL = "https://bnbgram-default-rtdb.firebaseio.com";

export async function storePlace(place) {
  const response = await axios.post(BACKEND_URL + "/place.json", place);
  const id = response.data.name;
  return id;
}

export async function fecthPlaceDetails(id) {
  const response = await axios.get(BACKEND_URL + `/place/${id}.json`);

  const place = {
    id: response.data.id,
    address: response.data.address,
    description: response.data.description,
    location: response.data.location,
    imageUri: response.data.imageUri,
    title: response.data.title,
  };

  console.log("S or randuit in All Places Screen");
  console.log(place);
  return place;
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
      description: response.data[key].description,
      location: response.data[key].location,
      imageUri: response.data[key].imageUri,
      title: response.data[key].title,
    };
    places.push(expenseObj);
  }

  return places;
}

export function updatePlace(id, place) {
  return axios.put(BACKEND_URL + `/place/${id}.json`, place);
}

export function deletePlace(id) {
  return axios.delete(BACKEND_URL + `/place/${id}.json`);
}
