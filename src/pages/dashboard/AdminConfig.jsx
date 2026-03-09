import { useState } from 'react';
import styles from './AdminConfig.module.css';

function AdminConfig() {
  const [directiva, setDirectiva] = useState('Secretario General: Juan Pérez, Secretario de Actas: María Gómez, Tesorero: Carlos López');
  const [beneficios, setBeneficios] = useState('Asesoría legal gratuita, Descuentos en cursos de formación, Seguro de accidentes, Bolsa de trabajo');
  const [requisitos, setRequisitos] = useState('Ser transportista activo, Presentar fotocopia de CI, Licencia de conducir vigente, Pagar cuota de afiliación (Bs. 100)');
  const [comunicados, setComunicados] = useState('Próxima asamblea: 20 de abril a las 10:00 am en sede Boquerón. Nuevos horarios de atención: 8:00 am a 6:00 pm.');

  const handleUpdate = (tipo) => {
    alert(`Contenido de ${tipo} actualizado (simulado)`);
    // Aquí iría la llamada a API
  };

  return (
    <div className={styles.configSection}>
      <h2>Configuración de contenido público</h2>
      <div className={styles.configGrid}>
        <div className={styles.configCard}>
          <h3>Directiva</h3>
          <textarea
            rows="4"
            value={directiva}
            onChange={(e) => setDirectiva(e.target.value)}
            className={styles.textarea}
          />
          <button onClick={() => handleUpdate('Directiva')} className={styles.updateBtn}>Actualizar</button>
        </div>
        <div className={styles.configCard}>
          <h3>Beneficios</h3>
          <textarea
            rows="4"
            value={beneficios}
            onChange={(e) => setBeneficios(e.target.value)}
            className={styles.textarea}
          />
          <button onClick={() => handleUpdate('Beneficios')} className={styles.updateBtn}>Actualizar</button>
        </div>
        <div className={styles.configCard}>
          <h3>Requisitos</h3>
          <textarea
            rows="4"
            value={requisitos}
            onChange={(e) => setRequisitos(e.target.value)}
            className={styles.textarea}
          />
          <button onClick={() => handleUpdate('Requisitos')} className={styles.updateBtn}>Actualizar</button>
        </div>
        <div className={styles.configCard}>
          <h3>Comunicados</h3>
          <textarea
            rows="4"
            value={comunicados}
            onChange={(e) => setComunicados(e.target.value)}
            className={styles.textarea}
          />
          <button onClick={() => handleUpdate('Comunicados')} className={styles.updateBtn}>Actualizar</button>
        </div>
      </div>
    </div>
  );
}

export default AdminConfig;