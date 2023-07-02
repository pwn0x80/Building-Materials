import { type } from "os";
import React from "react"

export type themeTypes = {
 [key: string]: React.ReactNode;
};

export type themeOptionType = {
    light: string;
    dark: string;

}

export type themeReduceType = 'light' | 'dark'| string;
export type themeAction = {
  type: themeReduceType,
  payload?:string
}

export type initAction = () => any;
export type combineThemeType = {
  option:themeOptionType,
  icons: themeTypes
  children?: React.ReactNode;
  onThemeDispatch:React.Dispatch<themeAction>
  themeState:themeReduceType
}
