import { useEffect } from 'react';
import InitMap from './InitMap';
import Header from './Header';
import Footer from './Footer';

let isMapInitialized = false;

function Map() {
  
  useEffect(() => {
    
    if (!isMapInitialized) {
      
      InitMap();
      isMapInitialized = true;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header className="" />
        <div id="map" className="overflow-y-hidden flex-1 bg-cyan-900 z-1"></div>
      <Footer className="" />
    </div>
  );
}

export default Map;
