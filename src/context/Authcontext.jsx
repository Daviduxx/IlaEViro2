import { createContext, useState, useEffect, useContext } from "react"
import { supabase } from '../utils/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


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
        setUser(null)
    }

    const value = {
        session,
        user,
        loading,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    return useContext(AuthContext);
}