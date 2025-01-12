import supabaseClient from '../config/SupabaseConnection.js';

export const eqTypeFetch = async (tableName, columnName, type) => {
    try {
        const { data, error } = await supabaseClient
            .from(tableName)
            .select(columnName)
            .eq('type', type)
            .order('id', { ascending: true });

        if (error) {
            console.log('Error fetching data:', error);
            return { data: null, error: 'Could not fetch the data' };
        }

        return { data, error: null };
    } catch (err) {
        console.log('Unexpected error:', err);
        return { data: null, error: 'Unexpected error occurred' };
    }
};

export const inTypeFetch = async (tableName, columnName, type) => {
    try {
        const { data, error } = await supabaseClient
            .from(tableName)
            .select(columnName)
            .in('type', type)
            .order('id', { ascending: true });

        if (error) {
            console.log('Error fetching data:', error);
            return { data: null, error: 'Could not fetch the data' };
        }

        return { data, error: null };
    } catch (err) {
        console.log('Unexpected error:', err);
        return { data: null, error: 'Unexpected error occurred' };
    }
};