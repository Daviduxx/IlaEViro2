import { useState } from "react";

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
            [name]: value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)
    }

    return (


        <form onSubmit={handleSubmit}>

            <h2>Conferma la tua partecipazione</h2>

            {/* Partecipazione */}
            <div>
                <p>Parteciperai?</p>

                <label>
                    <input
                        type="radio"
                        name="partecipo"
                        value="si"
                        checked={formData.partecipo === true}
                        onChange={handleChange}
                        required
                    />
                    Sì
                </label>

                <label>
                    <input
                        type="radio"
                        name="partecipo"
                        value="no"
                        checked={formData.partecipo === false}
                        onChange={handleChange}
                    />
                    No
                </label>
            </div>

            {/* Nomi */}
            <div>
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
            <div>
                <label htmlFor="totale">
                    Numero totale di partecipanti
                </label>
                <input
                    type="number"
                    id="totale"
                    name="totale"
                    value={formData.totale}
                    onChange={handleChange}
                    min="0"
                />
            </div>

            {/* Numero bambini */}
            <div>
                <label htmlFor="bambini">
                    Numero di bambini
                </label>
                <input
                    type="number"
                    id="bambini"
                    name="bambini"
                    value={formData.bambini}
                    onChange={handleChange}
                    min="0"
                />
            </div>

            {/* Intolleranze */}
            <div>
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
            <div>
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



            <button type="submit">
                Invia conferma
            </button>

        </form>
    )
}

export default Rsvp;