import styles from './HistorialEncomiendasModal.module.css';

function HistorialEncomiendasModal({ minibus, encomiendas, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Historial de Encomiendas - Minibús {minibus.placa}</h3>
        {encomiendas.length === 0 ? (
          <p>No hay encomiendas registradas para este minibús.</p>
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
                  <th>Costo</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody>
                {encomiendas.map((e, index) => (
                  <tr key={index}>
                    <td>{e.remitente}</td>
                    <td>{e.telefonoRemitente}</td>
                    <td>{e.destinatario}</td>
                    <td>{e.telefonoDestinatario}</td>
                    <td>{e.destino}</td>
                    <td>Bs. {e.costo}</td>
                    <td>{e.fecha}</td>
                    <td>{e.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default HistorialEncomiendasModal;