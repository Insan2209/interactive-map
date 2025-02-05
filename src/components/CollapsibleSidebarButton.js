//npm packages
import React from "react";
import Collapsible from "react-collapsible";
//components
import InitSections from "../config/InitSections";

//function with all variables
function CollapsibleSidebarButton({expand, setExpand, sectionId, tableName, text, type, onSelectIsland}) {
  return (
    //Collapsible component from 'react-collapsible'
    <Collapsible 
      trigger={
        <ul className={`${expand === sectionId ? "sticky -top-2 z-10 pb-px" : ""}`}>
          <li className={"transition ease-in-out duration-500 mb-5 rounded-2xl list-none bg-palette2-e hover:bg-palette2-b"}>
            <button className="flex flex-wrap group w-full">
              <div className="relative transition-all ease-in-out duration-500 group-hover:flex-grow flex-grow-0">
                <img src={"svg/"+type+".svg"} alt={type} className="h-14 w-14 p-2"></img>
              </div>
              <p className="text-2xl text-palette1-a my-auto p-2 relative flex-grow-0 font-bokor">{text}</p>
            </button>
          </li>
        </ul>
      } //trigger points to another component, in this case sidebar button surrounded with div that handles section button being sticky when open
      transitionTime="500"
      easing="ease-in-out"
      open={expand === sectionId} //open if expand is equal to sectionId
      onOpening={() => setExpand(sectionId)} //while opening sets expand to sectionId of clicked element
    >
      <InitSections tableName={tableName} columnName="" type={type} onSelectIsland={onSelectIsland}/> {/*DataFetch component that pulls data from database*/}
    </Collapsible>
  );
}

export default CollapsibleSidebarButton;