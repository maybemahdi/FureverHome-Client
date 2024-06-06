import { createContext, useState, useContext } from 'react';

const FooterVisibilityContext = createContext();
export const useFooterVisibility = () => useContext(FooterVisibilityContext);

export const FooterVisibilityProvider = ({ children }) => {
  const [isFooterVisible, setFooterVisible] = useState(true);

  return (
    <FooterVisibilityContext.Provider value={{ isFooterVisible, setFooterVisible }}>
      {children}
    </FooterVisibilityContext.Provider>
  );
};

