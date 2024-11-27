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
  /*const islandNames = [{name: "Ashen Reaches", color: colors[4]}, {name: "Barnacle Cay", color: colors[3]}, {name: "Black Sand Atoll", color: colors[2]}, {name: "Black Water Enclave", color: colors[2]}, {name: "Blind Man's Lagoon", color: colors[2]}, {name: "Booty Isle", color: colors[3]}, {name: "Boulder Cay", color: colors[1]}, {name: "Brimstone Rock", color: colors[4]}, {name: "Cannon Cove", color: colors[1]}, {name: "Castaway Isle", color: colors[3]}, {name: "Chicken Isle", color: colors[3]}, {name: "Cinder Islet", color: colors[4]}, {name: "Crescent Isle", color: colors[1]}, {name: "Crook's Hollow", color: colors[3]}, {name: "Cursewater Shores", color: colors[4]}, {name: "Cutlass Cay", color: colors[3]}, {name: "Devil's Ridge", color: colors[3]}, {name: "Discovery Ridge", color: colors[3]}, {name: "Flame's End", color: colors[4]}, {name: "Fletcher's Rest", color: colors[4]}, {name: "Flinstock Peninsula", color: colors[4]}, {name: "Fools Lagoon", color: colors[3]}, {name: "Glowstone Cay", color: colors[4]}, {name: "Isle of Last Words", color: colors[2]}, {name: "Kraken's Fall", color: colors[2]}, {name: "Lagoon of Whispers", color: colors[1]}, {name: "Liar's Backbone", color: colors[2]}, {name: "Lone Cove", color: colors[1]}, {name: "Lonely Isle", color: colors[1]}, {name: "Lookout Point", color: colors[3]}, {name: "Magma's Tide", color: colors[4]}, {name: "Marauder's Arch", color: colors[2]}, {name: "Mermaid's Hideaway", color: colors[1]}, {name: "Mutineer Rock", color: colors[3]}, {name: "Old Faithful Isle", color: colors[2]}, {name: "Old Salts Atoll", color: colors[3]}, {name: "Paradise Spring", color: colors[3]}, {name: "Picaroon Palms", color: colors[1]}, {name: "Plunder Valley", color: colors[3]}, {name: "Plunder's Plight", color: colors[2]}, {name: "Rapier Cay", color: colors[1]}, {name: "Roaring Sands", color: colors[4]}, {name: "Ruby's Fall", color: colors[4]}, {name: "Rum Runner Isle", color: colors[1]}, {name: "Sailor's Bounty", color: colors[1]}, {name: "Salty Sands", color: colors[1]}, {name: "Sandy Shallows", color: colors[1]}, {name: "Scorched Pass", color: colors[4]}, {name: "Scurvy Isley", color: colors[2]}, {name: "Sea Dog's Rest", color: colors[1]}, {name: "Shark Bait Cove", color: colors[3]}, {name: "Shark Tooth Key", color: colors[2]}, {name: "Shipwreck Bay", color: colors[2]}, {name: "Shiver Retreat", color: colors[2]}, {name: "Smuggler's Bay", color: colors[1]}, {name: "Snake Island", color: colors[3]}, {name: "The Crooked Masts", color: colors[2]}, {name: "The Devil's Thirst", color: colors[4]}, {name: "The Forsaken Brink", color: colors[4]}, {name: "The Sunken Grove", color: colors[2]}, {name: "Thieves' Haven", color: colors[3]}, {name: "Tri-Rock Isle", color: colors[2]}, {name: "Twin Groves", color: colors[1]}, {name: "Uncharted Island (K9)", color: colors[5]}, {name: "Uncharted Island (N13)", color: colors[5]}, {name: "Wanderer's Refuge", color: colors[1]}, ];
  const fortNames = [{name: "Fort of The Damned", color: colors[3]}, {name: "Hidden Spring Keep", color: colors[1]}, {name: "Keen Haul Fort", color: colors[1]}, {name: "Kraken's Watchtower", color: colors[2]}, {name: "Lost Gold Fort", color: colors[3]}, {name: "Molted Sands Fortress", color: colors[4]}, {name: "Sailor's Knot Stronghold", color: colors[1]}, {name: "Shark Fin Camp", color: colors[2]}, {name: "Skull Keep", color: colors[2]}, {name: "The Crow's Nest Fortress", color: colors[3]}];
  const outpostNames = [{name: "Ancient Spire Outpost", color: colors[3]}, {name: "Dagger Tooth Outpost", color: colors[2]}, {name: "Galleon's Grave Outpost", color: colors[2]}, {name: "Golden Sand Outpost", color: colors[1]}, {name: "Marrow's Peak Outpost", color: colors[4]}, {name: "Plunder Outpost", color: colors[3]}, {name: "Reaper's Hideout", color: colors[5]}, {name: "Sanctuary Outpost", color: colors[1]}, ];
  const seapostNames = [{name: "Brian's Bazaar", color: colors[4]}, {name: "Roaring Traders", color: colors[4]}, {name: "Stephen's Spoils", color: colors[3]}, {name: "The Finest Trading Post", color: colors[3]}, {name: "The North Star Seapost", color: colors[1]}, {name: "The Spoils of Plenty Store", color: colors[1]}, {name: "Three Paces East Seapost", color: colors[2]}, {name: "The Wild Treasure Store", color: colors[2]}, ];
  */

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
            <div className="ml-6">
              <DataFetch tableName="map_parts" columnName="type,name,color" type="region"/>
            </div>
          </Collapsible>
          <Collapsible trigger={<SidebarButton img="island" text="Islands" color="bg-palette2-e hover:bg-palette2-b"/>} transitionTime="500" easing="ease-in-out" open={expand===2} onOpening={() => isExpanded(2)}>
            <div className="ml-6">
            <DataFetch tableName="map_parts" columnName="type,name,color,area" type="island"/>
            </div>
          </Collapsible>
          <Collapsible trigger={<SidebarButton img="fort" text="Forts" color="bg-palette2-e hover:bg-palette2-b"/>} transitionTime="500" easing="ease-in-out" open={expand===3} onOpening={() => isExpanded(3)}>
            <div className="ml-6">   
              
            </div>
          </Collapsible>
          <Collapsible trigger={<SidebarButton img="outpost" text="Outposts" color="bg-palette2-e hover:bg-palette2-b"/>} transitionTime="500" easing="ease-in-out" open={expand===4} onOpening={() => isExpanded(4)}>
            <div className="ml-6">
              
            </div>
          </Collapsible>
          <Collapsible trigger={<SidebarButton img="seapost" text="Seaposts" color="bg-palette2-e hover:bg-palette2-b"/>} transitionTime="500" easing="ease-in-out" open={expand===5} onOpening={() => isExpanded(5)}>
            <div className="ml-6">
              
            </div>
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
