import { useEffect } from 'react';
import InitMap from './InitMap';

let isMapInitialized = false; // Flaga do sprawdzania inicjalizacji

function Map() {
  useEffect(() => {
    if (!isMapInitialized) {
      InitMap(); // Inicjalizuj mapę tylko raz
      isMapInitialized = true; // Ustaw flagę na true
    }
  }, []);

  return null;
}

export default Map;
