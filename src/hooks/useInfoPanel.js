import { useMap } from "../utility/MapContext";

const useInfoPanel = () => {
  const map = useMap();
  const abc = ["Chickens", "Pigs", "Snakes"];

  const ip_name = document.getElementById('ip_name');
  const ip_area = document.getElementById('ip_area');
  const ip_img = document.getElementById('ip_img');
  const ip_description = document.getElementById('ip_description');
  const ip_animals = document.getElementById('ip_animals');
  const poi = document.getElementById('points_of_interest');

  function listAnimals(animals) {
    const convertedValues = animals.map(value => typeof value === "boolean" ? (value ? '<span class="text-green-600">Yes</span>' : '<span class="text-red-600">No</span>') : "???");
    const result = abc.map((key, index) => `${key}: ${convertedValues[index]}`).join('<br/>');
    ip_animals.innerHTML = result;
  }

  const updateText = (text, area, description, animals) => {
    if (map) {
      const formattedArea = area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      ip_name.textContent=text;
      ip_description.textContent=description;
      ip_area.innerHTML = `Area: ${formattedArea}m<sup>2</sup>`;
      ip_img.src='/img/'+text+'.png';
      ip_img.alt=text;
      listAnimals(animals);
      poi.classList.replace("hidden", "visible")
    } else {
      console.error("Map instance is not available");
    }
  };

  return updateText;
};

export default useInfoPanel;
