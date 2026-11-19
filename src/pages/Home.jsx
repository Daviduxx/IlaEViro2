import MovieTicket from '../components/MovieTicket';
import Rsvp from '../components/Rsvp'
import Camere from '../components/Camere'
import Abovefold from '../components/AboveFold';
import PhotoCarousel from '../components/PhotoCarousel';
import ThankYou from '../components/ThankYou';
import Countdown from '../components/Countdown';

function Home() {

    const weddingPhotos = [
        {
            src: '/1.webp',
            alt: 'Un momento insieme',
            caption: 'Amavamo il vintage da prima che andasse di moda!'
        },
        {
            src: '/5.webp',
            alt: 'Un viaggio insieme',
            caption: 'Una storia speciale'
        },
        {
            src: '/3.webp',
            alt: 'Un momento speciale',
            caption: 'Avventure da condividere'
        },
        {
            src: '/4.webp',
            alt: 'Un giorno felice',
            caption: 'Stiamo bene nei panni dei Peky Blinders!'
        },
        {
            src: '/2.webp',
            alt: 'Un giorno felice',
            caption: 'Il cinema: ci ha sempre legati!'
        },
        {
            src: '/6.webp',
            alt: 'Un giorno felice',
            caption: 'Attimi in cui ci siamo solo noi due'
        },
        {
            src: '/7.webp',
            alt: 'Un giorno felice',
            caption: 'Il nostro cuore è sempre stato punk!'
        },
        {
            src: '/8.webp',
            alt: 'Un giorno felice',
            caption: 'Abbiamo vissuto tanti momenti felici'
        },
        {
            src: '/9.webp',
            alt: 'Un giorno felice',
            caption: 'E vogliamo viverne tanti altri ancora'
        }
    ];

    return (
        <>
            <Abovefold></Abovefold>
            <MovieTicket></MovieTicket>
            <Rsvp></Rsvp>
            <Camere></Camere>
            <PhotoCarousel photos={weddingPhotos}></PhotoCarousel>
            <ThankYou></ThankYou>
            <Countdown></Countdown>
        </>
    )
}

export default Home;