import { supabase } from './supabase';
import { Resource } from '../types/resource';

export async function getResources(): Promise<Resource[]>{
    const {data, error} = await supabase.from('resources').select('*')

    if(error){
        console.log('Error fetching resources', error)
        return[]
    }

    return data || []
}