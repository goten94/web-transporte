import { useState } from 'react';
import styles from './TesoreroDashboard.module.css';
import PagoModal from './PagoModal';
import TicketPago from './TicketPago.jsx';

// Datos mock de afiliados propietarios (con deudas simuladas)
const initialAfiliados = [
  {
    id: 1,
    foto: 'https://randomuser.me/api/portraits/men/1.jpg',
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '78912345',
    vehiculo: {
      placa: 'ABC-123',
      marca: 'Toyota',
    },
    aportes: [
      { mes: 'Enero 2025', monto: 150, estado: 'pagado' },
      { mes: 'Febrero 2025', monto: 150, estado: 'pendiente' },
      { mes: 'Marzo 2025', monto: 150, estado: 'pendiente' },
    ],
  },
  {
    id: 2,
    foto: 'https://randomuser.me/api/portraits/men/2.jpg',
    nombre: 'Carlos López',
    email: 'carlos.lopez@example.com',
    telefono: '71234567',
    vehiculo: {
      placa: 'XYZ-789',
      marca: 'Volvo',
    },
    aportes: [
      { mes: 'Enero 2025', monto: 200, estado: 'pagado' },
      { mes: 'Febrero 2025', monto: 200, estado: 'pagado' },
      { mes: 'Marzo 2025', monto: 200, estado: 'pendiente' },
    ],
  },
];

function TesoreroDashboard() {
  const [afiliados, setAfiliados] = useState(initialAfiliados);
  const [searchTermAll, setSearchTermAll] = useState('');
  const [searchTermDeudores, setSearchTermDeudores] = useState('');
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [selectedAfiliado, setSelectedAfiliado] = useState(null);
  const [selectedMes, setSelectedMes] = useState(null); // mes a pagar
  const [showTicket, setShowTicket] = useState(false);
  const [pagoRealizado, setPagoRealizado] = useState(null); // datos del pago completado

  // Filtrar todos los afiliados
  const filteredAll = afiliados.filter(a =>
    a.nombre.toLowerCase().includes(searchTermAll.toLowerCase()) ||
    a.vehiculo.placa.toLowerCase().includes(searchTermAll.toLowerCase())
  );

  // Filtrar solo deudores (con al menos un aporte pendiente)
  const deudores = afiliados.filter(a =>
    a.aportes.some(ap => ap.estado === 'pendiente')
  );
  const filteredDeudores = deudores.filter(a =>
    a.nombre.toLowerCase().includes(searchTermDeudores.toLowerCase()) ||
    a.vehiculo.placa.toLowerCase().includes(searchTermDeudores.toLowerCase())
  );

  const handlePagarClick = (afiliado, mes) => {
    setSelectedAfiliado(afiliado);
    setSelectedMes(mes);
    setShowPagoModal(true);
  };

  const handlePagoSubmit = (datosPago) => {
    // Actualizar el estado del aporte a "pagado"
    setAfiliados(prev =>
      prev.map(a => {
        if (a.id === selectedAfiliado.id) {
          const nuevosAportes = a.aportes.map(ap =>
            ap.mes === selectedMes ? { ...ap, estado: 'pagado' } : ap
          );
          return { ...a, aportes: nuevosAportes };
        }
        return a;
      })
    );

    // Guardar datos del pago para el ticket
    setPagoRealizado({
      ...datosPago,
      afiliado: selectedAfiliado,
      mes: selectedMes,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
    });
    setShowPagoModal(false);
    setShowTicket(true);
  };

  const handleVerDeudas = (afiliado) => {
    const pendientes = afiliado.aportes.filter(ap => ap.estado === 'pendiente');
    alert(`Meses pendientes:\n${pendientes.map(p => `${p.mes} - Bs. ${p.monto}`).join('\n')}`);
  };

  return (
    <div className={styles.tesorero}>
      <h1>Panel del Tesorero</h1>

      <div className={styles.tablasContainer}>
        {/* Tabla 1: Todos los afiliados propietarios */}
        <div className={styles.tablaSection}>
          <h2>Todos los Afiliados</h2>
          <input
            type="text"
            placeholder="Buscar por nombre o placa..."
            value={searchTermAll}
            onChange={(e) => setSearchTermAll(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Vehículo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAll.map(afi => (
                  <tr key={afi.id}>
                    <td><img src={afi.foto} alt={afi.nombre} className={styles.foto} /></td>
                    <td>{afi.nombre}</td>
                    <td>{afi.telefono}</td>
                    <td>{afi.vehiculo.marca} - {afi.vehiculo.placa}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        {afi.aportes
                          .filter(ap => ap.estado === 'pendiente')
                          .map(ap => (
                            <button
                              key={ap.mes}
                              className={styles.pagarBtn}
                              onClick={() => handlePagarClick(afi, ap.mes)}
                            >
                              Pagar {ap.mes}
                            </button>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla 2: Afiliados deudores */}
        <div className={styles.tablaSection}>
          <h2>Afiliados Deudores</h2>
          <input
            type="text"
            placeholder="Buscar deudor..."
            value={searchTermDeudores}
            onChange={(e) => setSearchTermDeudores(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Vehículo</th>
                  <th>Meses Adeudados</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeudores.map(afi => (
                  <tr key={afi.id}>
                    <td><img src={afi.foto} alt={afi.nombre} className={styles.foto} /></td>
                    <td>{afi.nombre}</td>
                    <td>{afi.vehiculo.marca} - {afi.vehiculo.placa}</td>
                    <td>
                      {afi.aportes.filter(ap => ap.estado === 'pendiente').map(ap => ap.mes).join(', ')}
                    </td>
                    <td>
                      <button
                        className={styles.verBtn}
                        onClick={() => handleVerDeudas(afi)}
                      >
                        Ver Deudas
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de pago */}
      {showPagoModal && selectedAfiliado && selectedMes && (
        <PagoModal
          afiliado={selectedAfiliado}
          mes={selectedMes}
          onClose={() => setShowPagoModal(false)}
          onPagar={handlePagoSubmit}
        />
      )}

      {/* Modal de ticket de pago */}
      {showTicket && pagoRealizado && (
        <TicketPago
          pago={pagoRealizado}
          onCerrar={() => {
            setShowTicket(false);
            setPagoRealizado(null);
          }}
        />
      )}
    </div>
  );
}

export default TesoreroDashboard;