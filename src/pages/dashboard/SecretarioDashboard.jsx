import { Routes, Route, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUsers, FaChartBar, FaCalendarAlt } from 'react-icons/fa';
import SecretarioAfiliados from './SecretarioAfiliados';
import styles from './SecretarioDashboard.module.css'; // Podemos crear un nuevo archivo de estilos específico o usar el mismo pero con nuevas clases. Para mantener orden, creamos uno nuevo.

function SecretarioDashboard() {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Panel del Secretario</h1>
        <div className={styles.greenLine}></div>
      </div>
      <nav className={styles.navbar}>
        <NavLink to="/secretario/afiliados" className={({ isActive }) => isActive ? styles.active : ''}>
          <FaUsers /> Gestionar Afiliados
        </NavLink>
        <NavLink to="/secretario/reportes" className={({ isActive }) => isActive ? styles.active : ''}>
          <FaChartBar /> Reportes
        </NavLink>
        <NavLink to="/secretario/convocatorias" className={({ isActive }) => isActive ? styles.active : ''}>
          <FaCalendarAlt /> Convocatorias
        </NavLink>
      </nav>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<SecretarioAfiliados />} />
          <Route path="/afiliados" element={<SecretarioAfiliados />} />
          <Route path="/reportes" element={<div className={styles.placeholder}>Reportes (en construcción)</div>} />
          <Route path="/convocatorias" element={<div className={styles.placeholder}>Convocatorias (en construcción)</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default SecretarioDashboard;