import { useEffect, useState } from "react";
import "../styles/Countdown.scss";

function Countdown() {

    const weddingDate = new Date("2027-04-24T12:00:00");

    const calculateTimeLeft = () => {
        const difference = weddingDate - new Date();

        if (difference <= 0) {
            return {
                giorni: 0,
                ore: 0,
                minuti: 0,
                secondi: 0
            };
        }

        return {
            giorni: Math.floor(difference / (1000 * 60 * 60 * 24)),
            ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minuti: Math.floor((difference / (1000 * 60)) % 60),
            secondi: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="countdown">
            <h2>IL GRANDE GIORNO SI AVVICINA</h2>
            <p>Il nostro sì è sempre più vicino...</p>

            <div className="countdown-container">
                {Object.entries(timeLeft).map(([label, value]) => (
                    <div className="countdown-item" key={label}>
                        <span>{String(value).padStart(2, "0")}</span>
                        <small>{label}</small>
                    </div>
                ))}
            </div>

            <img src="/logo.png" alt="" srcset="" />
        </section>
    );
}

export default Countdown;
