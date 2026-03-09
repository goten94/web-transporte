import { useState } from 'react';
import { FaSearch, FaMoneyBillWave, FaExclamationTriangle } from 'react-icons/fa';
import PagarModal from './PagarModal';
import DeudasModal from './DeudasModal';
import styles from './TesoreroDashboard.module.css';

// Datos mock de afiliados propietarios (solo propietarios)
const initialAfiliados = [
  {
    id: 1,
    foto: 'https://randomuser.me/api/portraits/men/1.jpg',
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '78912345',
    tipo: 'propietario',
    vehiculo: { placa: 'ABC-123', marca: 'Toyota' },
    aportes: [
      { mes: 'Enero', año: 2025, monto: 150, estado: 'pagado' },
      { mes: 'Febrero', año: 2025, monto: 150, estado: 'pendiente' },
      { mes: 'Marzo', año: 2025, monto: 150, estado: 'pendiente' },
    ],
  },
  {
    id: 2,
    foto: 'https://randomuser.me/api/portraits/women/2.jpg',
    nombre: 'María Gómez',
    email: 'maria.gomez@example.com',
    telefono: '71234567',
    tipo: 'propietario',
    vehiculo: { placa: 'XYZ-789', marca: 'Volvo' },
    aportes: [
      { mes: 'Enero', año: 2025, monto: 200, estado: 'pagado' },
      { mes: 'Febrero', año: 2025, monto: 200, estado: 'pagado' },
      { mes: 'Marzo', año: 2025, monto: 200, estado: 'pagado' },
    ],
  },
  {
    id: 3,
    foto: 'https://randomuser.me/api/portraits/men/3.jpg',
    nombre: 'Carlos López',
    email: 'carlos.lopez@example.com',
    telefono: '69876543',
    tipo: 'propietario',
    vehiculo: { placa: 'LMN-456', marca: 'Mercedes' },
    aportes: [
      { mes: 'Enero', año: 2025, monto: 180, estado: 'pendiente' },
      { mes: 'Febrero', año: 2025, monto: 180, estado: 'pendiente' },
      { mes: 'Marzo', año: 2025, monto: 180, estado: 'pendiente' },
    ],
  },
];

function TesoreroDashboard() {
  const [afiliados, setAfiliados] = useState(initialAfiliados);
  const [searchTerm1, setSearchTerm1] = useState(''); // búsqueda para tabla 1
  const [searchTerm2, setSearchTerm2] = useState(''); // búsqueda para tabla 2
  const [showPagarModal, setShowPagarModal] = useState(false);
  const [selectedAfiliado, setSelectedAfiliado] = useState(null);
  const [showDeudasModal, setShowDeudasModal] = useState(false);

  // Filtrar afiliados para tabla 1 (todos los propietarios) según búsqueda
  const filteredAfiliados = afiliados.filter(afi => {
    const term = searchTerm1.toLowerCase();
    return (
      afi.nombre.toLowerCase().includes(term) ||
      afi.email.toLowerCase().includes(term) ||
      afi.vehiculo.placa.toLowerCase().includes(term)
    );
  });

  // Filtrar deudores (al menos un aporte pendiente) y luego aplicar búsqueda
  const deudores = afiliados.filter(afi =>
    afi.aportes.some(a => a.estado === 'pendiente')
  );
  const filteredDeudores = deudores.filter(afi => {
    const term = searchTerm2.toLowerCase();
    return (
      afi.nombre.toLowerCase().includes(term) ||
      afi.email.toLowerCase().includes(term) ||
      afi.vehiculo.placa.toLowerCase().includes(term)
    );
  });

  // Función para manejar el pago
  const handlePagar = (afiliadoId, mes, año, fechaPago) => {
    setAfiliados(prev =>
      prev.map(afi => {
        if (afi.id === afiliadoId) {
          const nuevosAportes = afi.aportes.map(ap => {
            if (ap.mes === mes && ap.año === año && ap.estado === 'pendiente') {
              return { ...ap, estado: 'pagado', fechaPago };
            }
            return ap;
          });
          return { ...afi, aportes: nuevosAportes };
        }
        return afi;
      })
    );
    setShowPagarModal(false);
    setSelectedAfiliado(null);
  };

  // Abrir modal de pago
  const openPagarModal = (afiliado) => {
    setSelectedAfiliado(afiliado);
    setShowPagarModal(true);
  };

  // Abrir modal de deudas
  const openDeudasModal = (afiliado) => {
    setSelectedAfiliado(afiliado);
    setShowDeudasModal(true);
  };

  return (
    <div className={styles.dashboard}>
      <h1>Panel del Tesorero</h1>

      {/* Primera tabla: Todos los afiliados propietarios */}
      <section className={styles.section}>
        <div className={styles.headerActions}>
          <h2>Todos los Afiliados Propietarios</h2>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por nombre, email o placa..."
              value={searchTerm1}
              onChange={(e) => setSearchTerm1(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Vehículo</th>
                <th>Placa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAfiliados.length > 0 ? (
                filteredAfiliados.map(afi => (
                  <tr key={afi.id}>
                    <td className={styles.fotoCell}>
                      <img src={afi.foto} alt={afi.nombre} className={styles.foto} />
                    </td>
                    <td>{afi.nombre}</td>
                    <td>{afi.email}</td>
                    <td>{afi.telefono}</td>
                    <td>{afi.vehiculo.marca}</td>
                    <td>{afi.vehiculo.placa}</td>
                    <td>
                      <button
                        className={styles.pagarBtn}
                        onClick={() => openPagarModal(afi)}
                        title="Registrar pago"
                      >
                        <FaMoneyBillWave /> Pagar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.noData}>No se encontraron afiliados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Segunda tabla: Deudores */}
      <section className={styles.section}>
        <div className={styles.headerActions}>
          <h2>Afiliados con Deudas</h2>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar deudor..."
              value={searchTerm2}
              onChange={(e) => setSearchTerm2(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Vehículo</th>
                <th>Placa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeudores.length > 0 ? (
                filteredDeudores.map(afi => (
                  <tr key={afi.id}>
                    <td className={styles.fotoCell}>
                      <img src={afi.foto} alt={afi.nombre} className={styles.foto} />
                    </td>
                    <td>{afi.nombre}</td>
                    <td>{afi.email}</td>
                    <td>{afi.telefono}</td>
                    <td>{afi.vehiculo.marca}</td>
                    <td>{afi.vehiculo.placa}</td>
                    <td>
                      <button
                        className={styles.deudasBtn}
                        onClick={() => openDeudasModal(afi)}
                        title="Ver deudas"
                      >
                        <FaExclamationTriangle /> Ver deudas
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.noData}>No hay deudores</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal para pagar */}
      {showPagarModal && selectedAfiliado && (
        <PagarModal
          afiliado={selectedAfiliado}
          onClose={() => {
            setShowPagarModal(false);
            setSelectedAfiliado(null);
          }}
          onPagar={handlePagar}
        />
      )}

      {/* Modal para ver deudas */}
      {showDeudasModal && selectedAfiliado && (
        <DeudasModal
          afiliado={selectedAfiliado}
          onClose={() => {
            setShowDeudasModal(false);
            setSelectedAfiliado(null);
          }}
        />
      )}
    </div>
  );
}

export default TesoreroDashboard;