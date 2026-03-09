import { useAuth } from '../../contexts/AuthContext';
import styles from './Dashboard.module.css';

function PasajeroDashboard() {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <h1>Panel del Pasajero</h1>
      <p>Bienvenido, {user?.nombre}</p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Consultar horarios</h3>
          <p>Revisa los horarios de salida.</p>
        </div>
        <div className={styles.card}>
          <h3>Destinos disponibles</h3>
          <p>Lista de rutas y precios.</p>
        </div>
        <div className={styles.card}>
          <h3>Disponibilidad de asientos</h3>
          <p>Verifica asientos libres en tiempo real.</p>
        </div>
      </div>
    </div>
  );
}

export default PasajeroDashboard;