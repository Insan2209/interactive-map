//npm packages
import { useEffect, useState } from 'react'
//config files
import supabaseClient from '../config/SupabaseConnection.js'
//components
import SidebarButton from '../components/SidebarButton.js'

function DataFetch(props) {

    //useStates for handling error and data from database
    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState(null)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //data is being sent to SidebarButton components through mapping
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