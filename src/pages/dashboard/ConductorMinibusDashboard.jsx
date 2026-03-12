import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaBus, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import styles from './ConductorMinibusDashboard.module.css';
import DetalleEncomiendaModal from './DetalleEncomiendaModal';

// Datos mock de encomiendas asignadas a este conductor
const encomiendasIniciales = [
  {
    id: 1,
    remitente: 'Carlos Pérez',
    telefonoRemitente: '78912345',
    destinatario: 'María Gómez',
    telefonoDestinatario: '71234567',
    destino: 'Totorpampa',
    contenido: 'Caja con ropa y documentos',
    costo: 25,
    fecha: '2025-03-09',
    hora: '10:30',
  },
  {
    id: 2,
    remitente: 'Ana Martínez',
    telefonoRemitente: '69876543',
    destinatario: 'Luis Rodríguez',
    telefonoDestinatario: '67778899',
    destino: 'Tres Ríos',
    contenido: 'Sobre con dinero y llaves',
    costo: 30,
    fecha: '2025-03-09',
    hora: '11:45',
  },
  {
    id: 3,
    remitente: 'Pedro Sánchez',
    telefonoRemitente: '65432198',
    destinatario: 'Juana Flores',
    telefonoDestinatario: '63322110',
    destino: 'Cañuma',
    contenido: 'Paquete de alimentos',
    costo: 20,
    fecha: '2025-03-09',
    hora: '12:15',
  },
];

function ConductorMinibusDashboard() {
  const { user } = useAuth();
  const [disponible, setDisponible] = useState(false);
  const [encomiendas, setEncomiendas] = useState(encomiendasIniciales);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [encomiendaSeleccionada, setEncomiendaSeleccionada] = useState(null);

  const toggleDisponibilidad = () => {
    setDisponible(!disponible);
    alert(`Vehículo marcado como ${!disponible ? 'disponible' : 'no disponible'}`);
  };

  const handleEntregado = (id) => {
    if (window.confirm('¿Confirmar que la encomienda ha sido entregada?')) {
      setEncomiendas(encomiendas.filter(e => e.id !== id));
    }
  };

  const handleVerDetalle = (encomienda) => {
    setEncomiendaSeleccionada(encomienda);
    setShowDetalleModal(true);
  };

  return (
    <div className={styles.dashboard}>
      <h1>Panel del Conductor de Minibús</h1>
      <p className={styles.welcome}>Bienvenido, {user?.nombre || 'Conductor'}</p>

      {/* Sección de disponibilidad */}
      <div className={styles.disponibilidadSection}>
        <h2>Estado del vehículo</h2>
        <div className={styles.disponibilidadCard}>
          <FaBus className={styles.busIcon} />
          <span className={styles.estadoTexto}>
            {disponible ? 'Disponible para viajar' : 'No disponible'}
          </span>
          <button
            className={`${styles.disponibilidadBtn} ${disponible ? styles.rojo : styles.verde}`}
            onClick={toggleDisponibilidad}
          >
            {disponible ? (
              <>
                <FaTimesCircle /> Marcar no disponible
              </>
            ) : (
              <>
                <FaCheckCircle /> Marcar disponible
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabla de encomiendas por entregar */}
      <div className={styles.encomiendasSection}>
        <h2>Encomiendas para entregar</h2>
        {encomiendas.length === 0 ? (
          <p className={styles.noData}>No hay encomiendas pendientes.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Remitente</th>
                  <th>Tel. Remitente</th>
                  <th>Destinatario</th>
                  <th>Tel. Destinatario</th>
                  <th>Destino</th>
                  <th>Contenido</th>
                  <th>Costo</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {encomiendas.map(e => (
                  <tr key={e.id}>
                    <td>{e.remitente}</td>
                    <td>{e.telefonoRemitente}</td>
                    <td>{e.destinatario}</td>
                    <td>{e.telefonoDestinatario}</td>
                    <td>{e.destino}</td>
                    <td>{e.contenido}</td>
                    <td>Bs. {e.costo}</td>
                    <td>{e.fecha}</td>
                    <td>{e.hora}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.detalleBtn}
                          onClick={() => handleVerDetalle(e)}
                          title="Ver detalle"
                        >
                          <FaInfoCircle /> Detalle
                        </button>
                        <button
                          className={styles.entregadoBtn}
                          onClick={() => handleEntregado(e.id)}
                        >
                          Entregado
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de detalle */}
      {showDetalleModal && encomiendaSeleccionada && (
        <DetalleEncomiendaModal
          encomienda={encomiendaSeleccionada}
          onClose={() => {
            setShowDetalleModal(false);
            setEncomiendaSeleccionada(null);
          }}
        />
      )}
    </div>
  );
}

export default ConductorMinibusDashboard;