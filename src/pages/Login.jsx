import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      // Redirigir según el rol del usuario
      switch (result.user.role) {
        case 'administrador': navigate('/admin'); break;
        case 'secretario': navigate('/secretario'); break;
        case 'boletero': navigate('/boletero'); break;
        case 'tesorero': navigate('/tesorero'); break;
        case 'conductor_minibus': navigate('/conductor/minibus'); break;
        case 'conductor_volqueta': navigate('/conductor/volqueta'); break;
        case 'pasajero': navigate('/pasajero'); break;
        default: navigate('/');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="ej. admin, secretario, etc."
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className="btn">Ingresar</button>
        </form>
        <p className={styles.registerLink}>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;