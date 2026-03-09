function OpcionesAsientoModal({ minibus, fila, columna, onClose, onEditar, onCancelar }) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h3>Opciones del Asiento {fila+1}-{columna+1}</h3>
          <p>Minibús: {minibus.placa}</p>
          <div className={styles.buttonGroup}>
            <button onClick={() => { onEditar(fila, columna); onClose(); }}>Editar pasajero</button>
            <button onClick={() => { onCancelar(minibus.id, fila, columna); onClose(); }} className={styles.cancelarBtn}>Cancelar venta</button>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    );
  }