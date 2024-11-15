import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map from './components/Map';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <div id="map" className="h-screen w-screen bg-cyan-800"></div>
    <Map />
  </React.StrictMode>
);