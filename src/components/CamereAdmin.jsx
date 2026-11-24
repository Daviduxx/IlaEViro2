import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import '../styles/OspitiAdmin.scss'

function Camere() {

    const [camere, setCamere] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [cameraInModifica, setCameraInModifica] = useState(null);
    const [formData, setFormData] = useState({});

    const [cameraSelezionato, setCameraSelezionato] = useState(null);

    // LETTURA OSPITI
    const getCamere = async () => {

        setLoading(true);
        setErrorMessage("");

        try {

            const { data, error } = await supabase
                .from("CAMERE")
                .select("*")
                .order("created_at", { ascending: true });

            if (error) throw error;

            setCamere(data);

        } catch (error) {

            console.error(error);
            setErrorMessage("Impossibile recuperare le camere.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCamere();
    }, []);


    // APERTURA MODIFICA
    const handleEdit = (camera) => {

        setCameraInModifica(camera.id);
        setFormData({ ...camera });
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
                .from("CAMERE")
                .update(formData)
                .eq("id", cameraInModifica)
                .select()
                .single();

            if (error) throw error;

            setCamere(prev =>
                prev.map(camera =>
                    camera.id === cameraInModifica
                        ? data
                        : camera
                )
            );

            setCameraInModifica(null);
            setFormData({});
            setErrorMessage('')

        } catch (error) {

            console.error(error);
            setErrorMessage("Errore durante il salvataggio delle modifiche.");

        }
    };


    // ANNULLAMENTO MODIFICA
    const handleCancel = () => {
        setCameraInModifica(null);
        setFormData({});
    };


    // ELIMINAZIONE
    const handleDelete = async (id) => {

        const conferma = window.confirm(
            "Sei sicuro di voler eliminare questa camera?"
        );

        if (!conferma) return;

        try {

            const { error } = await supabase
                .from("CAMERE")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setCamere(prev =>
                prev.filter(camera => camera.id !== id)
            );
            setErrorMessage('')

        } catch (error) {

            console.error(error);
            setErrorMessage("Errore durante l'eliminazione.");

        }
    };


    // RENDERING
    if (loading) {
        return <p>Caricamento camere...</p>;
    }

    return (

        <section className="dashboard-ospiti">

            <h2>Lista Camere prenotate</h2>

            <p>Camere registratie {camere.length}</p>

            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}

            {camere.length === 0 ? (

                <p>Nessuna camera registrata al momento.</p>

            ) : (

                <div className="tabella-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Apri</th>
                                <th>Nome prenotazione</th>
                                <th>Messaggio</th>
                                <th>Numero totale</th>
                                <th>Numero Letti Aggiuntivi</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>

                        <tbody>

                            {camere.map(camera => (

                                <tr key={camera.id}>
                                    <td className="eye">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => setCameraSelezionato(camera)}>
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                        </svg>
                                    </td>

                                    {Object.entries(camera)
                                        .filter(([key]) =>
                                            key !== "created_at" &&
                                            key !== "id"
                                        )
                                        .map(([key, value]) => (

                                            <td key={key}>

                                                {cameraInModifica === camera.id &&
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

                                        {cameraInModifica === camera.id ? (

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
                                                <button onClick={() => handleEdit(camera)}>
                                                    Modifica
                                                </button>

                                                <button onClick={() => handleDelete(camera.id)}>
                                                    Elimina
                                                </button>
                                            </>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {cameraSelezionato && (
                        <div className="dettagli-overlay">

                            <div className="dettagli-card">

                                <button
                                    type="button"
                                    className="chiudi-dettagli"
                                    onClick={() => setCameraSelezionato(null)}
                                >
                                    ✕
                                </button>

                                <h2>Dettaglio ospite</h2>

                                <div className="dettagli-content">

                                    {Object.entries(cameraSelezionato).map(([key, value]) => (
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

export default Camere;
