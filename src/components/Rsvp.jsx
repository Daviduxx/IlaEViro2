import { useState } from "react";
import { supabase } from '../utils/supabase.jsx'
import '../styles/Rsvp.scss'
import SuccessModal from "./SuccessModal.jsx";

function Rsvp() {

    const [formData, setFormData] = useState({
        partecipa: true,
        nomi: '',
        numeroTotale: 0,
        numeroBambini: 0,
        intolleranze: '',
        messaggio: ''
    })

    const [inviato, setInviato] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const handleError = (err) => {

        switch (err.code) {
            case '23501':
                return 'Attenzione! I campi "Partecipa", "Nomi", "Numero totale partecipanti" sono obbligatori. Controlla di averli inseriti correttamente!'
            case '22P02':
                return 'Attenzione! Inserisci un numero valido!'
            case '23514':
                return 'Attenzione! I campi "Nomi" non possono superare i 100 caratteri, mentre il messaggio e il campo per le intolleranze non possono superare i 500 caratteri. Il numero di partecipanti ed il numero bambini non può essere mionore di 0 o maggiore di 10.';
            default:
                return 'Attenzione! Si è verificato un problema. Verifica che i campi siano inseriti correttamente'
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'partecipa' ? value === 'si' : value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('OSPITI')
            .insert({
                partecipa: formData.partecipa,
                nomi: formData.nomi,
                numeroTotale: formData.numeroTotale,
                numeroBambini: formData.numeroBambini,
                intolleranze: formData.intolleranze,
                messaggio: formData.messaggio
            })

        if (error) {
            console.error(error)
            setErrorMessage(handleError(error))
            setShowSuccess(false);
        } else {
            setInviato(true)
            console.log(formData)

            setFormData({
                partecipa: true,
                nomi: '',
                numeroTotale: 0,
                numeroBambini: 0,
                intolleranze: '',
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

                        <img src="/movie-ticket.png" alt="" />

                        <h2>Conferma la tua partecipazione</h2>

                        <p className="rsvp-intro">
                            Il nostro giorno speciale non sarebbe lo stesso senza di voi.
                            Fateci sapere se sarete dei nostri!
                        </p>

                        <div className="rsvp-divider">✦</div>

                        {/* Partecipazione */}
                        <div className="form-group">
                            <p className="form-label">Parteciperai?</p>
                            <div className="attendance-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="partecipa"
                                        value="si"
                                        checked={formData.partecipa === true}
                                        onChange={handleChange}
                                    />
                                    Sì
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name="partecipa"
                                        value="no"
                                        checked={formData.partecipa === false}
                                        onChange={handleChange}
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                        {/* Nomi */}
                        <div className="form-group">
                            <label htmlFor="nome">Nomi</label>
                            <input
                                type="text"
                                id="nomi"
                                name="nomi"
                                value={formData.nomi}
                                onChange={handleChange}
                                placeholder="Inserisci i nomi dei partecipanti"

                            />
                        </div>

                        {/* Numero totale */}
                        <div className="form-group">
                            <label htmlFor="numeroTotale">
                                Numero totale di partecipanti
                            </label>
                            <input
                                type="number"
                                id="numeroTotale"
                                name="numeroTotale"
                                value={formData.numeroTotale}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>

                        {/* Numero bambini */}
                        <div className="form-group">
                            <label htmlFor="numeroBambini">
                                Numero di bambini
                            </label>
                            <input
                                type="number"
                                id="numeroBambini"
                                name="numeroBambini"
                                value={formData.numeroBambini}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>

                        {/* Intolleranze */}
                        <div className="form-group">
                            <label htmlFor="intolleranze">
                                Per favore, segnala qui eventuali intolleranze, allergie o altre esigenze alimentari
                            </label>
                            <textarea
                                id="intolleranze"
                                name="intolleranze"
                                value={formData.intolleranze}
                                onChange={handleChange}
                                placeholder="Scrivi qui eventuali intolleranze, allergie o altre esigenze alimentari..."
                                rows="4"
                            />
                        </div>

                        {/* Messaggio */}
                        <div className="form-group">
                            <label htmlFor="messaggio">
                                Desideri lasciarci un messaggio? Scrivi qui!
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
                            ✦ Invia conferma ✦
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

export default Rsvp;