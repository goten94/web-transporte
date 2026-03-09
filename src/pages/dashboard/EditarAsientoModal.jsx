import { useState } from 'react';
import styles from './EditarAsientoModal.module.css';

function EditarAsientoModal({ minibus, fila, columna, onClose, onEditar }) {
  const asientoActual = minibus.asientos[fila][columna];
  const [formData, setFormData] = useState({
    nombre: asientoActual.pasajero?.nombre || '',
    documento: asientoActual.pasajero?.documento || '',
    costo: asientoActual.costo || '',
    destino: asientoActual.destino || minibus.destino,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditar({
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
        <h3>Editar Asiento {fila+1}-{columna+1}</h3>
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
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarAsientoModal;