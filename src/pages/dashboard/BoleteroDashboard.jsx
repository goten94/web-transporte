import { useState } from 'react';
import BoleteroMinibusesDisponibles from './BoleteroMinibusesDisponibles';
import BoleteroMinibusesHabilitados from './BoleteroMinibusesHabilitados';
import BoleteroMinibusesHistorial from './BoleteroMinibusesHistorial';
import BoleteroAsientos from './BoleteroAsientos';
import HabilitarMinibusModal from './HabilitarMinibusModal';
import VenderAsientoModal from './VenderAsientoModal';
import EditarAsientoModal from './EditarAsientoModal';
import OpcionesAsientoModal from './OpcionesAsientoModal';
import DetallePasajeroModal from './DetallePasajeroModal';
import EncomiendaModal from './EncomiendaModal';
import TicketEncomienda from './TicketEncomienda';
import TicketFactura from './TicketFactura';
import HistorialEncomiendasModal from './HistorialEncomiendasModal'; // Nuevo
import styles from './BoleteroDashboard.module.css';

// Datos iniciales de minibuses disponibles
const minibusesIniciales = [
  { id: 1, placa: 'ABC-123', modelo: 'Toyota Hiace', capacidad: 15 },
  { id: 2, placa: 'XYZ-789', modelo: 'Mercedes Sprinter', capacidad: 15 },
  { id: 3, placa: 'LMN-456', modelo: 'Nissan Urvan', capacidad: 15 },
];

function BoleteroDashboard() {
  const [disponibles, setDisponibles] = useState(minibusesIniciales);
  const [habilitados, setHabilitados] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [selectedMinibus, setSelectedMinibus] = useState(null);
  const [isHistorialMode, setIsHistorialMode] = useState(false);
  const [showHabilitarModal, setShowHabilitarModal] = useState(false);
  const [minibusToHabilitar, setMinibusToHabilitar] = useState(null);
  const [showVentaModal, setShowVentaModal] = useState(false);
  const [asientoToSell, setAsientoToSell] = useState(null);
  const [showOpcionesModal, setShowOpcionesModal] = useState(false);
  const [asientoToEdit, setAsientoToEdit] = useState(null);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [asientoDetalle, setAsientoDetalle] = useState(null);
  const [showEncomiendaModal, setShowEncomiendaModal] = useState(false);
  const [minibusEncomienda, setMinibusEncomienda] = useState(null);
  const [showTicketEncomienda, setShowTicketEncomienda] = useState(false);
  const [encomiendaActual, setEncomiendaActual] = useState(null);
  const [showTicket, setShowTicket] = useState(false);
const [ventaActual, setVentaActual] = useState(null);

  
  // Nuevo estado para almacenar todas las encomiendas
  const [encomiendas, setEncomiendas] = useState([]);
  // Nuevo estado para el modal de historial de encomiendas
  const [showHistorialEncomiendas, setShowHistorialEncomiendas] = useState(false);
  const [minibusHistorialEncomiendas, setMinibusHistorialEncomiendas] = useState(null);

  // Generar matriz de asientos: 5 filas, 3 columnas. Asiento (0,0) es conductor.
  const generarAsientosIniciales = () => {
    const asientos = [];
    for (let fila = 0; fila < 5; fila++) {
      const filaAsientos = [];
      for (let col = 0; col < 3; col++) {
        if (fila === 0 && col === 0) {
          filaAsientos.push({ estado: 'conductor', pasajero: null });
        } else {
          filaAsientos.push({ estado: 'libre', pasajero: null });
        }
      }
      asientos.push(filaAsientos);
    }
    return asientos;
  };

  // Habilitar minibús
  const handleHabilitar = (datos) => {
    const nuevoHabilitado = {
      ...minibusToHabilitar,
      conductor: datos.conductor,
      destino: datos.destino,
      hora: datos.hora,
      fecha: datos.fecha,
      asientos: generarAsientosIniciales(),
    };
    setHabilitados([...habilitados, nuevoHabilitado]);
    setDisponibles(disponibles.filter(m => m.id !== minibusToHabilitar.id));
    setShowHabilitarModal(false);
    setMinibusToHabilitar(null);
  };

  // Vender asiento
  const handleVenderAsiento = (datosVenta) => {
    const { minibusId, minibus, fila, columna, pasajero, costo, destino } = datosVenta;
  
    setHabilitados(prev => prev.map(m => {
      if (m.id === minibusId) {
        const nuevosAsientos = [...m.asientos];
        nuevosAsientos[fila][columna] = {
          estado: 'vendido',
          pasajero,
          costo,
          destino,
        };
        return { ...m, asientos: nuevosAsientos };
      }
      return m;
    }));
  
    setVentaActual({
      minibus: datosVenta.minibus, // asegúrate de pasar el minibus desde el modal
      fila: datosVenta.fila,
      columna: datosVenta.columna,
      pasajero: datosVenta.pasajero,
      costo: datosVenta.costo,
      destino: datosVenta.destino,
    });
    setShowTicket(true);
    setShowVentaModal(false);
    setAsientoToSell(null);
  };

  // Editar asiento vendido
  const handleEditarAsiento = (datosEdicion) => {
    const { minibusId, fila, columna, pasajero, costo, destino } = datosEdicion;
    setHabilitados(habilitados.map(m => {
      if (m.id === minibusId) {
        const nuevosAsientos = [...m.asientos];
        nuevosAsientos[fila][columna] = {
          ...nuevosAsientos[fila][columna],
          pasajero,
          costo,
          destino,
        };
        return { ...m, asientos: nuevosAsientos };
      }
      return m;
    }));
    setShowEditarModal(false);
    setAsientoToEdit(null);
  };

  // Cancelar venta
  const handleCancelarVenta = () => {
    if (!asientoToEdit) return;
    const { minibusId, fila, columna } = asientoToEdit;
    setHabilitados(habilitados.map(m => {
      if (m.id === minibusId) {
        const nuevosAsientos = [...m.asientos];
        nuevosAsientos[fila][columna] = { estado: 'libre', pasajero: null };
        return { ...m, asientos: nuevosAsientos };
      }
      return m;
    }));
    setShowOpcionesModal(false);
    setAsientoToEdit(null);
  };

  // Partir minibús
  const handlePartir = (minibus) => {
    const horaPartida = new Date().toLocaleTimeString();
    const minibusConHora = { ...minibus, horaPartida };
    setPartidos([...partidos, minibusConHora]);
    setHabilitados(habilitados.filter(m => m.id !== minibus.id));
    if (selectedMinibus?.id === minibus.id) {
      setSelectedMinibus(null);
      setIsHistorialMode(false);
    }
  };

  // Seleccionar minibús habilitado
  const handleSelectHabilitado = (minibus) => {
    setSelectedMinibus(minibus);
    setIsHistorialMode(false);
  };

  // Seleccionar minibús del historial
  const handleSelectHistorial = (minibus) => {
    setSelectedMinibus(minibus);
    setIsHistorialMode(true);
  };

  // Ver encomiendas de un minibús del historial
  const handleVerEncomiendas = (minibus) => {
    setMinibusHistorialEncomiendas(minibus);
    setShowHistorialEncomiendas(true);
  };
  

  // Manejar clic en asiento
  const handleAsientoClick = (minibusId, fila, columna) => {
    const minibus = isHistorialMode
      ? partidos.find(m => m.id === minibusId)
      : habilitados.find(m => m.id === minibusId);
    if (!minibus) return;
    const asiento = minibus.asientos[fila][columna];

    if (isHistorialMode) {
      if (asiento.estado === 'vendido') {
        setAsientoDetalle({ minibus, fila, columna, asiento });
        setShowDetalleModal(true);
      }
    } else {
      if (asiento.estado === 'libre') {
        setAsientoToSell({ minibusId, fila, columna });
        setShowVentaModal(true);
      } else if (asiento.estado === 'vendido') {
        setAsientoToEdit({ minibusId, fila, columna });
        setShowOpcionesModal(true);
      }
    }
  };

  // Manejar encomienda (abrir modal)
  const handleEncomienda = (minibus) => {
    setMinibusEncomienda(minibus);
    setShowEncomiendaModal(true);
  };

  // Guardar encomienda
  const handleGuardarEncomienda = (datosEncomienda) => {
    // Guardar en el estado de encomiendas (para historial)
    setEncomiendas([...encomiendas, { ...datosEncomienda, id: Date.now() }]);
    setEncomiendaActual(datosEncomienda);
    setShowEncomiendaModal(false);
    setShowTicketEncomienda(true);
  };

 

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Panel del Boletero</h1>
        <div className={styles.greenLine}></div>
      </div>
    <div className={styles.tablasContainer}>
  {/* Columna izquierda: Minibuses Disponibles */}
  <div className={styles.columnaIzquierda}>
    <h2>Minibuses Disponibles</h2>
    <div className={styles.tablaWrapper}>
      <BoleteroMinibusesDisponibles
        minibuses={disponibles}
        onSeleccionar={(m) => {
          setMinibusToHabilitar(m);
          setShowHabilitarModal(true);
        }}
      />
    </div>
  </div>

  {/* Columna central: Habilitados y Partidos */}
  <div className={styles.columnaCentral}>
    <div className={styles.seccionCentral}>
      <h2 className={styles.title}>Minibuses Habilitados</h2>
      <div className={styles.tablaScroll}>
        <BoleteroMinibusesHabilitados
          minibuses={habilitados}
          onSeleccionar={handleSelectHabilitado}
          onPartir={handlePartir}
          onEncomienda={handleEncomienda}
          selectedId={selectedMinibus?.id}
        />
      </div>
    </div>
    <div className={styles.seccionCentral}>
      <h2>Minibuses que Partieron</h2>
      <div className={styles.tablaScroll}>
        <BoleteroMinibusesHistorial
          partidos={partidos}
          onSeleccionar={handleSelectHistorial}
          onVerEncomiendas={handleVerEncomiendas}
          selectedId={selectedMinibus?.id}
        />
      </div>
    </div>
  </div>

  {/* Columna derecha: Asientos */}
  <div className={styles.columnaDerecha}>
    <h2>Asientos del Minibús</h2>
    <div className={styles.tablaWrapper}>
      {selectedMinibus ? (
        <BoleteroAsientos
          minibus={selectedMinibus}
          onAsientoClick={handleAsientoClick}
        />
      ) : (
        <p>Seleccione un minibús habilitado o del historial</p>
      )}
    </div>
  </div>
</div>

      {/* Modales */}
      {showHabilitarModal && (
        <HabilitarMinibusModal
          minibus={minibusToHabilitar}
          onClose={() => setShowHabilitarModal(false)}
          onHabilitar={handleHabilitar}
        />
      )}

      {showVentaModal && asientoToSell && (
        <VenderAsientoModal
          minibus={habilitados.find(m => m.id === asientoToSell.minibusId)}
          fila={asientoToSell.fila}
          columna={asientoToSell.columna}
          onClose={() => {
            setShowVentaModal(false);
            setAsientoToSell(null);
          }}
          onVender={handleVenderAsiento}
        />
      )}

      {showOpcionesModal && asientoToEdit && (
        <OpcionesAsientoModal
          minibus={habilitados.find(m => m.id === asientoToEdit.minibusId)}
          fila={asientoToEdit.fila}
          columna={asientoToEdit.columna}
          onClose={() => {
            setShowOpcionesModal(false);
            setAsientoToEdit(null);
          }}
          onEditar={() => {
            setShowOpcionesModal(false);
            setShowEditarModal(true);
          }}
          onCancelar={handleCancelarVenta}
        />
      )}

      {showEditarModal && asientoToEdit && (
        <EditarAsientoModal
          minibus={habilitados.find(m => m.id === asientoToEdit.minibusId)}
          fila={asientoToEdit.fila}
          columna={asientoToEdit.columna}
          onClose={() => {
            setShowEditarModal(false);
            setAsientoToEdit(null);
          }}
          onEditar={handleEditarAsiento}
        />
      )}

      {showDetalleModal && asientoDetalle && (
        <DetallePasajeroModal
          minibus={asientoDetalle.minibus}
          fila={asientoDetalle.fila}
          columna={asientoDetalle.columna}
          asiento={asientoDetalle.asiento}
          onClose={() => {
            setShowDetalleModal(false);
            setAsientoDetalle(null);
          }}
        />
      )}

      {showEncomiendaModal && minibusEncomienda && (
        <EncomiendaModal
          minibus={minibusEncomienda}
          onClose={() => setShowEncomiendaModal(false)}
          onGuardar={handleGuardarEncomienda}
        />
      )}

      {showTicketEncomienda && encomiendaActual && (
        <TicketEncomienda
          encomienda={encomiendaActual}
          onCerrar={() => {
            setShowTicketEncomienda(false);
            setEncomiendaActual(null);
          }}
        />
      )}

    {showHistorialEncomiendas && minibusHistorialEncomiendas && (
      <HistorialEncomiendasModal
        minibus={minibusHistorialEncomiendas}
        encomiendas={encomiendas.filter(e => e.minibusId === minibusHistorialEncomiendas.id)}
        onClose={() => {
          setShowHistorialEncomiendas(false);
          setMinibusHistorialEncomiendas(null);
        }}
      />
    )}

{showTicket && ventaActual && (
  <TicketFactura
    venta={ventaActual}
    onCerrar={() => {
      setShowTicket(false);
      setVentaActual(null);
    }}
  />
)}
    </div>
  );
}

export default BoleteroDashboard;