import React, { createContext, useState } from "react";
export const ScoreContext = createContext();
const ScoreContextProvider = (props) => {
  const [scoreStore, setScoreStore] = useState(0);

  return (
    <ScoreContext.Provider value={{ setScoreStore, scoreStore }}>
      {props.children}
    </ScoreContext.Provider>
  );
};
export default ScoreContextProvider;
