function SidebarButton(props) {
    return (
        <li className={props.color+" transition ease-in-out duration-500 rounded-2xl mb-5"}>
          <button className="flex flex-wrap group w-full">
            <div className="relative transition-all ease-in-out duration-500 group-hover:flex-grow flex-grow-0">
              <img src={"svg/"+props.img+".svg"} alt={props.img} className="h-14 w-14 p-2"></img>
            </div>
            <p className="text-2xl text-palette1-a my-auto p-2 relative flex-grow-0 font-bokor">{props.text}</p>
          </button>
        </li>
    );  
}

export default SidebarButton;