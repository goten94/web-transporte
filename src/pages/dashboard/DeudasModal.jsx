import styles from './DeudasModal.module.css';

function DeudasModal({ afiliado, onClose }) {
  const deudas = afiliado.aportes.filter(ap => ap.estado === 'pendiente');

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Deudas de {afiliado.nombre}</h3>
        {deudas.length > 0 ? (
          <table className={styles.deudasTable}>
            <thead>
              <tr>
                <th>Mes</th>
                <th>Año</th>
                <th>Monto (Bs.)</th>
              </tr>
            </thead>
            <tbody>
              {deudas.map((deuda, idx) => (
                <tr key={idx}>
                  <td>{deuda.mes}</td>
                  <td>{deuda.año}</td>
                  <td>{deuda.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tiene deudas pendientes.</p>
        )}
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default DeudasModal;