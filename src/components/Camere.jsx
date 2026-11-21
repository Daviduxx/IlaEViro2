import { useState } from "react";
import { supabase } from '../utils/supabase.jsx'
import '../styles/Rsvp.scss'
import SuccessModal from "./SuccessModal.jsx";

function Camere() {

    const [formData, setFormData] = useState({
        nome: '',
        numeroPersone: 0,
        lettiAggiuntivi: 0,
        messaggio: ''
    })

    const [inviato, setInviato] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);


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
        } else {
            console.log(formData)
            setInviato(true)

            setFormData({
                nome: '',
                numeroPersone: 0,
                lettiAggiuntivi: 0,
                messaggio: ''
            })
            setShowSuccess(true);
        }
    }

    return (

        <section className="rsvp-section">

            {
                !inviato ? (
                    <form className="rsvp-form" onSubmit={handleSubmit}>

                        <img src="/video-player.png" alt="" />

                        <h2>Compila il form se hai piacere di passarela notte in location</h2>

                        {/* Nome */}
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group">
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

                        <button className="rsvp-submit" type="submit">
                            Invia conferma
                        </button>

                    </form>

                ) : (
                    <div className="success-message" id="feedback">
                        <h2>Grazie!</h2>
                        <p>
                            La tua risposta è stata registrata
                            correttamente.
                        </p>
                        <span>Non vediamo l'ora di festeggiare con te!</span>
                    </div>
                )
            }

            {showSuccess && (
                <SuccessModal
                    onClose={() => setShowSuccess(false)}
                />
            )}
        </section>
    )
}

export default Camere;