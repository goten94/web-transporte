import styles from './OpcionesAsientoModal.module.css';

function OpcionesAsientoModal({ minibus, fila, columna, onClose, onEditar, onCancelar }) {
  const asiento = minibus.asientos[fila][columna];
  const pasajero = asiento.pasajero;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Asiento {fila+1}-{columna+1}</h3>
        <p><strong>Minibús:</strong> {minibus.placa}</p>
        <p><strong>Destino:</strong> {asiento.destino}</p>
        <p><strong>Pasajero:</strong> {pasajero?.nombre}</p>
        <p><strong>Documento:</strong> {pasajero?.documento}</p>
        <p><strong>Costo:</strong> Bs. {asiento.costo}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.editBtn} onClick={onEditar}>Editar pasajero</button>
          <button className={styles.cancelBtn} onClick={onCancelar}>Cancelar venta</button>
          <button className={styles.closeBtn} onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default OpcionesAsientoModal;