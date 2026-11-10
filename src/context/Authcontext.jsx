import { createContext, useState, useEffect } from "react"
import { supabase } from '../utils/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

    const [isAdmin, setIsAdmin] = useState(false);
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {

        const initAuth = async () => {

            const { data, error } = await supabase.auth.getSession()

            if (error) {
                console.error('Attenzione, si é verificato un errore', error);
                // aggiungere una visualizzazione lato frontend dell'errore
                return;
            }

            const currentSession = data.session
            setSession(currentSession);
            setUser(currentSession.user)

            if (currentSession.user) {
                await checkAdmin(currentSession.user.id)
            }

            setLoading(false)

        }

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session.user)

            if (!session) {
                setSession(false)
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const logout = async () => {
        await supabase.auth.signOut()

        setSession(null);
        setIsAdmin(false);
        setUser(null)
    }
}