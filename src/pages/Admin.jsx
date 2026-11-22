import Navbar from '../components/Navbar';
import '../styles/Admin.scss';
import OspitiAdmin from '../components/OspitiAdmin';


function Admin() {


    return (
        <>
            <Navbar></Navbar>
            <h1>Gestione prentazioni e camere</h1>
            <OspitiAdmin></OspitiAdmin>
        </>
    );
}

export default Admin;
