import { useState } from "react";

function Camere() {

    const [formData, setFormData] = useState({
        camera: true,
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
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)
    }

    return (


        <form onSubmit={handleSubmit}>

            <h2>Compila il form se hai piacere di passarela notte in location</h2>

            {/* Partecipazione */}
            <div>
                <p>Ti serve una camera?</p>

                <label>
                    <input
                        type="radio"
                        name="camera"
                        value="si"
                        checked={formData.camera === true}
                        onChange={handleChange}
                    />
                    Sì
                </label>

                <label>
                    <input
                        type="radio"
                        name="camera"
                        value="no"
                        checked={formData.camera === false}
                        onChange={handleChange}
                    />
                    No
                </label>
            </div>

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