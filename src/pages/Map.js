//npm packages
import { useEffect, useState } from 'react';
//config
import InitMap from '../config/InitMap';
//components
import CollapsibleSidebarButton from '../components/CollapsibleSidebarButton'
import InfoPanel from '../components/InfoPanel';
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
  const [selectedIsland, setSelectedIsland] = useState(null);

  const handleIslandNameClick = (islandData) => {
    setSelectedIsland(islandData);
  }

  //checking if map is initialized, if not then initialize and set isMapInitialized to true
  useEffect(() => {
    const initializeMap = async () => {
      const mapEl = document.getElementById('map');
      if (mapEl && mapEl._leaflet_id) {
        return;
      }
      if (!isMapInitialized) {
        mapInstance = await InitMap(handleIslandNameClick);
        isMapInitialized = true;
      }
    };
    initializeMap();
  }, []);

  //return (HTML)
  return (
    <MapProvider mapInstance={mapInstance}>
    <div className="grid xl:grid-cols-[370px_auto_400px] h-max flex-1 relative overflow-hidden max-w-screen">
      <div id="sectionsSidebar" className="w-full h-full overflow-y-auto scrollbar scrollbar-thumb-palette2-e scrollbar-track-palette1-d bg-palette1-d border-y-2 border-palette1-c border-solid p-2">
        <div className="py-2">
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Map parts</p>
          <ul>
            {map_parts.map((section) => (<CollapsibleSidebarButton key={section.sectionId} expand={expand} setExpand={setExpand} sectionId={section.sectionId} tableName="map_parts" img={section.type} text={section.text} type={section.type} onSelectIsland={(islandData) => setSelectedIsland(islandData)}/>))}
          </ul>
          <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Points of interest</p>
            {points_of_interest.map((section) => (<CollapsibleSidebarButton key={section.sectionId} expand={expand} setExpand={setExpand} sectionId={section.sectionId} tableName="map_parts" img={section.type} text={section.text} type={section.type}/>))}
          <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Treasure value</p>
            {treasure_values.map((section) => (<CollapsibleSidebarButton key={section.sectionId} expand={expand} setExpand={setExpand} sectionId={section.sectionId} tableName="map_parts" img={section.type} text={section.text} type={section.type}/>))}
        </div>
      </div>
      <div id="map" className="h-full bg-palette1-b grow col-start-2 col-end-4 row-span-full"></div>
      <InfoPanel island={selectedIsland}/>
    </div>
    </MapProvider>
  );
}

export default Map;
