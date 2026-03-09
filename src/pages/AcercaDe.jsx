import styles from './AcercaDe.module.css';
import developerImg from '../assets/developer.png'; // Ajusta la ruta y nombre según tu imagen

function AcercaDe() {
  return (
    <div className={styles.acerca}>
      <h1>Acerca del desarrollador</h1>
      <div className={styles.content}>
        <img src={developerImg} alt="Desarrollador" className={styles.image} />
        <div className={styles.text}>
          <p>Este sitema web fue desarrollada como proyecto de grado por el universitario  <strong>Jimmy Armando Valero Tarqui</strong>, estudiante de Informatica de la universidad Mayor de San Andres.</p>
          <p>Para mantenimiento y soporte, contactar a: <a href="mailto:soporte@smtvn.bo">gotenboy94@gmail.com</a> o con el numero 77552863</p>
          <p>Versión: 1.0.0</p>
        </div>
      </div>
    </div>
  );
}

export default AcercaDe;