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

// export async function storeFavoritePlaceId(placeId, selectedPlaceId) {
//   const response = await axios.post(
//     BACKEND_URL + `/favorite/${selectedPlaceId}.json`,
//     placeId
//   );
//   const id = selectedPlaceId;
//   return id;
// }

export async function storeFavoritePlaceId(placeId, selectedPlaceId) {
  try {
    const url = `${BACKEND_URL}/favorite/${selectedPlaceId}.json`;
    const response = await axios.put(url, placeId);
    return selectedPlaceId;
  } catch (error) {
    console.error("Eroare la stocarea ID-ului preferat:", error);
    throw error;
  }
}

export async function fetchMessage() {
  const response = await axios.get(BACKEND_URL + "/message.json");

  const message = [];

  for (const key in response.data) {
    const messageObj = {
      id: key,
      message: response.data[key].message,
      user: response.data[key].user,
      date: response.data[key].date,
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
    title: response.data.title,
    date: response.data.date,
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
      title: response.data[key].title,
      date: response.data[key].date,
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

export async function fetchFavoritePlace() {
  const response = await axios.get(BACKEND_URL + "/favorite.json");

  const favoritePlaces = [];

  for (const key in response.data) {
    const placeObj = {
      id: key,
      placeId: response.data[key].placeId,
      // user: response.data[key].user,
    };
    favoritePlaces.push(placeObj.placeId);
  }
  return favoritePlaces;
}

export function updatePlace(id, place) {
  return axios.put(BACKEND_URL + `/place/${id}.json`, place);
}

export function deletePlace(id) {
  return axios.delete(BACKEND_URL + `/place/${id}.json`);
}

export function deleteFavoritePlace(id) {
  return axios.delete(BACKEND_URL + `/favorite/${id}.json`);
}

export async function updateDocumentAttribute(
  collection,
  documentId,
  attributeName,
  attributeValue
) {
  try {
    const url = { BACKEND_URL } + `/${collection}/${documentId}.json`;

    await axios.put(url, { [attributeName]: attributeValue });

    console.log("Atributul a fost actualizat cu succes! ");
  } catch (error) {
    console.error("Eroare la actualizarea atributului: ", error);
  }
}
