//npm packages and css
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//components
import Map from './pages/Map';
import Header from './components/Header';
import Footer from './components/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="flex flex-col h-screen">
      <Header />
      <Map />
      <Footer />
    </div>
  </React.StrictMode>
);