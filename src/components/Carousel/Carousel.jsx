import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './Carousel.module.css';
import autos from '../../assets/autos.jpeg';
import conflicto from '../../assets/conflicto.jpeg';

const slides = [
  {
    id: 1,
    title: 'Últimos convenios logrados',
    description: 'Acuerdo histórico con el gobierno para mejorar las condiciones laborales.',
    image: autos,
  },
  {
    id: 2,
    title: 'Próximas movilizaciones',
    description: 'Participa en la marcha del 1 de mayo por la dignidad del transportista.',
    image: conflicto,
  },
  {
    id: 3,
    title: 'Alertas normativas',
    description: 'Nuevas leyes de transporte: conoce cómo te afectan.',
    image: 'https://via.placeholder.com/800x300?text=Alertas',
  },
  {
    id: 4,
    title: 'Cursos de formación gratuitos',
    description: 'Inscríbete en los talleres de mecánica y seguridad vial.',
    image: 'https://via.placeholder.com/800x300?text=Cursos',
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slideContainer}>
        <button onClick={goToPrevious} className={`${styles.arrow} ${styles.leftArrow}`}>
          <FaChevronLeft />
        </button>
        <div className={styles.slide}>
          <img src={slides[currentIndex].image} alt={slides[currentIndex].title} />
          <div className={styles.caption}>
            <h4>{slides[currentIndex].title}</h4>
            <p>{slides[currentIndex].description}</p>
          </div>
        </div>
        <button onClick={goToNext} className={`${styles.arrow} ${styles.rightArrow}`}>
          <FaChevronRight />
        </button>
      </div>
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;