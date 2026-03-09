import { useAuth } from '../../contexts/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaStar } from 'react-icons/fa';
import styles from './HeaderUsuario.module.css';

function HeaderUsuario() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titlesArea}>
          <h1 className={styles.title}>
            Sindicato Mixto de Transporte Virgen de las Nieves
          </h1>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={styles.star} />
            ))}
          </div>
        </div>

        <div className={styles.userInfo}>
          <FaUserCircle className={styles.avatar} />
          <span className={styles.userName}>{user?.nombre || 'Usuario'}</span>
          <button onClick={logout} className={styles.logoutBtn} title="Cerrar sesión">
            <FaSignOutAlt /> <span>Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderUsuario;