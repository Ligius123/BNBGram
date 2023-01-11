import axios from "axios";

const BACKEND_URL = "https://bnbgram-default-rtdb.firebaseio.com";

export async function storePlace(place) {
  const response = await axios.post(BACKEND_URL + "/place.json", place);
  const id = response.data.name;
  return id;
}

export async function storeFavoritePlace(place) {
  const response = await axios.post(
    BACKEND_URL + "/place/favoriteplaces.json",
    place
  );
  const id = response.data.name;
  return id;
}

export async function fetchPlaceDetails(id) {
  const response = await axios.get(BACKEND_URL + `/place/${id}.json`);

  const place = {
    id: response.data.id,
    address: response.data.address,
    description: response.data.description,
    location: response.data.location,
    imageUriC: response.data.imageUriC,
    imageUriG: response.data.imageUriG,
    title: response.data.title,
  };

  console.log(place);
  return place;
}

export async function fetchPlace() {
  const response = await axios.get(BACKEND_URL + "/place.json");

  const places = [];
  // console.log("S or randuit in All Places Screen");

  for (const key in response.data) {
    const placeObj = {
      id: key,
      address: response.data[key].address,
      description: response.data[key].description,
      location: response.data[key].location,
      imageUriC: response.data[key].imageUriC,
      imageUriG: response.data[key].imageUriG,
      title: response.data[key].title,
    };
    places.push(placeObj);
  }
  // console.log(places);
  return places;
}

export async function fetchFavoritePlace() {
  const response = await axios.get(BACKEND_URL + "/place/favoriteplaces.json");

  const places = [];
  console.log("S or randuit in All Places Screen");

  for (const key in response.data) {
    const placeObj = {
      id: key,
      address: response.data[key].address,
      description: response.data[key].description,
      location: response.data[key].location,
      imageUriC: response.data[key].imageUriC,
      imageUriG: response.data[key].imageUriG,
      title: response.data[key].title,
    };
    places.push(placeObj);
  }
  console.log(places);
  return places;
}

export function updatePlace(id, place) {
  return axios.put(BACKEND_URL + `/place/${id}.json`, place);
}

export function deletePlace(id) {
  return axios.delete(BACKEND_URL + `/place/${id}.json`);
}
