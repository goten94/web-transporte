import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importamos el hook de autenticación
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import styles from './MainLayout.module.css';

function MainLayout() {
  const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación

  return (
    <div className={styles.layout}>
      <Header />
      {/* Solo mostramos el Navbar si el usuario NO está autenticado */}
      {!isAuthenticated && <Navbar />}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;