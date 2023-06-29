import React, { useEffect } from 'react';
import logo from './logo.svg';
// import './App.css';
import { Navbar } from "@components/Home/Navbar";
import { MobBuyerNavbar } from '@components/NavBar/MobBuyerNavbar';
import { applyTheme, createTheme } from '@components/theme/utils';
import darkTheme from '@components/theme/darktheme';
import baseTheme from '@components/theme/base';
import { BuyerNavbar } from '@components/NavBar/BuyerNavbar';

function App() {
  useEffect(()=>{
    applyTheme(baseTheme)
    // applyTheme(darkTheme)
  },[])
  return (
      <div>
      <BuyerNavbar/>
      <MobBuyerNavbar />
    </div>
  );
}

export default App;
