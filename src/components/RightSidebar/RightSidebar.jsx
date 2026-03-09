import styles from './RightSidebar.module.css';

function RightSidebar() {
  const communities = [
    'Totorpampa', 'Tres Ríos', 'Cañuma', 'Equico', 'Totoral',
    'Santa Rosa', 'Lambate', 'Pariguaya', 'Taca', 'Quilambaya'
  ];

  return (
    <aside className={styles.sidebar}>
      <h3>Comunidades donde prestamos servicio</h3>
      <ul className={styles.communityList}>
        {communities.map((community, index) => (
          <li key={index}>{community}</li>
        ))}
      </ul>
    </aside>
  );
}

export default RightSidebar;