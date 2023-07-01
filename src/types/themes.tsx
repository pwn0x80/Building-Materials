import { type } from "os";
import React from "react"

export type themeTypes = {
  // light default do not delete
  light: React.ReactNode;
  dark: React.ReactNode;
};

export type themeOptionType = {
    light: string;
    dark: string;
}

export type combineThemeType = {
  option:themeOptionType,
  icons: themeTypes
  children?: React.ReactNode;
}
