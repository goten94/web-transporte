import styles from './BoleteroAsientos.module.css';

function BoleteroAsientos({ minibus, onAsientoClick }) {
  const asientos = minibus.asientos;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {asientos.map((fila, i) => (
          <div key={i} className={styles.fila}>
            {fila.map((asiento, j) => {
              const esConductor = (i === 0 && j === 0);
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
                  {esConductor ? 'C' : `${i+1}-${j+1}`}
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