//npm packages
import { useEffect, useState } from 'react';
//config
import InitMap from '../config/InitMap';
//components
import CollapsibleSidebarButton from '../components/CollapsibleSidebarButton'
//utility
import { MapProvider } from '../utility/MapContext';

//variable responsible for map initialization
let isMapInitialized = false;
let mapInstance = null;


function Map() {
  //Map sections
  const map_parts = [
    { sectionId: 1, text: "Regions", type: "region" },
    { sectionId: 2, text: "Islands", type: "island" },
    { sectionId: 3, text: "Forts", type: "fort" },
    { sectionId: 4, text: "Outposts", type: "outpost" },
    { sectionId: 5, text: "Seaposts", type: "seapost" },
  ];
  const points_of_interest = [
    { sectionId: 6, text: "Characters", type: "character" },
    { sectionId: 7, text: "Beacons", type: "beacon" },
    { sectionId: 8, text: "Thrones", type: "throne" },
    { sectionId: 9, text: "Journals", type: "journal" },
    { sectionId: 10, text: "Volcanos", type: "volcano" },
    { sectionId: 11, text: "Barrels", type: "barrel" },
    { sectionId: 12, text: "Riddle Locations", type: "riddlelocation" },
  ];
  const treasure_values = [
    { sectionId: 13, text: "Gold Hoarders", type: "goldhoarders" },
    { sectionId: 14, text: "Order of Souls", type: "orderofsouls" },
    { sectionId: 15, text: "Merchant Alliance", type: "merchantalliance" },
    { sectionId: 16, text: "Reaper's Bones", type: "reapersbones" },
    { sectionId: 17, text: "Athena's Fortune", type: "athenasfortune" },
    { sectionId: 18, text: "The Hunter's Call", type: "thehunterscall" },
    { sectionId: 19, text: "Other Treasures", type: "othertreasures" },
    { sectionId: 20, text: "Value Calculator", type: "valuecalculator" },
  ];

  //useState used for expanding and collapsing sections (only one at time)
  const [expand, setExpand] = useState(0);

  //checking if map is initialized, if not then initialize and set isMapInitialized to true
  useEffect(() => {
    const initializeMap = async () => {
      if (!isMapInitialized) {
        mapInstance = await InitMap();
        isMapInitialized = true;
      }
    };
    initializeMap();
  }, []);

  //return (HTML)
  return (
    <MapProvider mapInstance={mapInstance}>
    <div className="grid grid-cols-[350px_auto_350px] h-max flex-1 relative overflow-y-hidden">
      <div className="w-[350px] h-full overflow-y-auto scrollbar scrollbar-thumb-palette2-e scrollbar-track-palette1-d bg-palette1-d border-y-2 border-palette1-c border-solid p-2">
        <div className="py-2">
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Map parts</p>
          <ul>
            {map_parts.map((section, index) => (<CollapsibleSidebarButton key={section.sectionId} expand={expand} setExpand={setExpand} sectionId={section.sectionId} tableName="map_parts" img={section.type} text={section.text} type={section.type}/>))}
          </ul>
          <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Points of interest</p>
            {points_of_interest.map((section, index) => (<CollapsibleSidebarButton key={section.sectionId} expand={expand} setExpand={setExpand} sectionId={section.sectionId} tableName="map_parts" img={section.type} text={section.text} type={section.type}/>))}
          <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Treasure value</p>
            {treasure_values.map((section, index) => (<CollapsibleSidebarButton key={section.sectionId} expand={expand} setExpand={setExpand} sectionId={section.sectionId} tableName="map_parts" img={section.type} text={section.text} type={section.type}/>))}
        </div>
      </div>
      
      <div id="map" className="h-full bg-palette1-b grow col-start-2 col-end-4 row-span-full"></div>
      <div id="information_panel" className="w-[350px] h-fit bg-transparent col-start-3 col-end-4 row-span-full z-[1000]">
        <div className="text-2xl my-auto text-palette1-a font-bokor p-5 bg-cover" style={{backgroundImage: "url('/svg/bg1.svg')"}}>
          <p id="ip_name" className="text-center text-3xl">Click any location to display informations about it</p>
          <div className="my-2">
            <img src="/svg/line2.svg" alt="" className="z-10 relative"/>
            <img id="ip_img" alt="" src="" className="max-h-48 w-auto -my-1 z-0"/>
            <img src="/svg/line2.svg" alt="" className="z-10 relative"/>
          </div>
          <p id="ip_description" className="my-4"></p>
          <p id="ip_area" className="my-3"></p>
          <p id="ip_animals" className="my-3"></p>
          <div className="my-2 hidden" id="points_of_interest">
            <img src="/svg/line2.svg" alt="" className="z-10 relative"/>
            <p id="ip_poi" className="text-center text-3xl">Points of Interest</p>
            <img src="/svg/line2.svg" alt="" className="z-10 relative"/>
          </div>
        </div>
      </div>
    </div>
    </MapProvider>
  );
}

export default Map;
