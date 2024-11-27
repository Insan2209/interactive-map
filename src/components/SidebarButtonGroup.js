import SidebarButton from "./SidebarButton";

const SidebarButtonGroup = ({data}) =>
{
    return(
        <SidebarButton img={data.type} text={data.name} color={data.color}/>
    )
}

export default SidebarButtonGroup;