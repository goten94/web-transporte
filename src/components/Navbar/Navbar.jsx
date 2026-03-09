import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Función para obtener el enlace del dashboard según el rol
  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'administrador': return '/admin';
      case 'secretario': return '/secretario';
      case 'boletero': return '/boletero';
      case 'tesorero': return '/tesorero';
      case 'conductor_minibus': return '/conductor/minibus';
      case 'conductor_volqueta': return '/conductor/volqueta';
      case 'pasajero': return '/pasajero';
      default: return null;
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
              INICIO
            </NavLink>
          </li>

          {/* EL SINDICATO ahora es enlace directo */}
          <li>
            <NavLink to="/sindicato" className={({ isActive }) => isActive ? styles.active : ''}>
              EL SINDICATO
            </NavLink>
          </li>

          {/* AFILIACIÓN directo */}
          <li>
            <NavLink to="/afiliacion" className={({ isActive }) => isActive ? styles.active : ''}>
              AFILIACIÓN
            </NavLink>
          </li>

          {/* SERVICIOS directo */}
          <li>
            <NavLink to="/servicios" className={({ isActive }) => isActive ? styles.active : ''}>
              SERVICIOS
            </NavLink>
          </li>

          <li>
            <NavLink to="/noticias" className={({ isActive }) => isActive ? styles.active : ''}>
              NOTICIAS/COMUNICADOS
            </NavLink>
          </li>

          <li>
            <NavLink to="/acerca-de" className={({ isActive }) => isActive ? styles.active : ''}>
              ACERCA DE NOSOTROS
            </NavLink>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <NavLink to={getDashboardLink()} className={({ isActive }) => isActive ? styles.active : ''}>
                  DASHBOARD
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  CERRAR SESIÓN
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ''}>
                  <FaUser /> INICIAR SESIÓN
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => isActive ? styles.active : ''}>
                  <FaUserPlus /> REGISTRATE
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;