import { createContext, useState } from "react"
import { supabase } from '../utils/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

    const [isAdmin, setIsAdmin] = useState(false);

    const checkAdmin = async (userId) => {

        const { data, error } = await supabase
            .from('ADMINS')
            .select('user_id')
            .eq("user_id", userId)
            .maybeSingle();

        if (error) {
            console.error('Attenzione, si é verificato un errore', error);
            setIsAdmin(false);
            // aggiungere una visualizzazione lato frontend dell'errore
            return;
        }

        setIsAdmin(!!data)
    }
}