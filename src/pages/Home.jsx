import MovieTicket from '../components/MovieTicket';
import Rsvp from '../components/Rsvp'
import Camere from '../components/Camere'
import Abovefold from '../components/AboveFold';
import PhotoCarousel from '../components/PhotoCarousel';
import ThankYou from '../components/ThankYou';
import Countdown from '../components/Countdown';
import Footer from '../components/Footer';
import Timeline from '../components/TimeLine';

function Home() {

    return (
        <>
            <Abovefold></Abovefold>
            <MovieTicket></MovieTicket>
            <Timeline></Timeline>
            <Rsvp></Rsvp>
            <Camere></Camere>
            <PhotoCarousel></PhotoCarousel>
            <ThankYou></ThankYou>
            <Countdown></Countdown>
            <Footer></Footer>
        </>
    )
}

export default Home;