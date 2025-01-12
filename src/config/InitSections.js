//npm packages
import { useEffect, useState } from 'react'
//components
import ClickableSidebarButton from '../components/ClickableSidebarButton.js'
//hooks
import useCameraMovement from '../hooks/useCameraMovement.js'
import useInfoPanel from '../hooks/useInfoPanel.js'
//utility
import { eqTypeFetch } from '../utility/DataFetch.js'

function SectionDataFetch({tableName, columnName, type}) {

    //useStates for handling error and data from database
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    //Using custom hooks for handling button click
    const CameraMovement = useCameraMovement();
    const InfoPanel = useInfoPanel();

    useEffect(() => {
        eqTypeFetch(tableName, columnName, type)
            .then(({ data, error }) => {
                if (error) setError(error);
                else setData(data);
            });
    }, [tableName, columnName, type]);

    if (error) return <p>{error}</p>;

    const handleClick = (x, y, zoom, text, area, description, animals) => {
        CameraMovement(x, y, zoom); // Camera Movement function call
        InfoPanel(text, area, description, animals); // Info Panel function call
      };

    //data is being sent to SidebarButton components through mapping
    return(
        <div className="ml-6">
            {data && (
                <>
                {data.map(data => (
                    <ClickableSidebarButton key={data.id} img={data.type} text={data.name} color={data.color} onClick={() => handleClick(data.x, data.y, data.zoom, data.name, data.area, data.description, [data.chickens, data.pigs, data.snakes])}/>
                ))}
                </>
            )}
        </div>
    );
}

export default SectionDataFetch;