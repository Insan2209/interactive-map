//npm packages
import React from "react";
import Collapsible from "react-collapsible";
//components
import SidebarButton from "./SidebarButton";
import DataFetch from "../config/DataFetch";

//function with all variables
function CollapsibleSection({expand, setExpand, sectionId, text, type, buttonRef,handleScrollToButton,}) {
  return (
    //Collapsible component from 'react-collapsible'
    <Collapsible 
      trigger={<div ref={buttonRef} className={`${expand === sectionId ? "sticky -top-2 z-10 pb-px" : ""}`}><SidebarButton img={type} text={text} color="bg-palette2-e hover:bg-palette2-b" /></div>} //trigger is another react component, in this case SidebarButton surrounded with div that handles section button being sticky when open, ref={buttonRef} assigns reference to DOM element
      transitionTime="500"
      easing="ease-in-out"
      open={expand === sectionId} //open if expand is equal to sectionId
      onOpening={() => setExpand(sectionId)} //while opening sets expand to sectionId of clicked element
      onClose={() => handleScrollToButton()} // after closing section it refocuses view to clicked button using handleScrollToButton function
    >
      <DataFetch tableName="map_parts" columnName="id,type,name,color" type={type} /> {/*DataFetch component that pulls data from database*/}
    </Collapsible>
  );
}

export default CollapsibleSection;
