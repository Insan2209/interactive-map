//npm packages
import { useEffect, useState } from 'react'
//config files
import supabaseClient from '../config/SupabaseConnection.js'
//components
import SidebarButton from '../components/SidebarButton.js'


function DataFetch(props) {

    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState(null)
    const [expand, isExpanded] = useState(0);

    useEffect(() => {
        const fetchData = async () => {  
            const { data, error } = await supabaseClient
            .from(props.tableName)
            .select(props.columnName)
            .eq('type', props.type)
            
            if(error)
            {
                setFetchError('Could not fetch the data')
                setData(null)
                console.log(error);
            }
            if(data)
            {
                setData(data)
                setFetchError(null)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
            <div className="ml-6">
            {fetchError && (<p>{fetchError}</p>)}
            {data && (
                <>
                {data.map(data => (
                    <SidebarButton key={data.id} img={data.type} text={data.name} color={data.color}/>
                ))}
                </>
            )}
            </div>
    );
}

export default DataFetch;