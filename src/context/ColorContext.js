import { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const TextColorProvider = ({ children }) => {
  const [textColor, setTextColor] = useState('#111111');
  const [applyEverywhere, setApplyEverywhere] = useState(false);

  return (
    <ColorContext.Provider value={{ textColor, setTextColor, applyEverywhere, setApplyEverywhere }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useTextColor = () => useContext(ColorContext);