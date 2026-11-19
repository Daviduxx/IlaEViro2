import MovieTicket from '../components/MovieTicket';
import Rsvp from '../components/Rsvp'
import Camere from '../components/Camere'
import Abovefold from '../components/AboveFold';
import PhotoCarousel from '../components/PhotoCarousel';

function Home() {

    const weddingPhotos = [
        {
            src: '/images/gallery/foto1.webp',
            alt: 'Un momento insieme',
            caption: 'Il nostro primo ricordo'
        },
        {
            src: '/images/gallery/foto2.webp',
            alt: 'Un viaggio insieme',
            caption: 'Avventure da condividere'
        },
        {
            src: '/images/gallery/foto3.webp',
            alt: 'Un momento speciale',
            caption: 'Una storia speciale'
        },
        {
            src: '/images/gallery/foto4.webp',
            alt: 'Un giorno felice',
            caption: 'E tanti altri ancora'
        }
    ];

    return (
        <>
            <Abovefold></Abovefold>
            <MovieTicket></MovieTicket>
            <Rsvp></Rsvp>
            <Camere></Camere>
            <PhotoCarousel photos={weddingPhotos}></PhotoCarousel>
        </>
    )
}

export default Home;