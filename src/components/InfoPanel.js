// InfoPanel.js
function InfoPanel({ island }) {
    if (!island) {
      return (
        <div id="information_panel" className="w-[350px] h-fit bg-transparent col-start-3 col-end-4 row-span-full z-[1000]">
            <div className="text-2xl my-auto text-palette1-a font-bokor p-5 bg-cover" style={{ backgroundImage: "url('/svg/bg1.svg')" }}>
                <p className="text-center text-3xl">Click any location to display information</p>
            </div>         
        </div>
      );
    }
  
    const { name, description, area, chickens, pigs, snakes } = island;
  
    // Formatowanie area, np. 12.345 -> "12.345"
    const formattedArea = area
      ? area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : null;
  
    return (
      <div id="information_panel" className="w-[350px] h-fit bg-transparent col-start-3 col-end-4 row-span-full z-[1000]">
        <div className="text-2xl my-auto text-palette1-a font-bokor p-5 bg-cover" style={{ backgroundImage: "url('/svg/bg1.svg')" }}>
          <p className="text-center text-3xl">{name}</p>
          <div className="my-2">
            <img src="/svg/line2.svg" alt="" className="z-10 relative" />
            <img src={`/img/${name}.png`} alt={name} className="max-h-48 w-auto -my-1 z-0"/>
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
  
          <div className="my-2 hidden" id="points_of_interest">
            <img src="/svg/line2.svg" alt="" className="z-10 relative" />
            <p id="ip_poi" className="text-center text-3xl">
              Points of Interest
            </p>
            <img src="/svg/line2.svg" alt="" className="z-10 relative" />
          </div>
        </div>
      </div>
    );
  }
  
  export default InfoPanel;
  