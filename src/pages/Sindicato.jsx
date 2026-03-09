import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styles from './Sindicato.module.css';

function Sindicato() {
  const location = useLocation();
  const basePath = '/sindicato';

  return (
    <div className={styles.sindicato}>
      <h1>El Sindicato</h1>
      <div className={styles.tabs}>
        <Link to={`${basePath}/historia`} className={location.pathname.includes('historia') ? styles.activeTab : ''}>Historia</Link>
        <Link to={`${basePath}/estatutos`} className={location.pathname.includes('estatutos') ? styles.activeTab : ''}>Estatutos</Link>
        <Link to={`${basePath}/directiva`} className={location.pathname.includes('directiva') ? styles.activeTab : ''}>Directiva</Link>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="historia" element={
            <div>
              <h2>Historia</h2>
              <p>El Sindicato Mixto de Transporte Virgen de las Nieves es una organización con personería jurídica nro. 26830 afiliado a la federación de choferes Chuquiago Marka, el sindicato se fundó el 5 de agosto de 2019 en la comunidad de Quilambaya provincia sud Yungas, que presta servicios de transporte interprovincial entre la ciudad de La Paz (Provincia Murillo) y las diferentes comunidades de la provincia Sud Yungas. La organización está conformada por dos grupos, minibuses dedicados al transporte de pasajeros y volquetas que trabajan con cooperativas mineras de la región..</p>
            </div>
          } />
          <Route path="estatutos" element={
            <div>
              <h2>Estatutos</h2>
              <p>Nuestros estatutos establecen los derechos y deberes de los afiliados, la estructura organizativa y los procedimientos para asambleas y elecciones. Puedes consultar el documento completo en la sede.</p>
            </div>
          } />
          <Route path="directiva" element={
            <div>
              <h2>Directiva</h2>
              <ul>
                <li><strong>Secretario General:</strong> Porfirio Valero Cussi</li>
                <li><strong>Secretario de Actas:</strong> Rafael lima</li>
                <li><strong>Tesorero:</strong> Alejandra </li>
                <li><strong>deporte:</strong> Sergio tonconi </li>
                <li><strong>conflicto:</strong> Jaime </li>
                
              </ul>
            </div>
          } />
          <Route index element={<p>Selecciona una sección del menú.</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default Sindicato;