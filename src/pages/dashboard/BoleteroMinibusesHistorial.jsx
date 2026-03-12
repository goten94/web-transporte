import styles from './BoleteroMinibusesHistorial.module.css';

function BoleteroMinibusesHistorial({ partidos, onSeleccionar, onVerEncomiendas, selectedId }) {
  return (
    <div className={styles.container}>
      <h3>Minibuses que Partieron</h3>
      {partidos.length === 0 ? (
        <p>No hay minibuses en el historial</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Conductor</th>
              <th>Destino</th>
              <th>Hora Partida</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {partidos.map(m => (
              <tr key={m.id} className={selectedId === m.id ? styles.selectedRow : ''}>
                <td>{m.placa}</td>
                <td>{m.conductor}</td>
                <td>{m.destino}</td>
                <td>{m.horaPartida}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.selectBtn} onClick={() => onSeleccionar(m)}>
                      Ver pasajeros
                    </button>
                    <button className={styles.encomiendaBtn} onClick={() => onVerEncomiendas(m)}>
                      Ver encomiendas
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BoleteroMinibusesHistorial;