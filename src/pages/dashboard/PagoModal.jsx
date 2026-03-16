import { useState, useEffect } from 'react';
import styles from './PagoModal.module.css';

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function PagoModal({ afiliado, onClose, onPagar }) {
  const [formData, setFormData] = useState({
    mes: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString().slice(0,5),
    monto: '',
    depositante: '',
  });

  // Cuando cambia el mes, buscar si hay un aporte para ese mes y actualizar el monto
  useEffect(() => {
    if (formData.mes) {
      const aporte = afiliado.aportes?.find(ap => ap.mes === formData.mes);
      if (aporte && aporte.estado === 'pendiente') {
        setFormData(prev => ({ ...prev, monto: aporte.monto }));
      } else {
        // Si no hay aporte pendiente, dejar el monto vacío (o podrías poner un mensaje)
        setFormData(prev => ({ ...prev, monto: '' }));
      }
    }
  }, [formData.mes, afiliado.aportes]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPagar({
      ...formData,
      afiliadoId: afiliado.id,
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Registrar Pago</h3>
        <p><strong>Afiliado:</strong> {afiliado.nombre}</p>
        <p><strong>Vehículo:</strong> {afiliado.vehiculo?.marca} - {afiliado.vehiculo?.placa}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Mes a pagar</label>
            <select name="mes" value={formData.mes} onChange={handleChange} required>
              <option value="">Seleccione un mes</option>
              {meses.map(mes => (
                <option key={mes} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Monto (Bs.)</label>
            <input type="number" name="monto" value={formData.monto} onChange={handleChange} required />
          </div>
          {/* resto de campos: fecha, hora, depositante */}
          <div className={styles.formGroup}>
            <label>Fecha</label>
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Hora</label>
            <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
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