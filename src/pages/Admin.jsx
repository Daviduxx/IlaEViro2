import Navbar from '../components/Navbar';
import './Admin.css';
import { supabase } from '../utils/supabase'
import { useEffect, useState } from 'react';

function Admin() {

    const [ospiti, setOspiti] = useState([])
    const [camere, setCamere] = useState([])

    useEffect(() => {

        const fetchOspiti = async () => {
            const { data, error } = await supabase
                .from('OSPITI')
                .select('*')

            if (error) {
                console.error(error)
                return;
            } else {
                setOspiti(data)
                console.log(data)
            }
        }
        fetchOspiti()

        const fetchCamere = async () => {
            const { data, error } = await supabase
                .from('CAMERE')
                .select('*')

            if (error) {
                console.error(error)
                return;
            } else {
                setCamere(data)
                console.log(data)
            }
        }
        fetchCamere()
    }, [])



    return (
        <>
            <Navbar></Navbar>
            <h1>Gestione prentazioni e camere</h1>

            <h2>LISTA OSPITI</h2>

            {ospiti.map((o) => (
                <p key={o.id}>{o.id}</p>
            )
            )}

            <h2>LISTA CAMERE</h2>
            {camere.map((c) => (
                <p key={c.id}>{c.id}</p>
            )
            )}
        </>
    );
}

export default Admin;
