import { FaFileAlt, FaGavel, FaChalkboardTeacher, FaBriefcase, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import styles from './LeftSidebar.module.css';

function LeftSidebar() {
  const tools = [
    { icon: <FaFileAlt />, label: 'Mis documentos', link: '#' },
    { icon: <FaGavel />, label: 'Asesoría jurídica', link: '#' },
    { icon: <FaChalkboardTeacher />, label: 'Formación sindical', link: '#' },
    { icon: <FaBriefcase />, label: 'Bolsa de trabajo', link: '#' },
    { icon: <FaCalendarAlt />, label: 'Calendario de asambleas', link: '#' },
    { icon: <FaUsers />, label: 'Directorio de delegados', link: '#' },
  ];

  return (
    <aside className={styles.sidebar}>
      <h3>Herramientas del afiliado</h3>
      <ul className={styles.toolList}>
        {tools.map((tool, index) => (
          <li key={index}>
            <a href={tool.link} className={styles.toolLink}>
              <span className={styles.icon}>{tool.icon}</span>
              <span>{tool.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default LeftSidebar;