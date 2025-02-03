import { useState } from "react";

// InfoPanel.js
function InfoPanel({ island }) {

  const [isOpen, setIsOpen] = useState(() => {return window.innerWidth >= 1280;});;

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };
   
    if (!island) {
      return (
        <div className={`relative flex w-full h-min overflow-y-auto max-sm:col-start-1 col-start-3 col-end-4 row-span-full z-[2000] transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[calc(100%-28px)]"}`}>
          <button onClick={togglePanel} className="bg-palette1-d text-white font-bold text-3xl rounded-l-lg mt-2 -mr-2 h-16 w-10">
            <img src="/svg/arrow.svg" alt="" className={`h-4 w-4 m-auto  ${isOpen ? "-rotate-90" : "rotate-90"}`}/>
          </button>
          <div id="information_panel" className="w-full h-full bg-transparent row-span-full z-[2000] bg-cover" style={{ backgroundImage: "url('/svg/bg1.svg')" }}>
              <div className="text-2xl my-auto text-palette1-a font-bokor p-5">
                  <p className="text-center text-2xl xl:text-3xl text-wrap">Click any location to display information about it</p>
              </div>         
          </div>
        </div>
      );
    }

    const { name, description, area, chickens, pigs, snakes } = island;

    // area formatting
    const formattedArea = area ? area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : null;
  
    return (
      <div className={`relative flex w-full h-full overflow-y-auto max-sm:col-start-1 col-start-3 col-end-4 row-span-full z-[2000] transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[calc(100%-28px)]"}`}>
        <button onClick={togglePanel} className="bg-palette1-d text-white font-bold text-3xl rounded-l-lg mt-2 -mr-2 h-16 w-10">
          <img src="/svg/arrow.svg" alt="" className={`h-4 w-4 m-auto  ${isOpen ? "-rotate-90" : "rotate-90"}`}/>
        </button>
        <div id="information_panel" className="flex items-center w-full h-full bg-transparent bg-cover" style={{ backgroundImage: "url('/svg/bg1.svg')" }}>
          <div className="text-2xl h-[96%] text-palette1-a font-bokor p-5 overflow-y-auto scrollbar scrollbar-thumb-palette2-e scrollbar-track-palette1-d">
            <p className="text-center text-3xl">{name}</p>
            <div className="my-2">
              <img src="/svg/line2.svg" alt="" className="z-10 relative" />
              <img src={`/img/${name}.png`} alt={name} className="w-auto -my-[1%] z-0"/>
              <img src="/svg/line2.svg" alt="" className="z-10 relative" />
            </div>
            <p className="my-4">{description}</p>
            {formattedArea && (
              <p className="my-3">
                Area: {formattedArea}m<sup>2</sup>
              </p>
            )}
            <div className="my-3">
              <p>
                Chickens:{" "}
                <span className={chickens ? "text-green-600" : "text-red-600"}>
                  {chickens ? "Yes" : "No"}
                </span>
              </p>
              <p>
                Pigs:{" "}
                <span className={pigs ? "text-green-600" : "text-red-600"}>
                  {pigs ? "Yes" : "No"}
                </span>
              </p>
              <p>
                Snakes:{" "}
                <span className={snakes ? "text-green-600" : "text-red-600"}>
                  {snakes ? "Yes" : "No"}
                </span>
              </p>
            </div>
            <div className="my-2" id="points_of_interest">
              <img src="/svg/line2.svg" alt="" className="z-10 relative" />
              <p id="ip_poi" className="text-center text-3xl">
                Points of Interest
              </p>
              <img src="/svg/line2.svg" alt="" className="z-10 relative" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default InfoPanel;
  