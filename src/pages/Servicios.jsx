import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styles from './Servicios.module.css';

function Servicios() {
  const location = useLocation();
  const basePath = '/servicios';

  return (
    <div className={styles.servicios}>
      <h1>Servicios</h1>
      <div className={styles.tabs}>
        <Link to={`${basePath}/venta-de-boletos`} className={location.pathname.includes('venta') ? styles.activeTab : ''}>Venta de boletos</Link>
        <Link to={`${basePath}/contrato-minibus-volqueta`} className={location.pathname.includes('contrato') ? styles.activeTab : ''}>Contrato de minibús/volqueta</Link>
        <Link to={`${basePath}/asesoria-legal`} className={location.pathname.includes('asesoria') ? styles.activeTab : ''}>Asesoría legal</Link>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="venta-de-boletos" element={
            <div>
              <h2>Venta de boletos</h2>
              <p>Adquiere tus boletos de viaje en nuestras oficinas ubicadas entre las calles Luis Lara y Benancio Burgoa "Boqueron" y en Extranca ovejuyo arenal. Próximamente venta en línea.</p>
            </div>
          } />
          <Route path="contrato-minibus-volqueta" element={
            <div>
              <h2>Contrato de minibús/volqueta</h2>
              <p>Ofrecemos servicios de contrto de minibuses y volquetas para eventos, mudanzas y carga. Consulta tarifas en nuestras oficinas .</p>
            </div>
          } />
          <Route path="asesoria-legal" element={
            <div>
              <h2>Asesoría legal</h2>
              <p>Nuestro equipo de abogados especializados en derecho laboral y de transporte te brinda orientación gratuita. Agenda tu cita.</p>
            </div>
          } />
          <Route index element={<p>Selecciona un servicio.</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default Servicios;