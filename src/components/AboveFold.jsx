import '../styles/AboveFold.scss'
import SectionDivider from './SectionDivider'
import Button from './Button';
import Navbar from './Navbar'

function Abovefold() {
    return (
        <>
            <div className="container">
                <Navbar></Navbar>
                <h3>Il matrimonio di</h3>
                <h1>Ilaria & Giulio</h1>
                <h2>Una storia da vivere <br></br>con voi</h2>
                <SectionDivider></SectionDivider>
                <h4>Siamo lieti di invitarvi ufficialmente alla prima cinematografica più attessa dell'anno!</h4>
                <Button onClick={() => {
                    document.getElementById('rsvp')?.scrollIntoView({
                        behavior: 'smooth'
                    });
                }} />
                <div className="underFold">
                    <img src="/9.webp" alt="" srcSet="" />
                    <div className="details">
                        <h3>STARRING:</h3>
                        <div className="sposi">
                            <div>
                                <h6>LO SPOSO</h6>
                                <h5>Giulio <br></br>Marchesan Benso</h5>
                            </div>
                            <div>
                                <h6>LA SPOSA</h6>
                                <h5>Ilaria <br></br>Aziomonti</h5>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )

}

export default Abovefold;