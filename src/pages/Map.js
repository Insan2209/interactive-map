//npm packages
import { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
//config files
import InitMap from '../config/InitMap';
import DataFetch from '../config/DataFetch';
//components
import SidebarButton from '../components/SidebarButton'

//variable responsible for map initialization
let isMapInitialized = false;

function Map() {

  const [expand, isExpanded] = useState(0);  

  //checking if map is initialized, if not then initialize and set isMapInitialized to true
  useEffect(() => {
    if (!isMapInitialized) {
      InitMap();
      isMapInitialized = true;
    }
  }, []);

  return (
    <div className="flex flex-row h-screen flex-1 relative overflow-y-hidden">
      <div className="w-[350px] h-full overflow-y-auto scrollbar scrollbar-thumb-palette2-e scrollbar-track-palette1-d bg-palette1-d border-y-2 border-palette1-c border-solid p-2">
        <ul className="py-2">
          <p className="font-semibold text-3xl pb-5 my-auto text-palette1-a font-lacquer">Map parts</p>
          <Collapsible trigger={<SidebarButton img="region" text="Regions" color="bg-palette2-e hover:bg-palette2-b"/>} transitionTime="500" easing="ease-in-out" open={expand===1} onOpening={() => isExpanded(1)}>
            <DataFetch tableName="map_parts" columnName="id,type,name,color" type="region"/>
          </Collapsible>
          <Collapsible trigger={<SidebarButton img="island" text="Islands" color="bg-palette2-e hover:bg-palette2-b"/>} transitionTime="500" easing="ease-in-out" open={expand===2} onOpening={() => isExpanded(2)}>
            <DataFetch tableName="map_parts" columnName="id,type,name,color" type="island"/>
          </Collapsible>
          <Collapsible trigger={<SidebarButton img="fort" text="Forts" color="bg-palette2-e hover:bg-palette2-b"/>} transitionTime="500" easing="ease-in-out" open={expand===3} onOpening={() => isExpanded(3)}>
            <DataFetch tableName="map_parts" columnName="id,type,name,color" type="fort"/>
          </Collapsible>
          <Collapsible trigger={<SidebarButton img="outpost" text="Outposts" color="bg-palette2-e hover:bg-palette2-b"/>} transitionTime="500" easing="ease-in-out" open={expand===4} onOpening={() => isExpanded(4)}>
            <DataFetch tableName="map_parts" columnName="id,type,name,color" type="outpost"/>
          </Collapsible>
          <Collapsible trigger={<SidebarButton img="seapost" text="Seaposts" color="bg-palette2-e hover:bg-palette2-b"/>} transitionTime="500" easing="ease-in-out" open={expand===5} onOpening={() => isExpanded(5)}>
            <DataFetch tableName="map_parts" columnName="id,type,name,color" type="seapost"/>
          </Collapsible>
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
        </ul>
      </div>
      <div id="map" className="h-full bg-palette1-b grow"></div>  
    </div>
  );
}

export default Map;
