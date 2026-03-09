import { FaCheck, FaTimes } from 'react-icons/fa';
import styles from './AdminSolicitudes.module.css';

function AdminSolicitudes({ solicitudes, onApprove, onReject }) {
  if (solicitudes.length === 0) {
    return null; // No mostrar la sección si no hay solicitudes
  }

  return (
    <section className={styles.solicitudesSection}>
      <h2>Solicitudes de Nuevos Socios (Pendientes de Aprobación)</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>Marca Veh.</th>
              <th>Tipo Veh.</th>
              <th>Placa</th>
              <th>Ruat</th>
              <th>Foto Veh.</th>
              <th>Fecha Solicitud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map(sol => (
              <tr key={sol.id}>
                <td className={styles.fotoCell}>
                  <img src={sol.foto} alt={sol.nombre} className={styles.foto} />
                </td>
                <td>{sol.nombre}</td>
                <td>{sol.telefono}</td>
                <td>{sol.tipo === 'propietario' ? 'Propietario' : 'Asalariado'}</td>
                <td>{sol.vehiculo.marca}</td>
                <td>{sol.vehiculo.tipo}</td>
                <td>{sol.vehiculo.placa}</td>
                <td>{sol.vehiculo.ruat}</td>
                <td>
                  <img src={sol.vehiculo.foto} alt="vehículo" className={styles.vehiculoFoto} />
                </td>
                <td>{new Date(sol.fechaSolicitud).toLocaleDateString()}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.actionBtn} ${styles.approveBtn}`} onClick={() => onApprove(sol)} title="Aprobar">
                      <FaCheck />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.rejectBtn}`} onClick={() => onReject(sol.id)} title="Rechazar">
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminSolicitudes;