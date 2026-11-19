import { useRef, useState } from 'react';
import '../styles/PhotoCarousel.scss';

function PhotoCarousel({ photos }) {
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
                <p>Ogni fotografia racconta un piccolo pezzo di noi.</p>
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
