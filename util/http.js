import axios from "axios";

const BACKEND_URL = "https://bnbgram-default-rtdb.firebaseio.com";

export async function storePlace(place) {
  const response = await axios.post(BACKEND_URL + "/place.json", place);
  const id = response.data.name;
  return id;
}

export async function storeMessage(message) {
  const response = await axios.post(BACKEND_URL + "/message.json", message);
  const id = response.data.name;
  return id;
}

export async function storeLike(like) {
  const response = await axios.post(BACKEND_URL + "/place.json", like);
  const id = response.data.name;
  return id;
}

export async function fetchMessage() {
  const response = await axios.get(BACKEND_URL + "/message.json");

  const message = [];

  for (const key in response.data) {
    const messageObj = {
      id: key,
      message: response.data[key].message,
      user: response.data[key].user,
    };
    message.push(messageObj);
  }
  return message;
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
    date: response.data.date,
    favorite: response.data.false,
    user: response.data.user,
  };

  return place;
}

export async function fetchPlace() {
  const response = await axios.get(BACKEND_URL + "/place.json");

  const places = [];

  for (const key in response.data) {
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
  return places;
}

export async function numberOfPlaces() {
  let count = 0;
  const response = await axios.get(BACKEND_URL + "/place.json");

  for (const key in response.data) {
    count++;
  }

  return count;
}

export async function fetchFavoritePlace(ids) {
  const response = await axios.get(BACKEND_URL + "/place.json");

  const places = [];

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
  return places;
}

export function updatePlace(id, place) {
  return axios.put(BACKEND_URL + `/place/${id}.json`, place);
}

export function deletePlace(id) {
  return axios.delete(BACKEND_URL + `/place/${id}.json`);
}
