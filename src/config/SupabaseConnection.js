//npm packages
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; //url to database (from .env file)
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY; //public database api key (from .env file)

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;