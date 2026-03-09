import { useAuth } from '../../contexts/AuthContext';
import styles from './Dashboard.module.css';

function ConductorVolquetaDashboard() {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <h1>Panel del Conductor de Volqueta</h1>
      <p>Bienvenido, {user?.nombre}</p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Ver horarios</h3>
          <p>Consulta tus asignaciones diarias.</p>
        </div>
        <div className={styles.card}>
          <h3>Asignaciones en cooperativas</h3>
          <p>Trabajos disponibles en cooperativas.</p>
        </div>
      </div>
    </div>
  );
}

export default ConductorVolquetaDashboard;