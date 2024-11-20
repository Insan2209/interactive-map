import { useEffect } from 'react';
import InitMap from './InitMap';
import Header from './Header';
import Footer from './Footer';

let isMapInitialized = false;

function Map() {
  
  useEffect(() => {
    
    if (!isMapInitialized) {
      
      InitMap();
      isMapInitialized = true;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-row overflow-y-hidden flex-1 relative">
        <div className="w-80 h-full bg-palette1-d shrink border-y-2 border-palette1-c border-solid p-2">
          <ul className="py-2">

          <li className="transition ease-in-out duration-500 bg-palette2-e hover:bg-palette2-b rounded-2xl mb-5">
              <button className="flex flex-wrap group w-full">
              <div className="relative transition-all ease-in-out duration-500 group-hover:flex-grow flex-grow-0">
                <img src='/svg/region.svg' alt="arrow" className="h-14 w-14 p-2"></img>
              </div>
              <p className="text-2xl text-palette1-a my-auto p-2 relative flex-grow-0">Regions</p>
              </button>
            </li>

            <li className="transition ease-in-out duration-500 bg-palette2-e hover:bg-palette2-b rounded-2xl mb-5">
              <button className="flex flex-wrap group w-full">
              <div className="relative transition-all ease-in-out duration-500 group-hover:flex-grow flex-grow-0">
                <img src='/svg/island.svg' alt="arrow" className="h-14 w-14 p-2"></img>
              </div>
              <p className="text-2xl text-palette1-a my-auto p-2 relative flex-grow-0">Islands</p>
              </button>
            </li>

            <li className="transition ease-in-out duration-500 bg-palette2-e hover:bg-palette2-b rounded-2xl mb-5">
              <button className="flex flex-wrap group w-full">
              <div className="relative transition-all ease-in-out duration-500 group-hover:flex-grow flex-grow-0">
                <img src='/svg/fort.svg' alt="arrow" className="h-14 w-14 p-2"></img>
              </div>
              <p className="text-2xl text-palette1-a my-auto p-2 relative flex-grow-0">Forts</p>
              </button>
            </li>

            <li className="transition ease-in-out duration-500 bg-palette2-e hover:bg-palette2-b rounded-2xl mb-5">
              <button className="flex flex-wrap group w-full">
              <div className="relative transition-all ease-in-out duration-500 group-hover:flex-grow flex-grow-0">
                <img src='/svg/shop2.svg' alt="arrow" className="h-14 w-14 p-2"></img>
              </div>
              <p className="text-2xl text-palette1-a my-auto p-2 relative flex-grow-0">Shops</p>
              </button>
            </li>

            <li className="transition ease-in-out duration-500 bg-palette2-e hover:bg-palette2-b rounded-2xl mb-5">
              <button className="flex flex-wrap group w-full">
              <div className="relative transition-all ease-in-out duration-500 group-hover:flex-grow flex-grow-0">
                <img src='/svg/character2.svg' alt="arrow" className="h-14 w-14 p-2"></img>
              </div>
              <p className="text-2xl text-palette1-a my-auto p-2 relative flex-grow-0">Characters</p>
              </button>
            </li>

          </ul>
        </div>
        <div id="map" className="h-full bg-palette1-b grow"></div>  
      </div>
      <Footer />
    </div>
  );
}

export default Map;
