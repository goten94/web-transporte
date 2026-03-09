import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Componente para proteger rutas según autenticación y rol.
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componente a renderizar si está autorizado.
 * @param {Array|string} [props.allowedRoles] - Rol(es) permitido(s) para acceder.
 * @returns {React.ReactElement} - Redirige a login si no autenticado, o a home si no tiene rol.
 */
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O un spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles, verificar que el usuario tenga uno permitido
  if (allowedRoles) {
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    if (!user || !rolesArray.includes(user.role)) {
      // Redirigir a la página principal si no tiene permisos
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;