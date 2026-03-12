import styles from './DetalleEncomiendaModal.module.css';

function DetalleEncomiendaModal({ encomienda, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Detalle de la Encomienda</h3>
        <p><strong>Remitente:</strong> {encomienda.remitente}</p>
        <p><strong>Teléfono remitente:</strong> {encomienda.telefonoRemitente}</p>
        <p><strong>Destinatario:</strong> {encomienda.destinatario}</p>
        <p><strong>Teléfono destinatario:</strong> {encomienda.telefonoDestinatario}</p>
        <p><strong>Destino:</strong> {encomienda.destino}</p>
        <p><strong>Contenido:</strong> {encomienda.contenido}</p>
        <p><strong>Costo:</strong> Bs. {encomienda.costo}</p>
        <p><strong>Fecha de envío:</strong> {encomienda.fecha}</p>
        <p><strong>Hora de envío:</strong> {encomienda.hora}</p>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default DetalleEncomiendaModal;