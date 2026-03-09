import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Roles disponibles
export const ROLES = {
  ADMINISTRADOR: 'administrador',
  SECRETARIO: 'secretario',
  BOLETERO: 'boletero',
  TESORERO: 'tesorero',
  CONDUCTOR_MINIBUS: 'conductor_minibus',
  CONDUCTOR_VOLQUETA: 'conductor_volqueta',
  PASAJERO: 'pasajero',
};

// Usuarios simulados (esto vendría del backend)
const MOCK_USERS = [
  { id: 1, nombre: 'Admin', role: ROLES.ADMINISTRADOR, email: 'admin@smtvn.bo', password: 'admin123', usuario: 'admin' },
  { id: 2, nombre: 'Secretario', role: ROLES.SECRETARIO, email: 'secretario@smtvn.bo', password: 'secre123', usuario: 'secretario' },
  { id: 3, nombre: 'Boletero', role: ROLES.BOLETERO, email: 'boletero@smtvn.bo', password: 'bole123', usuario: 'boletero' },
  { id: 4, nombre: 'Tesorero', role: ROLES.TESORERO, email: 'tesorero@smtvn.bo', password: 'teso123', usuario: 'tesorero' },
  { id: 5, nombre: 'Conductor Minibús', role: ROLES.CONDUCTOR_MINIBUS, email: 'minibus@smtvn.bo', password: 'mini123', usuario: 'minibus' },
  { id: 6, nombre: 'Conductor Volqueta', role: ROLES.CONDUCTOR_VOLQUETA, email: 'volqueta@smtvn.bo', password: 'volq123', usuario: 'volqueta' },
  { id: 7, nombre: 'Pasajero', role: ROLES.PASAJERO, email: 'pasajero@smtvn.bo', password: 'pasa123', usuario: 'pasajero' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simular persistencia con localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('smtvn_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Función de login con usuario y contraseña
  const login = (username, password) => {
    // Buscar usuario por nombre de usuario (o email) y contraseña
    const foundUser = MOCK_USERS.find(u => u.usuario === username && u.password === password);
    if (foundUser) {
      // No guardamos la contraseña en localStorage por seguridad
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('smtvn_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Usuario o contraseña incorrectos' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smtvn_user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    hasRole: (role) => user?.role === role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}