import { useEffect } from 'react';
import InitMap from '../components/InitMap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarButton from '../components/SidebarButton'


let isMapInitialized = false;

function Map() {
  
  useEffect(() => {
    
    if (!isMapInitialized) {
      
      InitMap();
      isMapInitialized = true;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-row h-screen flex-1 relative overflow-y-hidden">
        <div className="w-[350px] h-full overflow-y-auto scrollbar scrollbar-thumb-palette2-e scrollbar-track-palette1-d bg-palette1-d border-y-2 border-palette1-c border-solid p-2">
          <ul className="py-2">
            <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Map parts</p>
            <SidebarButton img="region" text="Regions"/>
            <SidebarButton img="island" text="Islands"/>
            <SidebarButton img="fort" text="Forts"/>
            <SidebarButton img="shop" text="Shops"/>
            <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
            <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Points of interest</p>
            <SidebarButton img="character" text="Characters"/>
            <SidebarButton img="beacon" text="Beacons"/>
            <SidebarButton img="throne" text="Thrones"/>
            <SidebarButton img="journal" text="Journals"/>
            <SidebarButton img="volcano" text="Volcanos"/>
            <SidebarButton img="barrel" text="Barrels"/>
            <SidebarButton img="riddlelocation" text="Riddle Locations"/>
            <hr className="h-0.5 border-0 bg-palette1-c mb-5"></hr>
            <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Treasure value</p>
            <SidebarButton img="goldhoarders" text="Gold Hoarders"/>
            <SidebarButton img="orderofsouls" text="Order of Souls"/>
            <SidebarButton img="merchantalliance" text="Merchant Alliance"/>
            <SidebarButton img="reapersbones" text="Reaper's Bones"/>
            <SidebarButton img="athenasfortune" text="Athena's Fortune"/>
            <SidebarButton img="thehunterscall" text="The Hunter's Call"/>
            <SidebarButton img="othertreasures" text="Other Treasures"/>
            <SidebarButton img="valuecalculator" text="Value Calculator"/>
          </ul>
        </div>
        <div id="map" className="h-full bg-palette1-b grow"></div>  
      </div>
      <Footer />
    </div>
  );
}

export default Map;
