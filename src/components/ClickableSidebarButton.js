function ClickableSidebarButton({img, text, color, onClick}) {

  return (
    //returns li (parent is ul) with button in it, button contains img and text from props
    <li className={"transition ease-in-out duration-500 mb-5 rounded-2xl list-none "+color} onClick={onClick}>
      <button className="flex flex-wrap group w-full">
        <div className="relative transition-all ease-in-out duration-500 group-hover:flex-grow flex-grow-0">
          <img src={"svg/"+img+".svg"} alt={img} className="h-14 w-14 p-2"></img>
        </div>
        <p className="text-2xl text-palette1-a my-auto p-2 relative flex-grow-0 font-bokor">{text}</p>
      </button>
    </li>
  );  
}

export default ClickableSidebarButton;