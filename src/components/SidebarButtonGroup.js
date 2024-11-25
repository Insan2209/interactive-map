import SidebarButton from "./SidebarButton";

function SidebarButtonGroup(props) {

    return (
        props.text.map((text,index)=><SidebarButton img={props.img} text={text.name} color={text.color}/>)  
    );  
}

export default SidebarButtonGroup;