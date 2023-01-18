import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  allIds: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
  storeIds: (ids) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoritePlaceIds, setFavoritePlaceIds] = useState([]);
  const [ids, setIds] = useState([]);

  function storeIds(ids) {
    setIds((currentIds) => [...currentIds, ids]);
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
    allIds: ids,
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
