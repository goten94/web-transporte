import { useState } from 'react';
import styles from './PagarModal.module.css';

function PagarModal({ afiliado, onClose, onPagar }) {
  // Obtener los meses pendientes del afiliado
  const mesesPendientes = afiliado.aportes
    .filter(ap => ap.estado === 'pendiente')
    .map(ap => ({ mes: ap.mes, año: ap.año, monto: ap.monto }));

  const [selectedMes, setSelectedMes] = useState(mesesPendientes.length > 0 ? mesesPendientes[0] : null);
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMes) {
      onPagar(afiliado.id, selectedMes.mes, selectedMes.año, fechaPago);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Registrar Pago - {afiliado.nombre}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Seleccionar mes a pagar:</label>
            <select
              value={selectedMes ? `${selectedMes.mes} ${selectedMes.año}` : ''}
              onChange={(e) => {
                const [mes, año] = e.target.value.split(' ');
                const encontrado = mesesPendientes.find(m => m.mes === mes && m.año === parseInt(año));
                setSelectedMes(encontrado);
              }}
              required
            >
              <option value="">-- Seleccione --</option>
              {mesesPendientes.map((mp, idx) => (
                <option key={idx} value={`${mp.mes} ${mp.año}`}>
                  {mp.mes} {mp.año} - Bs. {mp.monto}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Fecha de pago:</label>
            <input
              type="date"
              value={fechaPago}
              onChange={(e) => setFechaPago(e.target.value)}
              required
            />
          </div>
          <div className={styles.modalActions}>
            <button type="submit">Registrar Pago</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PagarModal;