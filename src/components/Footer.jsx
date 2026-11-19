import '../styles/Footer.scss'

function Footer() {

    const thisYear = new Date().getFullYear();
    return (
        <div className="footer">
            <p>@Davide Borotto Dalla Vecchia, {thisYear}</p>
        </div>
    )
}

export default Footer