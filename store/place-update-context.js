import { createContext, useState } from "react";

export const UpdateContext = createContext({
  storeUpdate: (update) => {},
  storeIdUpdate: (idUpdate) => {},
  update: false,
  idUpdate: "",
});

function UpdateContextProvider({ children }) {
  const [update, setUpdate] = useState("");
  const [idUpdate, setIdUpdate] = useState("");

  function storeUpdate(update) {
    setUpdate(update);
    return update;
  }

  function storeIdUpdate(idUpdate) {
    setIdUpdate(idUpdate);
    return idUpdate;
  }

  const value = {
    storeUpdate: storeUpdate,
    storeIdUpdate: storeIdUpdate,
    update: update,
    idUpdate: idUpdate,
  };

  return (
    <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>
  );
}

export default UpdateContextProvider;
