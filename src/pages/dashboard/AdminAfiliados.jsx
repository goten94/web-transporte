import { useState } from 'react';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import styles from './AdminAfiliados.module.css';

function AdminAfiliados({ afiliados, onAdd, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('agregar'); // 'agregar' o 'editar'
  const [currentAfiliado, setCurrentAfiliado] = useState(null);
  const [showAportesModal, setShowAportesModal] = useState(false);
  const [aportesAfiliado, setAportesAfiliado] = useState(null);

  // Estado para el formulario de afiliado
  const [formData, setFormData] = useState({
    foto: '',
    nombre: '',
    telefono: '',
    tipo: 'propietario',
    vehiculo: {
      marca: '',
      tipo: '',
      placa: '',
      ruat: '',
      foto: ''
    }
  });

  // Filtrar afiliados según búsqueda
  const filteredAfiliados = afiliados.filter(afi => {
    const term = searchTerm.toLowerCase();
    return (
      afi.nombre.toLowerCase().includes(term) ||
      afi.email.toLowerCase().includes(term) ||
      afi.vehiculo.placa.toLowerCase().includes(term) ||
      afi.vehiculo.marca.toLowerCase().includes(term)
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('vehiculo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vehiculo: { ...prev.vehiculo, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const openAddModal = () => {
    setModalType('agregar');
    setFormData({
      foto: '',
      nombre: '',
      telefono: '',
      tipo: 'propietario',
      vehiculo: { marca: '', tipo: '', placa: '', ruat: '', foto: '' }
    });
    setShowModal(true);
  };

  const openEditModal = (afiliado) => {
    setModalType('editar');
    setCurrentAfiliado(afiliado);
    setFormData({
      foto: afiliado.foto,
      nombre: afiliado.nombre,
      email: afiliado.email,
      telefono: afiliado.telefono,
      tipo: afiliado.tipo,
      vehiculo: { ...afiliado.vehiculo }
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalType === 'agregar') {
      onAdd(formData);
    } else {
      onEdit({ ...currentAfiliado, ...formData, vehiculo: formData.vehiculo });
    }
    setShowModal(false);
  };

  const handleViewAportes = (afiliado) => {
    setAportesAfiliado(afiliado);
    setShowAportesModal(true);
  };

  return (
    <div className={styles.afiliadosSection}>
      <div className={styles.headerActions}>
        <h2>Lista de Afiliados</h2>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nombre, email, placa o marca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.addButton} onClick={openAddModal}>
          <FaPlus /> Nuevo Afiliado
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>Marca Veh.</th>
              <th>Tipo Veh.</th>
              <th>Placa</th>
              <th>Ruat</th>
              <th>Foto Veh.</th>
              <th>Deudas</th>
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
                  <td>{afi.telefono}</td>
                  <td>{afi.tipo === 'propietario' ? 'Propietario' : 'Asalariado'}</td>
                  <td>{afi.vehiculo.marca}</td>
                  <td>{afi.vehiculo.tipo}</td>
                  <td>{afi.vehiculo.placa}</td>
                  <td>{afi.vehiculo.ruat}</td>
                  <td>
                    <img src={afi.vehiculo.foto} alt="vehículo" className={styles.vehiculoFoto} />
                  </td>
                  <td className={afi.aportes?.some(a => a.estado === 'pendiente') ? styles.deudaSi : styles.deudaNo}>
                    {afi.aportes?.some(a => a.estado === 'pendiente') ? 'Sí' : 'No'}
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={`${styles.actionBtn} ${styles.viewBtn}`} onClick={() => handleViewAportes(afi)} title="Ver aportes">
                        <FaEye />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEditModal(afi)} title="Editar">
                        <FaEdit />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => onDelete(afi.id)} title="Eliminar">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className={styles.noData}>
                  No se encontraron afiliados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar afiliado */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{modalType === 'agregar' ? 'Agregar Nuevo Afiliado' : 'Editar Afiliado'}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className={styles.formGroup}>
                <label>URL Foto Afiliado</label>
                <input type="text" name="foto" value={formData.foto} onChange={handleInputChange} placeholder="https://..." />
              </div>
              <div className={styles.formGroup}>
                <label>Nombre Completo</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
              </div>
            
              <div className={styles.formGroup}>
                <label>Teléfono</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Tipo</label>
                <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                  <option value="propietario">Propietario</option>
                  <option value="asalariado">Asalariado</option>
                </select>
              </div>
              <h4>Datos del Vehículo</h4>
              <div className={styles.formGroup}>
                <label>Marca</label>
                <input type="text" name="vehiculo.marca" value={formData.vehiculo.marca} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Tipo de Vehículo</label>
                <input type="text" name="vehiculo.tipo" value={formData.vehiculo.tipo} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Placa</label>
                <input type="text" name="vehiculo.placa" value={formData.vehiculo.placa} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Ruat</label>
                <input type="text" name="vehiculo.ruat" value={formData.vehiculo.ruat} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>URL Foto del Vehículo</label>
                <input type="text" name="vehiculo.foto" value={formData.vehiculo.foto} onChange={handleInputChange} placeholder="https://..." />
              </div>
              <div className={styles.modalActions}>
                <button type="submit">{modalType === 'agregar' ? 'Agregar' : 'Guardar Cambios'}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para ver aportes */}
      {showAportesModal && aportesAfiliado && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Aportes de {aportesAfiliado.nombre}</h3>
            {aportesAfiliado.aportes?.length > 0 ? (
              <ul className={styles.aportesList}>
                {aportesAfiliado.aportes.map((aporte, idx) => (
                  <li key={idx}>
                    <span>{aporte.mes}</span>
                    <span>Bs. {aporte.monto}</span>
                    <span className={aporte.estado === 'pagado' ? styles.pagado : styles.pendiente}>
                      {aporte.estado === 'pagado' ? 'Pagado' : 'Pendiente'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay aportes registrados.</p>
            )}
            <div className={styles.modalActions}>
              <button onClick={() => setShowAportesModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAfiliados;