import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import '../styles/OspitiAdmin.scss'

function Ospiti() {

    const [ospiti, setOspiti] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [ospiteInModifica, setOspiteInModifica] = useState(null);
    const [formData, setFormData] = useState({});

    const [ospiteSelezionato, setOspiteSelezionato] = useState(null);

    // LETTURA OSPITI
    const getOspiti = async () => {

        setLoading(true);
        setErrorMessage("");

        try {

            const { data, error } = await supabase
                .from("OSPITI")
                .select("*")
                .order("created_at", { ascending: true });

            if (error) throw error;
            console.log(data)
            setOspiti(data);

        } catch (error) {

            console.error(error);
            setErrorMessage("Impossibile recuperare gli ospiti.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOspiti();
    }, []);


    // APERTURA MODIFICA
    const handleEdit = (ospite) => {

        setOspiteInModifica(ospite.id);
        setFormData({ ...ospite });
    };


    // GESTIONE CAMPI
    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : type === "number"
                    ? (value === "" ? "" : Number(value))
                    : value
        }));
    };


    // SALVATAGGIO MODIFICHE
    const handleSave = async () => {

        try {

            console.log(formData)
            const { data, error } = await supabase
                .from("OSPITI")
                .update(formData)
                .eq("id", ospiteInModifica)
                .select()
                .single();

            if (error) throw error;

            setOspiti(prev =>
                prev.map(ospite =>
                    ospite.id === ospiteInModifica
                        ? data
                        : ospite
                )
            );

            setOspiteInModifica(null);
            setFormData({});
            setErrorMessage('')

        } catch (error) {

            console.error(error);
            setErrorMessage("Errore durante il salvataggio delle modifiche.");

        }
    };


    // ANNULLAMENTO MODIFICA
    const handleCancel = () => {
        setOspiteInModifica(null);
        setFormData({});
    };


    // ELIMINAZIONE
    const handleDelete = async (id) => {

        const conferma = window.confirm(
            "Sei sicuro di voler eliminare questa partecipazione?"
        );

        if (!conferma) return;

        try {

            const { error } = await supabase
                .from("OSPITI")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setOspiti(prev =>
                prev.filter(ospite => ospite.id !== id)
            );
            setErrorMessage('')

        } catch (error) {

            console.error(error);
            setErrorMessage("Errore durante l'eliminazione.");

        }
    };


    // RENDERING
    if (loading) {
        return <p>Caricamento ospiti...</p>;
    }

    return (

        <section className="dashboard-ospiti">

            <h2>Lista Partecipanti</h2>
            <div className="count">

                <p>Registrazioni totali: {ospiti.length}</p>
                <p>Numero partecipanti: {ospiti
                    .filter((o) => o.partecipa === true)
                    .reduce((s, o) => s + o.numeroTotale, 0)}</p>

                <p>Numero bambini: {ospiti
                    .filter((o) => o.partecipa === true)
                    .reduce((s, o) => s + o.numeroBambini, 0)}</p>
                <p>Sono state segnalate {ospiti
                    .filter((o) => o.intolleranze != '')
                    .length
                } intolleranze o allergie</p>

            </div>

            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}

            {ospiti.length === 0 ? (

                <p>Nessuna partecipazione registrata.</p>

            ) : (

                <div className="tabella-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Apri</th>
                                <th>Partecipa</th>
                                <th>Nomi</th>
                                <th>Numero totale</th>
                                <th>Numero Bambini</th>
                                <th>Intolleranze</th>
                                <th>Messaggio</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>

                        <tbody>

                            {ospiti.map(ospite => (

                                <tr key={ospite.id}>
                                    <td className="eye">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => setOspiteSelezionato(ospite)}>
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                        </svg>
                                    </td>

                                    {Object.entries(ospite)
                                        .filter(([key]) =>
                                            key !== "created_at" &&
                                            key !== "id"
                                        )
                                        .map(([key, value]) => (

                                            <td key={key}>

                                                {ospiteInModifica === ospite.id &&
                                                    key !== "id" ? (

                                                    typeof value === "boolean" ? (

                                                        <input
                                                            type="checkbox"
                                                            name={key}
                                                            checked={formData[key] ?? false}
                                                            onChange={handleChange}
                                                            required
                                                        />

                                                    ) : typeof value === "number" ? (

                                                        <input
                                                            type="number"
                                                            name={key}
                                                            value={formData[key] ?? ""}
                                                            onChange={handleChange}
                                                            required
                                                        />

                                                    ) : (

                                                        <input
                                                            type="text"
                                                            name={key}
                                                            value={formData[key] ?? ""}
                                                            onChange={handleChange}
                                                        />

                                                    )

                                                ) : (

                                                    typeof value === "boolean"
                                                        ? (value ? "Sì" : "No")
                                                        : value ?? "Nessun messaggio"

                                                )}

                                            </td>

                                        ))
                                    }

                                    <td>

                                        {ospiteInModifica === ospite.id ? (

                                            <>
                                                <button onClick={handleSave}>
                                                    Salva
                                                </button>

                                                <button onClick={handleCancel}>
                                                    Annulla
                                                </button>
                                            </>

                                        ) : (

                                            <>
                                                <button onClick={() => handleEdit(ospite)}>
                                                    Modifica
                                                </button>

                                                <button onClick={() => handleDelete(ospite.id)}>
                                                    Elimina
                                                </button>
                                            </>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {ospiteSelezionato && (
                        <div className="dettagli-overlay">

                            <div className="dettagli-card">

                                <button
                                    type="button"
                                    className="chiudi-dettagli"
                                    onClick={() => setOspiteSelezionato(null)}
                                >
                                    ✕
                                </button>

                                <h2>Dettaglio ospite</h2>

                                <div className="dettagli-content">

                                    {Object.entries(ospiteSelezionato).map(([key, value]) => (
                                        <div className="dettaglio-riga" key={key}>
                                            <strong>{key}</strong>

                                            <span>
                                                {typeof value === "boolean"
                                                    ? (value ? "Sì" : "No")
                                                    : value ?? "-"}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>
                    )}

                </div>

            )}

        </section>
    );
}

export default Ospiti;
