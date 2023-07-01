import React, { useEffect } from 'react';
import logo from './logo.svg';
// import './App.css';
import { Navbar } from "@components/Home/Navbar";
import { MobBuyerNavbar } from '@components/NavBar/MobBuyerNavbar';
import { applyTheme, createTheme } from '@components/theme/utils';
import { BuyerNavbar } from '@components/NavBar/BuyerNavbar';

function App() {
  useEffect(()=>{
    // applyTheme(baseTheme)
  },[])
  return (
      <div>
      <BuyerNavbar/>
      <MobBuyerNavbar />
    </div>
  );
}

export default App;
