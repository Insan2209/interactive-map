//npm packages
import { useEffect, useState } from 'react'
//components
import ClickableSidebarButton from '../components/ClickableSidebarButton.js'
//hooks
import useCameraMovement from '../hooks/useCameraMovement.js'
//utility
import { eqTypeFetch } from '../utility/DataFetch.js'

function InitSections({tableName, columnName, type, onSelectIsland}) {

    //useStates for handling error and data from database
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    //Using custom hooks for handling button click
    const CameraMovement = useCameraMovement();

    useEffect(() => {
        eqTypeFetch(tableName, columnName, type)
            .then(({ data, error }) => {
                if (error) setError(error);
                else setData(data);
            });
    }, [tableName, columnName, type]);

    if (error) return <p>{error}</p>;

    const handleClick = (x, y, zoom, name, area, description, chickens, pigs, snakes) => {
        CameraMovement(x, y, zoom); // Camera Movement function call
        onSelectIsland({name, area, description, chickens, pigs, snakes}) // parent callback
      };

    //data is being sent to SidebarButton components through mapping
    return(
        <div className="ml-6">
            {data && (
                <>
                {data.map(data => (
                    <ClickableSidebarButton key={data.id} img={data.type} text={data.name} color={data.color} onClick={() => handleClick(data.x, data.y, data.zoom, data.name, data.area, data.description, data.chickens, data.pigs, data.snakes)}/>
                ))}
                </>
            )}
        </div>
    );
}

export default InitSections;