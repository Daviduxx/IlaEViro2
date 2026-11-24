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
    const [errorMessage, setErrorMessage] = useState("")

    const handleError = (err) => {

        switch (err.code) {
            case '23501':
                return 'Attenzione! Controlla di averli inserito correttamente i campi obbligatori!'
            case '22P02':
                return 'Attenzione! Inserisci un numero valido!'
            case '23514':
                return 'Attenzione! I campi "Nomi" non possono superare i 100 caratteri, mentre il messaggio non può superare i 500 caratteri. Il numero di persone ed il numero di letti aggiuntivi non può essere mionore di 0 o maggiore di 10.';
            default:
                return 'Attenzione! Si è verificato un problema. Verifica che i campi siano inseriti correttamente'
        }
    }


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
            setErrorMessage(handleError(error))
            setShowSuccess(false);
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
            setErrorMessage("");
        }
    }

    return (

        <section className="rsvp-section">

            {
                !inviato ? (
                    <form className="rsvp-form" onSubmit={handleSubmit}>

                        <img src="/video-player.png" alt="" />

                        <h2>Hai piacere di passare la notte in location?</h2>

                        <div className="prezzi">
                            <p>Ogni camera ha un prezzo di 65€ (colazione inclusa). <br></br>Ogni letto aggiuntivo ha un prezzo di 15€.</p>
                        </div>

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
                                maxLength={100}
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
                                max="10"
                                required
                            />
                        </div>

                        {/* Numero letti aggiuntivi */}
                        <div className="form-group">
                            <label htmlFor="numeroBambini">
                                Ogni camera ha un letto matrimoniale per due persone. Indica qui se hai bisogno di uno o più letti aggintivi.
                            </label>
                            <input
                                type="number"
                                id="lettiAggiuntivi"
                                name="lettiAggiuntivi"
                                value={formData.lettiAggiuntivi}
                                onChange={handleChange}
                                min="0"
                                max="5"
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
                                maxLength={500}
                            />
                        </div>

                        <button className="rsvp-submit" type="submit">
                            Invia conferma
                        </button>
                        <div className={`form-error ${errorMessage ? 'visible' : ''}`}>
                            {errorMessage}
                        </div>
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