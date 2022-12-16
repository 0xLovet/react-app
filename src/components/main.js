import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Mint from './mint';
import MarketPlace from './marketplace';

const Main = () => {
  return (
    <Routes> {/* The Routes decides which component to show based on the current URL.*/}
      <Route path='/' element={<Home/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/mint' element={<Mint/>}></Route>
      <Route path='/marketplace' element={<MarketPlace/>}></Route>
      <Route path='/artgallery' element={<ArtGallery/>}></Route>
    </Routes>
  );
}

function ArtGallery(){

  window.location.replace('https://gallery.0xlovet.com/');
  return null;
}

export default Main;