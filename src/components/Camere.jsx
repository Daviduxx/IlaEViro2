import { useState } from "react";
import { supabase } from '../utils/supabase.jsx'

function Camere() {

    const [formData, setFormData] = useState({
        nome: '',
        numeroPersone: 0,
        lettiAggiuntivi: 0,
        messaggio: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'camera' ? value === 'si' : value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('CAMERE')
            .insert({
                nome: formData.nome,
                numero_persone: formData.numeroPersone,
                letti_aggiuntivi: formData.lettiAggiuntivi,
                messaggio: formData.messaggio
            })

        if (error) {
            console.error(error)
        }
        console.log(formData)
    }

    return (


        <form onSubmit={handleSubmit}>

            <h2>Compila il form se hai piacere di passarela notte in location</h2>

            {/* Nome */}
            <div>
                <label htmlFor="nome">Nome per la prenotazione</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Es. Mario Rossi"
                    required
                />
            </div>

            {/* Numero persone */}
            <div>
                <label htmlFor="numeroPersone">
                    In quante persone siete?
                </label>
                <input
                    type="number"
                    id="numeroPersone"
                    name="numeroPersone"
                    value={formData.numeroPersone}
                    onChange={handleChange}
                    min="0"
                />
            </div>

            {/* Numero letti aggiuntivi */}
            <div>
                <label htmlFor="numeroBambini">
                    Ogni camera è ha un letto matrimoniale per due persone. Indica qui se hai bisogno di uno o più letti aggintivi in camera
                </label>
                <input
                    type="number"
                    id="lettiAggiuntivi"
                    name="lettiAggiuntivi"
                    value={formData.lettiAggiuntivi}
                    onChange={handleChange}
                    min="0"
                />
            </div>

            {/* Messaggio */}
            <div>
                <label htmlFor="messaggio">
                    Desideri lasciarci un messaggio? Hai richieste o esigenze particolari? Scrivi qui!
                </label>
                <textarea
                    id="messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    placeholder="Scrivi qui eventuali comunicazioni..."
                    rows="4"
                />
            </div>



            <button type="submit">
                Invia conferma
            </button>

        </form>
    )
}

export default Camere;