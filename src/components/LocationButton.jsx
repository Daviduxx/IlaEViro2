import '../styles/LocationButton.scss';

function LocationButton() {
    const address = encodeURIComponent('Via Roma 10, Torino, Italia');

    return (
        <a
            className="location-button"
            href={`https://www.google.com/maps/search/?api=1&query=${address}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <span>✦</span>
            SCOPRI COME RAGGIUNGERCI
            <span>✦</span>
        </a>
    );
}

export default LocationButton;
