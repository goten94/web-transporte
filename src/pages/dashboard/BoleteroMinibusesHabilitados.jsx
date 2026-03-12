import styles from './BoleteroMinibusesHabilitados.module.css';

function BoleteroMinibusesHabilitados({ minibuses, onSeleccionar, onPartir, onEncomienda, selectedId }) {
  return (
    <div className={styles.container}>
      {minibuses.length === 0 ? (
        <p>No hay minibuses habilitados</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Conductor</th>
              <th>Destino</th>
              <th>Hora</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {minibuses.map(m => (
              <tr key={m.id} className={selectedId === m.id ? styles.selectedRow : ''}>
                <td>{m.placa}</td>
                <td>{m.conductor}</td>
                <td>{m.destino}</td>
                <td>{m.hora}</td>
                <td>{m.fecha}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.selectBtn} onClick={() => onSeleccionar(m)}>
                      Ver asientos
                    </button>
                    <button className={styles.partirBtn} onClick={() => onPartir(m)}>
                      PARTIR
                    </button>
                    <button className={styles.encomiendaBtn} onClick={() => onEncomienda(m)}>
                      Encomienda
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

export default BoleteroMinibusesHabilitados;