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
            [name]: name === 'partecipa' ? value === 'si' : value
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
            <div>
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