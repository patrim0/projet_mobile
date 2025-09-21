import React, { createContext, useContext, useMemo, useState } from 'react';

const ColorContext = createContext({
  textColor: '#111111',
  setTextColor: () => {},
});

export const TextColorProvider = ({ children }) => {
  const [textColor, setTextColor] = useState('#111111'); // Noir par défaut
  const value = useMemo(() => ({ textColor, setTextColor }), [textColor]);
  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
};

export const useTextColor = () => useContext(ColorContext);

