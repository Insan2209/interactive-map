import { createContext, useContext } from "react";

const MapContext = createContext(null);

export const MapProvider = ({children, mapInstance}) => {
    return (
        <MapContext.Provider value={mapInstance}>
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => useContext(MapContext);