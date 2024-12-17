import { useMap } from "../utility/MapContext";

const useInfoPanel = () => {
  const map = useMap();
  const ip_name = document.getElementById('ip_name');
  const ip_type = document.getElementById('ip_type');
  const ip_area = document.getElementById('ip_area');
  const ip_img = document.getElementById('ip_img');

  const updateText = (text, type, area) => {
    if (map) {
      const formattedArea = area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      ip_name.textContent="Name: "+text;
      ip_type.textContent="Type: "+type;
      ip_area.innerHTML = `Area: ${formattedArea}m<sup>2</sup>`;
      ip_img.src='/img/'+text+'.png';
      ip_img.alt=text;
    } else {
      console.error("Map instance is not available");
    }
  };

  return updateText;
};

export default useInfoPanel;
