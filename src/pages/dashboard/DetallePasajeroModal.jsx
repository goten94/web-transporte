import styles from './DetallePasajeroModal.module.css';

function DetallePasajeroModal({ minibus, fila, columna, asiento, onClose }) {
  const pasajero = asiento.pasajero;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Información del Pasajero</h3>
        <p><strong>Minibús:</strong> {minibus.placa}</p>
        <p><strong>Asiento:</strong> {fila+1}-{columna+1}</p>
        <p><strong>Nombre:</strong> {pasajero?.nombre}</p>
        <p><strong>Documento:</strong> {pasajero?.documento}</p>
        <p><strong>Destino:</strong> {asiento.destino}</p>
        <p><strong>Costo:</strong> Bs. {asiento.costo}</p>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default DetallePasajeroModal;