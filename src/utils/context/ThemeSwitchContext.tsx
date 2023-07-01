import { createContext, useState } from "react";
import { combineThemeType, themeOptionType, themeTypes } from "types/themes";



export const IconContext = createContext<combineThemeType | null>(null);

export const IconProvider: React.FC<combineThemeType> = ({
  icons,
  option,
  children
}) => {
  const value: combineThemeType = {
    icons: icons,
    option: option,
    children: children
  };
  return (
    <IconContext.Provider value={value}>
      {children}
    </IconContext.Provider>
  );
};
