import { useState } from "react";
import { supabase } from '../utils/supabase.jsx'
import '../styles/Rsvp.scss'

function Rsvp() {

    const [formData, setFormData] = useState({
        partecipa: true,
        nomi: '',
        numeroTotale: 0,
        numeroBambini: 0,
        intolleranze: '',
        messaggio: ''
    })

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
                numeroTotale: 0,
                numeroBambini: 0,
                intolleranze: '',
                messaggio: ''
            })

        if (error) {
            console.error(error)
        }

        console.log(formData)
    }

    return (

        <section className="rsvp-section" id="rsvp">
            <form className="rsvp-form" onSubmit={handleSubmit}>

                <img src="/movie-ticket.png" alt="" srcset="" />

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
                        required
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

            </form>
        </section>
    )
}

export default Rsvp;