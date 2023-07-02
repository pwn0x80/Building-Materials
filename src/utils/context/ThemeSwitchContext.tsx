import { createContext, useState } from "react";
import { combineThemeType, themeOptionType, themeTypes } from "types/themes";



export const IconContext = createContext<combineThemeType | null>(null);

export const IconProvider: React.FC<combineThemeType> = ({
  icons,
  option,
  onThemeDispatch,
  themeState,
  children
}) => {
  const value: combineThemeType = {
    icons: icons,
    option: option,
    children: children,
    onThemeDispatch:onThemeDispatch,
    themeState:themeState
  };
  return (
    <IconContext.Provider value={value}>
      {children}
    </IconContext.Provider>
  );
};
