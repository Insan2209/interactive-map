//npm packages
import { useEffect, useState } from 'react'
//config
import supabaseClient from '../config/SupabaseConnection.js'
//components
import ClickableSidebarButton from '../components/ClickableSidebarButton.js'
//hooks
import useCameraMovement from '../hooks/useCameraMovement.js'
import useInfoPanel from '../hooks/useInfoPanel.js'

function DataFetch(props) {

    //useStates for handling error and data from database
    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState(null)

    //Using custom hooks for handling button click
    const CameraMovement = useCameraMovement();
    const InfoPanel = useInfoPanel();

    useEffect(() => {
        const fetchData = async () => {  
            //sql query to database
            const { data, error } = await supabaseClient
            .from(props.tableName)
            .select(props.columnName)
            .eq('type', props.type)
            .order('id', {ascending: true})
            //if error then send message to console, if not then put data into data variable
            if(error) {
                setFetchError('Could not fetch the data')
                setData(null)
                console.log(error);
            }
            if(data) {
                setData(data)
                setFetchError(null)
            }
        }
        fetchData()
    }, [props.tableName, props.columnName, props.type])

    const handleClick = (x, y, zoom, text, type, area) => {
        CameraMovement(x, y, zoom); // Camera Movement function call
        InfoPanel(text, type, area); // Info Panel function call
      };

    //data is being sent to SidebarButton components through mapping
    return(
        <div className="ml-6">
            {fetchError && (<p>{fetchError}</p>)}
            {data && (
                <>
                {data.map(data => (
                    <ClickableSidebarButton key={data.id} img={data.type} text={data.name} color={data.color} onClick={() => handleClick(data.x, data.y, data.zoom, data.name, data.type, data.area)}/>
                ))}
                </>
            )}
        </div>
    );
}

export default DataFetch;