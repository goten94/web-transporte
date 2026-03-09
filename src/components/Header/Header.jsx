import { FaStar } from 'react-icons/fa';
import styles from './Header.module.css';
import virgenImg from '../../assets/virgen.png';
import volanteImg from '../../assets/volante.png';
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={virgenImg} alt="Virgen de las Nieves" className={styles.imgLeft} />
        </div>
        <div className={styles.center}>
          <h1 className={styles.title}>Sindicato Mixto de Transporte Virgen de las Nieves</h1>
          <p className={styles.lema}>"Pasión por el servicio, orgullo por nuestra tierra"</p>
          <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={styles.star} />
          ))}
        </div>
        </div>
       
        <div className={styles.right}>
          <img src={volanteImg} alt="Volante" className={styles.imgRight} />
        </div>
      </div>
    </header>
  );
}

export default Header;