import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  allIds: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
  storeIds: (allIds) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoritePlaceIds, setFavoritePlaceIds] = useState([]);
  const [allIds, setAllIds] = useState([]);

  function storeIds(allIds) {
    setAllIds((currentIds) => [...currentIds, allIds]);
  }

  function addFavorite(id) {
    setFavoritePlaceIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id) {
    setFavoritePlaceIds((currentFavIds) =>
      currentFavIds.filter((placeId) => placeId !== id)
    );
  }

  const value = {
    ids: favoritePlaceIds,
    allIds: allIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    storeIds: storeIds,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
