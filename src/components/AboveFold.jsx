import '../styles/AboveFold.scss'
import SectionDivider from './/SectionDivider'

function Abovefold() {
    return (
        <>
            <div className="container">
                <h3>Il matrimonio di</h3>
                <h1>Ilaria & Giulio</h1>
                <h2>Una storia vivere con voi</h2>
                <SectionDivider></SectionDivider>
                <h4>Siamo lieti di invitarvi ufficialmente alla prima cinematografica più attessa dell'anno!</h4>

                <div className="underFold">
                    <img src="/1.webp" alt="" srcSet="" />
                    <div className="details">
                        <h3>Starring Giulio e Ilaria</h3>
                    </div>

                </div>
            </div>

        </>
    )

}

export default Abovefold;