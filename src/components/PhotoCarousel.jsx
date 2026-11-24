import { useRef, useState } from 'react';
import '../styles/PhotoCarousel.scss';

function PhotoCarousel() {

    const photos = [
        {
            src: '/7.webp',
            alt: 'Un momento insieme',
            caption: 'Le nostre origini punk!'
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
            caption: 'Stiamo bene nei panni dei Peaky Blinders!'
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
            src: '/1.webp',
            alt: 'Un giorno felice',
            caption: 'Amavamo il vintage da prima che andasse di moda!'
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
    const [activeIndex, setActiveIndex] = useState(0);
    const trackRef = useRef(null);

    const scrollToPhoto = (index) => {
        const track = trackRef.current;
        if (!track) return;

        const photo = track.children[index];
        if (!photo) return;

        track.scrollTo({
            left: photo.offsetLeft - (track.clientWidth - photo.clientWidth) / 2,
            behavior: 'smooth',
        });

        setActiveIndex(index);
    };

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track) return;

        const center = track.scrollLeft + track.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        Array.from(track.children).forEach((photo, index) => {
            const photoCenter = photo.offsetLeft + photo.clientWidth / 2;
            const distance = Math.abs(center - photoCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveIndex(closestIndex);
    };

    const previous = () => {
        scrollToPhoto(Math.max(0, activeIndex - 1));
    };

    const next = () => {
        scrollToPhoto(Math.min(photos.length - 1, activeIndex + 1));
    };

    if (!photos || photos.length === 0) return null;

    return (
        <section className="photo-carousel-section">

            <div className="carousel-heading">
                <span>OUR MEMORIES</span>
                <h2>La nostra storia in immagini</h2>
                <p>Ogni fotografia racconta un frame del nostro film</p>
            </div>

            <div className="carousel-container">

                <button
                    className="carousel-arrow"
                    onClick={previous}
                    disabled={activeIndex === 0}
                    aria-label="Fotografia precedente"
                >
                    ‹
                </button>

                <div
                    className="carousel-track"
                    ref={trackRef}
                    onScroll={handleScroll}
                >
                    {photos.map((photo, index) => (
                        <div className="carousel-slide" key={photo.src}>
                            <div className="photo-card">

                                <span className="photo-label">
                                    FRAME N° {String(index + 1).padStart(2, '0')}
                                </span>

                                <img src={photo.src} alt={photo.alt || ''} />

                                <p>{photo.caption || 'Ilaria & Giulio'}</p>

                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-arrow"
                    onClick={next}
                    disabled={activeIndex === photos.length - 1}
                    aria-label="Fotografia successiva"
                >
                    ›
                </button>

            </div>

            <div className="carousel-indicators">
                {photos.map((photo, index) => (
                    <button
                        key={photo.src}
                        className={activeIndex === index ? 'active' : ''}
                        onClick={() => scrollToPhoto(index)}
                        aria-label={`Vai alla fotografia ${index + 1}`}
                    />
                ))}
            </div>

        </section>
    );
}

export default PhotoCarousel;
