import { Outlet } from 'react-router-dom';
import HeaderUsuario from '../components/HeaderUsuario/HeaderUsuario';
import Footer from '../components/Footer/Footer';
import styles from './PrivateLayout.module.css';

function PrivateLayout() {
  return (
    <div className={styles.layout}>
      <HeaderUsuario />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PrivateLayout;