import { useAuth } from '../../contexts/AuthContext';
import styles from './Dashboard.module.css';

function ConductorMinibusDashboard() {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <h1>Panel del Conductor de Minibús</h1>
      <p>Bienvenido, {user?.nombre}</p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Marcar disponibilidad</h3>
          <p>Indica si estás disponible para rutas.</p>
        </div>
        <div className={styles.card}>
          <h3>Reservar asientos</h3>
          <p>Gestiona reservas para tus viajes.</p>
        </div>
        <div className={styles.card}>
          <h3>Ver publicaciones</h3>
          <p>Noticias y comunicados internos.</p>
        </div>
      </div>
    </div>
  );
}

export default ConductorMinibusDashboard;