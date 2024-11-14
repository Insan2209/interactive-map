import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map from './components/Map';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div id="map" className="h-screen w-screen"></div>
    <Map />
  </React.StrictMode>
);