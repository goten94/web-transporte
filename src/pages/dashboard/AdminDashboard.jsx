import { useState } from 'react';
import AdminAfiliados from './AdminAfiliados';
import AdminSolicitudes from './AdminSolicitudes';
import styles from './AdminDashboard.module.css';

// Datos mock iniciales de afiliados
const initialAfiliados = [
  {
    id: 1,
    foto: 'https://randomuser.me/api/portraits/men/1.jpg',
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '78912345',
    tipo: 'propietario',
    vehiculo: {
      marca: 'Toyota',
      tipo: 'Minibús',
      placa: 'ABC-123',
      ruat: 'RUAT-001',
      foto: 'https://via.placeholder.com/60x40?text=Toyota'
    },
    aportes: [
      { mes: 'Enero 2025', monto: 150, estado: 'pagado' },
      { mes: 'Febrero 2025', monto: 150, estado: 'pendiente' },
      { mes: 'Marzo 2025', monto: 150, estado: 'pendiente' }
    ]
  },
  {
    id: 2,
    foto: 'https://randomuser.me/api/portraits/women/2.jpg',
    nombre: 'María Gómez',
    email: 'maria.gomez@example.com',
    telefono: '71234567',
    tipo: 'asalariado',
    vehiculo: {
      marca: 'Volvo',
      tipo: 'Volqueta',
      placa: 'XYZ-789',
      ruat: 'RUAT-002',
      foto: 'https://via.placeholder.com/60x40?text=Volvo'
    },
    aportes: [
      { mes: 'Enero 2025', monto: 200, estado: 'pagado' },
      { mes: 'Febrero 2025', monto: 200, estado: 'pagado' },
      { mes: 'Marzo 2025', monto: 200, estado: 'pagado' }
    ]
  }
];

// Solicitudes pendientes (enviadas por el secretario)
const initialSolicitudes = [
  {
    id: 101,
    foto: 'https://randomuser.me/api/portraits/men/3.jpg',
    nombre: 'Carlos López',
    email: 'carlos.lopez@example.com',
    telefono: '69876543',
    tipo: 'propietario',
    vehiculo: {
      marca: 'Mercedes',
      tipo: 'Minibús',
      placa: 'LMN-456',
      ruat: 'RUAT-003',
      foto: 'https://via.placeholder.com/60x40?text=Mercedes'
    },
    fechaSolicitud: '2025-03-15'
  },
  {
    id: 102,
    foto: 'https://randomuser.me/api/portraits/women/4.jpg',
    nombre: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    telefono: '67778899',
    tipo: 'asalariado',
    vehiculo: {
      marca: 'Nissan',
      tipo: 'Volqueta',
      placa: 'OPQ-321',
      ruat: 'RUAT-004',
      foto: 'https://via.placeholder.com/60x40?text=Nissan'
    },
    fechaSolicitud: '2025-03-16'
  }
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('afiliados'); // 'afiliados', 'solicitudes', 'configuracion'
  const [afiliados, setAfiliados] = useState(initialAfiliados);
  const [solicitudes, setSolicitudes] = useState(initialSolicitudes);

  // Estados para los contenidos editables (Configuración)
  const [directiva, setDirectiva] = useState('Secretario General: Juan Pérez, Secretario de Actas: María Gómez, Tesorero: Carlos López');
  const [beneficios, setBeneficios] = useState('Asesoría legal gratuita, Descuentos en cursos de formación, Seguro de accidentes, Bolsa de trabajo');
  const [requisitos, setRequisitos] = useState('Ser transportista activo, Presentar fotocopia de CI, Licencia de conducir vigente, Pagar cuota de afiliación (Bs. 100)');
  const [comunicados, setComunicados] = useState('Próxima asamblea: 20 de abril a las 10:00 am en sede Boquerón. Nuevos horarios de atención: 8:00 am a 6:00 pm.');

  // Funciones para manejar actualizaciones (simulan llamada a API)
  const handleUpdateDirectiva = () => {
    alert('Directiva actualizada (simulado)');
  };

  const handleUpdateBeneficios = () => {
    alert('Beneficios actualizados (simulado)');
  };

  const handleUpdateRequisitos = () => {
    alert('Requisitos actualizados (simulado)');
  };

  const handleUpdateComunicados = () => {
    alert('Comunicados actualizados (simulado)');
  };

  // Funciones para manejar afiliados
  const handleAddAfiliado = (nuevoAfiliado) => {
    setAfiliados([...afiliados, { ...nuevoAfiliado, id: Date.now(), aportes: [] }]);
  };

  const handleEditAfiliado = (afiliadoEditado) => {
    setAfiliados(afiliados.map(a => a.id === afiliadoEditado.id ? afiliadoEditado : a));
  };

  const handleDeleteAfiliado = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este afiliado?')) {
      setAfiliados(afiliados.filter(a => a.id !== id));
    }
  };

  // Funciones para manejar solicitudes
  const handleApproveSolicitud = (solicitud) => {
    const nuevoAfiliado = {
      ...solicitud,
      id: Date.now(),
      aportes: []
    };
    delete nuevoAfiliado.fechaSolicitud;
    setAfiliados([...afiliados, nuevoAfiliado]);
    setSolicitudes(solicitudes.filter(s => s.id !== solicitud.id));
  };

  const handleRejectSolicitud = (id) => {
    if (window.confirm('¿Rechazar esta solicitud?')) {
      setSolicitudes(solicitudes.filter(s => s.id !== id));
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Panel de Administración</h1>

      {/* Barra de navegación por pestañas */}
      <div className={styles.tabNav}>
        <button
          className={`${styles.tabButton} ${activeTab === 'afiliados' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('afiliados')}
        >
          Lista de afiliados
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'solicitudes' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('solicitudes')}
        >
          Solicitudes de nuevos socios
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'configuracion' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('configuracion')}
        >
          Configuración de contenido público
        </button>
      </div>

      {/* Contenido según pestaña activa */}
      <div className={styles.tabContent}>
        {activeTab === 'afiliados' && (
          <AdminAfiliados
            afiliados={afiliados}
            onAdd={handleAddAfiliado}
            onEdit={handleEditAfiliado}
            onDelete={handleDeleteAfiliado}
          />
        )}

        {activeTab === 'solicitudes' && (
          <AdminSolicitudes
            solicitudes={solicitudes}
            onApprove={handleApproveSolicitud}
            onReject={handleRejectSolicitud}
          />
        )}

        {activeTab === 'configuracion' && (
          <div className={styles.configSection}>
            <h2>Configuración de contenido público</h2>
            <div className={styles.configGrid}>
              <div className={styles.configCard}>
                <h3>Directiva</h3>
                <textarea
                  rows="4"
                  value={directiva}
                  onChange={(e) => setDirectiva(e.target.value)}
                  className={styles.textarea}
                />
                <button onClick={handleUpdateDirectiva} className={styles.updateBtn}>Actualizar Directiva</button>
              </div>
              <div className={styles.configCard}>
                <h3>Beneficios</h3>
                <textarea
                  rows="4"
                  value={beneficios}
                  onChange={(e) => setBeneficios(e.target.value)}
                  className={styles.textarea}
                />
                <button onClick={handleUpdateBeneficios} className={styles.updateBtn}>Actualizar Beneficios</button>
              </div>
              <div className={styles.configCard}>
                <h3>Requisitos</h3>
                <textarea
                  rows="4"
                  value={requisitos}
                  onChange={(e) => setRequisitos(e.target.value)}
                  className={styles.textarea}
                />
                <button onClick={handleUpdateRequisitos} className={styles.updateBtn}>Actualizar Requisitos</button>
              </div>
              <div className={styles.configCard}>
                <h3>Comunicados</h3>
                <textarea
                  rows="4"
                  value={comunicados}
                  onChange={(e) => setComunicados(e.target.value)}
                  className={styles.textarea}
                />
                <button onClick={handleUpdateComunicados} className={styles.updateBtn}>Actualizar Comunicados</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;