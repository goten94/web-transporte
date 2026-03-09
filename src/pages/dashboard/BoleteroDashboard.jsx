import { useState } from 'react';
import BoleteroMinibusesDisponibles from './BoleteroMinibusesDisponibles';
import BoleteroMinibusesHabilitados from './BoleteroMinibusesHabilitados';
import BoleteroMinibusesHistorial from './BoleteroMinibusesHistorial'; // nuevo componente
import BoleteroAsientos from './BoleteroAsientos';
import HabilitarMinibusModal from './HabilitarMinibusModal';
import VenderAsientoModal from './VenderAsientoModal';
import EditarAsientoModal from './EditarAsientoModal';
import OpcionesAsientoModal from './OpcionesAsientoModal';
import styles from './BoleteroDashboard.module.css';
import DetallePasajeroModal from './DetallePasajeroModal';

// Datos iniciales de minibuses disponibles
const minibusesIniciales = [
  { id: 1, placa: 'ABC-123', modelo: 'Toyota Hiace', capacidad: 15 },
  { id: 2, placa: 'XYZ-789', modelo: 'Mercedes Sprinter', capacidad: 15 },
  { id: 3, placa: 'LMN-456', modelo: 'Nissan Urvan', capacidad: 15 },
];

function BoleteroDashboard() {
  ///////
  const [isHistorialMode, setIsHistorialMode] = useState(false);
const [showDetalleModal, setShowDetalleModal] = useState(false);
const [asientoDetalle, setAsientoDetalle] = useState(null);
  ///////
  const [disponibles, setDisponibles] = useState(minibusesIniciales);
  const [habilitados, setHabilitados] = useState([]);
  const [partidos, setPartidos] = useState([]); // historial de minibuses que partieron
  const [selectedMinibus, setSelectedMinibus] = useState(null);
  const [selectedMinibusTipo, setSelectedMinibusTipo] = useState(null); // 'habilitado' o 'historial'
  const [showHabilitarModal, setShowHabilitarModal] = useState(false);
  const [minibusToHabilitar, setMinibusToHabilitar] = useState(null);
  const [showVentaModal, setShowVentaModal] = useState(false);
  const [asientoToSell, setAsientoToSell] = useState(null);
  const [showOpcionesModal, setShowOpcionesModal] = useState(false);
  const [asientoToEdit, setAsientoToEdit] = useState(null);
  const [showEditarModal, setShowEditarModal] = useState(false);

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

  // Partir minibús (mover de habilitados a partidos)
  const handlePartir = (minibus) => {
    const horaPartida = new Date().toLocaleTimeString();
    const minibusConPartida = { ...minibus, horaPartida };
    setPartidos([...partidos, minibusConPartida]);
    setHabilitados(habilitados.filter(m => m.id !== minibus.id));
    // Si el minibús que partió era el seleccionado, limpiar selección
    if (selectedMinibus && selectedMinibus.id === minibus.id) {
      setSelectedMinibus(null);
      setSelectedMinibusTipo(null);
    }
  };

  // Vender asiento
  const handleVenderAsiento = (datosVenta) => {
    const { minibusId, fila, columna, pasajero, costo, destino } = datosVenta;
    setHabilitados(habilitados.map(m => {
      if (m.id === minibusId) {
        const nuevosAsientos = [...m.asientos];
        nuevosAsientos[fila][columna] = {
          estado: 'vendido',
          pasajero: { nombre: pasajero.nombre, documento: pasajero.documento },
          costo,
          destino,
        };
        return { ...m, asientos: nuevosAsientos };
      }
      return m;
    }));
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
          pasajero: { nombre: pasajero.nombre, documento: pasajero.documento },
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

  // Seleccionar minibús habilitado
  const handleSelectHabilitado = (minibus) => {
    setSelectedMinibus(minibus);
    setSelectedMinibusTipo('habilitado');
  };

  // Seleccionar minibús del historial
  /*const handleSelectHistorial = (minibus) => {
    setSelectedMinibus(minibus);
    setSelectedMinibusTipo('historial');
  };*/
  const handleSelectHistorial = (minibus) => {
    setSelectedMinibus(minibus);
    setIsHistorialMode(true);
  };

  // Manejar clic en asiento (solo si el minibús seleccionado es de tipo habilitado)
  const handleAsientoClick = (minibusId, fila, columna) => {
    const minibus = isHistorialMode 
      ? partidos.find(m => m.id === minibusId) 
      : habilitados.find(m => m.id === minibusId);
    if (!minibus) return;
    const asiento = minibus.asientos[fila][columna];
  
    if (isHistorialMode) {
      // Modo historial: mostrar modal de solo lectura si el asiento está vendido
      if (asiento.estado === 'vendido') {
        setAsientoDetalle({ minibus, fila, columna, asiento });
        setShowDetalleModal(true);
      }
    } else {
      // Modo habilitado: comportamiento normal
      if (asiento.estado === 'libre') {
        setAsientoToSell({ minibusId, fila, columna });
        setShowVentaModal(true);
      } else if (asiento.estado === 'vendido') {
        setAsientoToEdit({ minibusId, fila, columna });
        setShowOpcionesModal(true);
      }
    }
  };
  /*const handleAsientoClick = (minibusId, fila, columna) => {
    if (selectedMinibusTipo !== 'habilitado') return; // No permitir acciones en historial
    const minibus = habilitados.find(m => m.id === minibusId);
    if (!minibus) return;
    const asiento = minibus.asientos[fila][columna];

    if (asiento.estado === 'libre') {
      setAsientoToSell({ minibusId, fila, columna });
      setShowVentaModal(true);
    } else if (asiento.estado === 'vendido') {
      setAsientoToEdit({ minibusId, fila, columna });
      setShowOpcionesModal(true);
    }
  };*/

  return (
    <div className={styles.dashboard}>
      <h1>Panel del Boletero</h1>
      <div className={styles.tablasContainer}>
        {/* Columna izquierda: Minibuses disponibles */}
        <div className={styles.columna}>
          <h2>Minibuses Disponibles</h2>
          <BoleteroMinibusesDisponibles
            minibuses={disponibles}
            onSeleccionar={(m) => {
              setMinibusToHabilitar(m);
              setShowHabilitarModal(true);
            }}
          />
        </div>

        {/* Columna central: Minibuses Habilitados y Minibuses que partieron */}
        <div className={styles.columna}>
          <div className={styles.subseccion}>
            <h2>Minibuses Habilitados</h2>
            <BoleteroMinibusesHabilitados
              minibuses={habilitados}
              onSeleccionar={handleSelectHabilitado}
              onPartir={handlePartir}
              selectedId={selectedMinibus?.id}
            />
          </div>
          <div className={styles.subseccion}>
            <h2>Minibuses que Partieron</h2>
            {/*<BoleteroMinibusesHistorial
              minibuses={partidos}
              onSeleccionar={handleSelectHistorial}
              selectedId={selectedMinibus?.id}
            />*/}
            <BoleteroMinibusesHistorial
            partidos={partidos}
            onSeleccionar={handleSelectHistorial}
            selectedId={selectedMinibus?.id}
/>
          </div>
        </div>

        {/* Columna derecha: Asientos */}
        <div className={styles.columna}>
          <h2>Asientos del Minibús</h2>
          {selectedMinibus ? (
            <BoleteroAsientos
              minibus={selectedMinibus}
              onAsientoClick={handleAsientoClick}
              readOnly={selectedMinibusTipo === 'historial'} // Solo lectura si es historial
            />
          ) : (
            <p>Seleccione un minibús para ver sus asientos</p>
          )}
        </div>
      </div>

      {/* Modales (igual que antes) */}
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

      {/* Modal de detalle de pasajero (solo lectura) */}
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
    </div>
  );
}

export default BoleteroDashboard;