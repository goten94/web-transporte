import { useState } from 'react';
import styles from './HabilitarMinibusModal.module.css';

function HabilitarMinibusModal({ minibus, onClose, onHabilitar }) {
  const [formData, setFormData] = useState({
    conductor: '',
    destino: '',
    hora: '',
    fecha: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onHabilitar(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Habilitar Minibús - {minibus.placa}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre del conductor</label>
            <input type="text" name="conductor" value={formData.conductor} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Destino</label>
            <input type="text" name="destino" value={formData.destino} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Hora</label>
            <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>
          <div className={styles.modalActions}>
            <button type="submit">Habilitar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HabilitarMinibusModal;