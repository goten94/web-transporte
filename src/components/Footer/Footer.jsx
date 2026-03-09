import { FaPhone, FaShieldAlt, FaBalanceScale } from 'react-icons/fa';
import { MdTransitEnterexit } from 'react-icons/md';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.sedes}>
          <h3>Sedes físicas</h3>
          <p><strong>Boquerón (centro de La Paz):</strong> 8:00 am - 6:00 pm</p>
          <p><strong>Ex Tranca (zona sur de La Paz):</strong> 8:00 am - 6:00 pm</p>
          <p><strong>Teléfonos:</strong> 22591130 | 73057975</p>
        </div>

        <div className={styles.enlaces}>
          <h3>Organismos oficiales</h3>
          <ul>
            <li><a href="https://www.transporte.gob.bo" target="_blank" rel="noopener noreferrer">Ministerio de Transportes</a></li>
            <li><a href="https://www.trabajo.gob.bo" target="_blank" rel="noopener noreferrer">Inspección de Trabajo</a></li>
            <li><a href="https://www.seguridadvial.gob.bo" target="_blank" rel="noopener noreferrer">Organismos de seguridad vial</a></li>
          </ul>
        </div>

        <div className={styles.certificaciones}>
          <h3>Certificaciones</h3>
          <div className={styles.certIcons}>
            <span><FaShieldAlt /> Transparencia</span>
            <span><FaBalanceScale /> Representatividad</span>
            <span><MdTransitEnterexit /> Transporte seguro</span>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} SMTVN - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;