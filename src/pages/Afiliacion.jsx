import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styles from './Afiliacion.module.css';

function Afiliacion() {
  const location = useLocation();
  const basePath = '/afiliacion';

  return (
    <div className={styles.afiliacion}>
      <h1>Afiliación</h1>
      <div className={styles.tabs}>
        <Link to={`${basePath}/beneficios`} className={location.pathname.includes('beneficios') ? styles.activeTab : ''}>Beneficios</Link>
        <Link to={`${basePath}/requisitos`} className={location.pathname.includes('requisitos') ? styles.activeTab : ''}>Requisitos</Link>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="beneficios" element={
            <div>
              <h2>Beneficios de ser afiliado</h2>
              <ul>
                <li>Asesoría legal gratuita</li>
                <li>Acceso libre en la region </li>
                <li>Participación en asambleas y votaciones</li>
                <li>Seguro de accidentes</li>
              </ul>
            </div>
          } />
          <Route path="requisitos" element={
            <div>
              <h2>Requisitos para afiliarse</h2>
              <ul>
                <li>Ser transportista activo (conductor o propietario)</li>
                <li>Presentar fotocopia de cédula de identidad</li>
                <li>Licencia de conducir vigente</li>
                <li>certificado que pertenece a la provincia sud yunga</li>
                <li>Llenar el formulario de solicitud</li>
              </ul>
            </div>
          } />
          <Route index element={<p>Selecciona una opción.</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default Afiliacion;