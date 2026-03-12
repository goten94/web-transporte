import { useState } from 'react';
import styles from './PagoModal.module.css';

function PagoModal({ afiliado, mes, onClose, onPagar }) {
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString().slice(0,5),
    monto: '',
    depositante: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPagar(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Registrar Pago</h3>
        <p><strong>Afiliado:</strong> {afiliado.nombre}</p>
        <p><strong>Vehículo:</strong> {afiliado.vehiculo.marca} - {afiliado.vehiculo.placa}</p>
        <p><strong>Mes a pagar:</strong> {mes}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Hora</label>
            <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Monto (Bs.)</label>
            <input type="number" name="monto" value={formData.monto} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Nombre del depositante</label>
            <input type="text" name="depositante" value={formData.depositante} onChange={handleChange} required />
          </div>
          <div className={styles.modalActions}>
            <button type="submit">Registrar y Facturar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PagoModal;