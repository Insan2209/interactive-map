import supabaseClient from '../config/SupabaseConnection.js'
import { useEffect, useState } from 'react'
import SidebarButtonGroup from '../components/SidebarButtonGroup.js'

function DataFetch(props) {

    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState(null)

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
        <>
        {fetchError && (<p>{fetchError}</p>)}
        {data && (
            <>
            {data.map(data => (
                <SidebarButtonGroup key={data.id} data={data}/>
            ))}
            </>
        )}
        </>
    );
}

export default DataFetch;