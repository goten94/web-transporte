import { useState } from 'react';
import styles from './EncomiendaModal.module.css';

function EncomiendaModal({ minibus, onClose, onGuardar }) {
  const [formData, setFormData] = useState({
    remitente: '',
    telefonoRemitente: '',
    destinatario: '',
    telefonoDestinatario: '',
    destino: minibus.destino,
    descripcion: '', // <-- nuevo campo
    costo: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...formData, minibusId: minibus.id, minibusPlaca: minibus.placa });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Registrar Encomienda - Minibús {minibus.placa}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Remitente</label>
            <input type="text" name="remitente" value={formData.remitente} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Teléfono Remitente</label>
            <input type="text" name="telefonoRemitente" value={formData.telefonoRemitente} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Destinatario</label>
            <input type="text" name="destinatario" value={formData.destinatario} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Teléfono Destinatario</label>
            <input type="text" name="telefonoDestinatario" value={formData.telefonoDestinatario} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Destino</label>
            <input type="text" name="destino" value={formData.destino} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Descripción del contenido</label>
            <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Ej. Caja de dinero, documentos, etc." required />
          </div>
          <div className={styles.formGroup}>
            <label>Costo (Bs.)</label>
            <input type="number" name="costo" value={formData.costo} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Hora</label>
            <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
          </div>
          <div className={styles.modalActions}>
            <button type="submit">Guardar y Facturar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EncomiendaModal;