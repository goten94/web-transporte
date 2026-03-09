import styles from './Noticias.module.css';

function Noticias() {
  return (
    <div className={styles.noticias}>
      <h1>Noticias y Comunicados</h1>
      <div className={styles.newsGrid}>
        <article className={styles.newsItem}>
          <h3>Comunicado importante sobre el paro nacional</h3>
          <p className={styles.date}>15 de marzo, 2025</p>
          <p>Se informa a todos los afiliados que el próximo lunes habrá una reunión en la sede central...</p>
        </article>
        <article className={styles.newsItem}>
          <h3>Nuevos horarios de atención en Ex Tranca</h3>
          <p className={styles.date}>10 de marzo, 2025</p>
          <p>A partir del 1 de abril, la sede de Ex Tranca ampliará su horario hasta las 8:00 pm...</p>
        </article>
        <article className={styles.newsItem}>
          <h3>Convocatoria a asamblea extraordinaria</h3>
          <p className={styles.date}>5 de marzo, 2025</p>
          <p>Se cita a todos los delegados a la asamblea del 20 de marzo para tratar temas de estatutos...</p>
        </article>
      </div>
    </div>
  );
}

export default Noticias;