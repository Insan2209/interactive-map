//npm packages
import { useEffect, useState, useRef } from 'react';
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
  //Map_parts sections
  const map_parts = [
    { sectionId: 1, text: "Regions", type: "region" },
    { sectionId: 2, text: "Islands", type: "island" },
    { sectionId: 3, text: "Forts", type: "fort" },
    { sectionId: 4, text: "Outposts", type: "outpost" },
    { sectionId: 5, text: "Seaposts", type: "seapost" },
  ];

  //useState used for expanding and collapsing sections (only one at time)
  const [expand, setExpand] = useState(0);

  //code responsible for handling scrollintoView to clicked button/section
  const buttonRefs = useRef([]);
  const setButtonRef = (el, index) => {
    buttonRefs.current[index] = el;
  };  
  const handleScrollToButton = (index) => {
    const targetButton = buttonRefs.current[index];
    if (targetButton) {
      targetButton.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  //checking if map is initialized, if not then initialize and set isMapInitialized to true
  useEffect(() => {
    if (!isMapInitialized) {
      mapInstance = InitMap();
      isMapInitialized = true;
    }
  }, []);

  //return (HTML)
  return (
    <MapProvider mapInstance={mapInstance}>
    <div className="grid grid-cols-[350px_auto_350px] h-max flex-1 relative overflow-y-hidden">
      <div className="w-[350px] h-full overflow-y-auto scrollbar scrollbar-thumb-palette2-e scrollbar-track-palette1-d bg-palette1-d border-y-2 border-palette1-c border-solid p-2">
        <div className="py-2">
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Map parts</p>
          <ul>
            {map_parts.map((section, index) => (<CollapsibleSidebarButton key={section.sectionId} expand={expand} setExpand={setExpand} sectionId={section.sectionId} img={section.type} text={section.text} type={section.type} buttonRef={(el) => setButtonRef(el, index)} handleScrollToButton={() => handleScrollToButton(index)}/>))}
          </ul>
          <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Points of interest</p>
          <CollapsibleSidebarButton img="character" text="Characters" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="beacon" text="Beacons" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="throne" text="Thrones" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="journal" text="Journals" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="volcano" text="Volcanos" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="barrel" text="Barrels" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="riddlelocation" text="Riddle Locations" color="bg-palette2-e hover:bg-palette2-b"/>
          <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Treasure value</p>
          <CollapsibleSidebarButton img="goldhoarders" text="Gold Hoarders" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="orderofsouls" text="Order of Souls" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="merchantalliance" text="Merchant Alliance" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="reapersbones" text="Reaper's Bones" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="athenasfortune" text="Athena's Fortune" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="thehunterscall" text="The Hunter's Call" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="othertreasures" text="Other Treasures" color="bg-palette2-e hover:bg-palette2-b"/>
          <CollapsibleSidebarButton img="valuecalculator" text="Value Calculator" color="bg-palette2-e hover:bg-palette2-b"/>
        </div>
      </div>
      
      <div id="map" className="h-full bg-palette1-b grow col-start-2 col-end-4 row-span-full"></div>
      <div id="information_panel" className="w-[350px] h-full bg-transparent col-start-3 col-end-4 row-span-full z-[1000]">
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
