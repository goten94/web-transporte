import LeftSidebar from '../components/LeftSiderbar/LeftSidebar';
import RightSidebar from '../components/RightSidebar/RightSidebar';
import Carousel from '../components/Carousel/Carousel';
import styles from './Home.module.css';
import covertura from '../assets/covertura.png';
function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.sidebarLeft}>
        <LeftSidebar />
      </div>

      <div className={styles.mainContent}>
        <Carousel />

        

        <section className={styles.mapSection}>
          <h2>Mapa de cobertura</h2>
          <div className={styles.mapPlaceholder}>
            <img src={covertura} alt="Mapa de cobertura" />
          </div>
        </section>

    
      </div>

      <div className={styles.sidebarRight}>
        <RightSidebar />
      </div>
    </div>
  );
}

export default Home;