import { useState } from 'react';
import styles from './VenderAsientoModal.module.css';

function VenderAsientoModal({ minibus, fila, columna, onClose, onVender }) {
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    costo: '',
    destino: minibus.destino, // por defecto el destino del viaje
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVender({
      minibusId: minibus.id,
      fila,
      columna,
      pasajero: { nombre: formData.nombre, documento: formData.documento },
      costo: formData.costo,
      destino: formData.destino,
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Vender Asiento {fila+1}-{columna+1}</h3>
        <p>Minibús: {minibus.placa} - {minibus.destino}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre del pasajero</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Documento</label>
            <input type="text" name="documento" value={formData.documento} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Costo del pasaje (Bs.)</label>
            <input type="number" name="costo" value={formData.costo} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Destino</label>
            <input type="text" name="destino" value={formData.destino} onChange={handleChange} required />
          </div>
          <div className={styles.modalActions}>
            <button type="submit">Vender</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VenderAsientoModal;