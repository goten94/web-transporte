import styles from './BoleteroAsientos.module.css';

function BoleteroAsientos({ minibus, onAsientoClick }) {
  const asientos = minibus.asientos;
  let numeroAsiento = 1; // Contador para numerar del 1 al 14

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {asientos.map((fila, i) => (
          <div key={i} className={styles.fila}>
            {fila.map((asiento, j) => {
              const esConductor = (i === 0 && j === 0);
              // Asignar número solo si no es conductor
              const numero = esConductor ? null : numeroAsiento++;
              return (
                <div
                  key={`${i}-${j}`}
                  className={`${styles.asiento} ${styles[asiento.estado]}`}
                  onClick={() => {
                    if (!esConductor) {
                      onAsientoClick(minibus.id, i, j);
                    }
                  }}
                >
                  {esConductor ? 'C' : numero}
                  {asiento.estado === 'vendido' && ' (V)'}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoleteroAsientos;