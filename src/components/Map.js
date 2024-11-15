import { useEffect } from 'react';
import InitMap from './InitMap';

let isMapInitialized = false;

function Map() {
  
  useEffect(() => {
    
    if (!isMapInitialized) {
      InitMap();
      isMapInitialized = true;
    }
  }, []);

  return null;
}

export default Map;
