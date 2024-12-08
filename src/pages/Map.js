//npm packages
import { useEffect, useState, useRef } from 'react';
//config files
import InitMap from '../config/InitMap';
//components
import SidebarButton from '../components/SidebarButton'
import CollapsibleSection from '../components/CollapsibleSection';

//variable responsible for map initialization
let isMapInitialized = false;

function Map() {
  //Map_parts Sections
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
      InitMap();
      isMapInitialized = true;
    }
  }, []);

  //return (HTML)
  return (
    <div className="flex flex-row h-max flex-1 relative overflow-y-hidden">
      <div className="w-[350px] h-full overflow-y-auto scrollbar scrollbar-thumb-palette2-e scrollbar-track-palette1-d bg-palette1-d border-y-2 border-palette1-c border-solid p-2">
        <div className="py-2">
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Map parts</p>
          <ul>
            {map_parts.map((section, index) => (<CollapsibleSection key={section.sectionId} expand={expand} setExpand={setExpand} sectionId={section.sectionId} img={section.type} text={section.text} type={section.type} buttonRef={(el) => setButtonRef(el, index)} handleScrollToButton={() => handleScrollToButton(index)}/>))}
          </ul>
          <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Points of interest</p>
          <SidebarButton img="character" text="Characters" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="beacon" text="Beacons" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="throne" text="Thrones" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="journal" text="Journals" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="volcano" text="Volcanos" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="barrel" text="Barrels" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="riddlelocation" text="Riddle Locations" color="bg-palette2-e hover:bg-palette2-b"/>
          <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Treasure value</p>
          <SidebarButton img="goldhoarders" text="Gold Hoarders" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="orderofsouls" text="Order of Souls" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="merchantalliance" text="Merchant Alliance" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="reapersbones" text="Reaper's Bones" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="athenasfortune" text="Athena's Fortune" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="thehunterscall" text="The Hunter's Call" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="othertreasures" text="Other Treasures" color="bg-palette2-e hover:bg-palette2-b"/>
          <SidebarButton img="valuecalculator" text="Value Calculator" color="bg-palette2-e hover:bg-palette2-b"/>
        </div>
      </div>
      <div id="map" className="h-full bg-palette1-b grow origin-bottom-left"></div>  
    </div>
  );
}

export default Map;
