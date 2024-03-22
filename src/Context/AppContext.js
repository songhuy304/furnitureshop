import React, { createContext, useState } from 'react';

// Tạo Context
export const Appcontext = createContext(null);


export const AppProvider  = ({children}) => {
  const [nav, setNav] = useState('All');    

  
  
  return (
    <Appcontext.Provider value={{nav ,setNav}}>
      {children}
    </Appcontext.Provider>
  );

}