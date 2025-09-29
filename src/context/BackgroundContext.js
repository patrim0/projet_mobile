// context/BackgroundContext.js
import React, { createContext, useState, useContext } from 'react';

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [background, setBackground] = useState('bg1'); // default background image

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);
