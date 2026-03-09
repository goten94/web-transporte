import styles from './BoleteroMinibusesDisponibles.module.css';

function BoleteroMinibusesDisponibles({ minibuses, onSeleccionar }) {
  return (
    <div className={styles.container}>
      {minibuses.length === 0 ? (
        <p>No hay minibuses disponibles</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Capacidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {minibuses.map(m => (
              <tr key={m.id}>
                <td>{m.placa}</td>
                <td>{m.modelo}</td>
                <td>{m.capacidad}</td>
                <td>
                  <button className={styles.selectBtn} onClick={() => onSeleccionar(m)}>
                    Habilitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BoleteroMinibusesDisponibles;