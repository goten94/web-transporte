import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import PrivateLayout from './layouts/PrivateLayout';

// Páginas públicas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Noticias from './pages/Noticias';
import Sindicato from './pages/Sindicato';
import Afiliacion from './pages/Afiliacion';
import Servicios from './pages/Servicios';
import AcercaDe from './pages/AcercaDe';

// Dashboards por rol
import AdminDashboard from './pages/dashboard/AdminDashboard';
import SecretarioDashboard from './pages/dashboard/SecretarioDashboard';
import BoleteroDashboard from './pages/dashboard/BoleteroDashboard';
import TesoreroDashboard from './pages/dashboard/TesoreroDashboard';
import ConductorMinibusDashboard from './pages/dashboard/ConductorMinibusDashboard';
import ConductorVolquetaDashboard from './pages/dashboard/ConductorVolquetaDashboard';
import PasajeroDashboard from './pages/dashboard/PasajeroDashboard';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ===== RUTAS PÚBLICAS (con layout público) ===== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/sindicato/*" element={<Sindicato />} />
          <Route path="/afiliacion/*" element={<Afiliacion />} />
          <Route path="/servicios/*" element={<Servicios />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          {/* Incluimos login y register dentro del layout público */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ===== RUTAS PRIVADAS (con layout privado) ===== */}
        <Route element={<PrivateLayout />}>
          {/* Administrador */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['administrador']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Secretario */}
          <Route path="/secretario/*" element={
            <ProtectedRoute allowedRoles={['secretario']}>
              <SecretarioDashboard />
            </ProtectedRoute>
          } />

          {/* Boletero */}
          <Route path="/boletero/*" element={
            <ProtectedRoute allowedRoles={['boletero']}>
              <BoleteroDashboard />
            </ProtectedRoute>
          } />

          {/* Tesorero */}
          <Route path="/tesorero/*" element={
            <ProtectedRoute allowedRoles={['tesorero']}>
              <TesoreroDashboard />
            </ProtectedRoute>
          } />

          {/* Conductor de Minibús */}
          <Route path="/conductor/minibus/*" element={
            <ProtectedRoute allowedRoles={['conductor_minibus']}>
              <ConductorMinibusDashboard />
            </ProtectedRoute>
          } />

          {/* Conductor de Volqueta */}
          <Route path="/conductor/volqueta/*" element={
            <ProtectedRoute allowedRoles={['conductor_volqueta']}>
              <ConductorVolquetaDashboard />
            </ProtectedRoute>
          } />

          {/* Pasajero */}
          <Route path="/pasajero/*" element={
            <ProtectedRoute allowedRoles={['pasajero']}>
              <PasajeroDashboard />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;