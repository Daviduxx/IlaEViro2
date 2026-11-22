import Navbar from '../components/Navbar';
import '../styles/Admin.scss';
import OspitiAdmin from '../components/OspitiAdmin';
import CamereAdmin from '../components/CamereAdmin'

function Admin() {


    return (
        <>
            <Navbar></Navbar>
            <h1>Gestione prentazioni e camere</h1>
            <OspitiAdmin></OspitiAdmin>
            <CamereAdmin></CamereAdmin>
        </>
    );
}

export default Admin;
