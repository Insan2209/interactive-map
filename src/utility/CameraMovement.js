//import React from 'react';
import { useMap } from './MapContext'

const ButtonToMap = (x, y, zoom) => {
  const map = useMap();

  return () => {
    if(map) {
      map.flyTo([x,y], zoom);
    }
    else {
      console.error("Map instance is not available")
    }
  };
};

export default ButtonToMap;
