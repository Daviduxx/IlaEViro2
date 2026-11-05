import Navbar from '../components/Navbar';
import './Admin.css';

function Admin() {

    const partecipanti = [
        {
            id: 1,
            nome: 'Marco',
            cognome: 'Rossi',
            citta: 'Torino',
            partecipa: true,
            note: 'Vegetariano'
        },
        {
            id: 2,
            nome: 'Giulia',
            cognome: 'Bianchi',
            citta: 'Milano',
            partecipa: true,
            note: ''
        },
        {
            id: 3,
            nome: 'Luca',
            cognome: 'Verdi',
            citta: 'Roma',
            partecipa: false,
            note: ''
        },
        {
            id: 4,
            nome: 'Sara',
            cognome: 'Ferrari',
            citta: 'Genova',
            partecipa: true,
            note: 'Intolleranza al lattosio'
        },
        {
            id: 5,
            nome: 'Andrea',
            cognome: 'Russo',
            citta: 'Bologna',
            partecipa: false,
            note: ''
        },
        {
            id: 6,
            nome: 'Francesca',
            cognome: 'Romano',
            citta: 'Torino',
            partecipa: true,
            note: 'Accompagnatore'
        },
        {
            id: 7,
            nome: 'Matteo',
            cognome: 'Gallo',
            citta: 'Firenze',
            partecipa: true,
            note: ''
        },
        {
            id: 8,
            nome: 'Elena',
            cognome: 'Conti',
            citta: 'Milano',
            partecipa: false,
            note: ''
        }
    ];

    const confermati = partecipanti.filter(p => p.partecipa).length;
    const assenti = partecipanti.filter(p => !p.partecipa).length;

    return (
        <>
            <Navbar></Navbar>

            <div className="admin-container">

                <header className="admin-header">
                    <div>
                        <span className="admin-subtitle">
                            ILAVIRO / AREA RISERVATA
                        </span>
                        <h1>Dashboard</h1>
                        <p>Gestisci i tuoi invitati e le partecipazioni.</p>
                    </div>

                    <div className="admin-user">
                        <div className="admin-avatar">A</div>
                        <span>Amministratore</span>
                    </div>
                </header>

                <section className="admin-stats">

                    <div className="stat-card">
                        <span>Totale invitati</span>
                        <strong>{partecipanti.length}</strong>
                        <small>Invitati registrati</small>
                    </div>

                    <div className="stat-card confirmed">
                        <span>Confermati</span>
                        <strong>{confermati}</strong>
                        <small>Hanno confermato</small>
                    </div>

                    <div className="stat-card absent">
                        <span>Non partecipano</span>
                        <strong>{assenti}</strong>
                        <small>Hanno declinato</small>
                    </div>

                </section>

                <section className="admin-guests">

                    <div className="guests-header">
                        <div>
                            <h2>Lista partecipanti</h2>
                            <p>Elenco degli invitati al matrimonio</p>
                        </div>

                        <input
                            type="text"
                            placeholder="Cerca partecipante..."
                        />
                    </div>

                    <div className="table-wrapper">

                        <table className="guests-table">

                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Cognome</th>
                                    <th>Città</th>
                                    <th>Partecipazione</th>
                                    <th>Note</th>
                                </tr>
                            </thead>

                            <tbody>
                                {partecipanti.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.nome}</td>
                                        <td>{p.cognome}</td>
                                        <td>{p.citta}</td>

                                        <td>
                                            <span className={`status ${p.partecipa ? 'status-confirmed' : 'status-absent'}`}>
                                                {p.partecipa ? 'Confermato' : 'Assente'}
                                            </span>
                                        </td>

                                        <td>{p.note || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                    <div className="table-footer">
                        <span>Visualizzati {partecipanti.length} partecipanti</span>
                    </div>

                </section>

            </div>
        </>
    );
}

export default Admin;
