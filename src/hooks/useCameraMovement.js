import { useMap } from "../utility/MapContext";

const useCameraMovement = () => {
  const map = useMap();

  const moveCamera = (x, y, zoom) => {
    if (map) {
      map.flyTo([x, y], zoom);
    } else {
      console.error("Map instance is not available");
    }
  };

  return moveCamera;
};

export default useCameraMovement;
