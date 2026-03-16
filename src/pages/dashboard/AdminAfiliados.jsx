import { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import styles from './AdminAfiliados.module.css';

// Datos mock (con licencia, categoría, username, password)
const initialAfiliados = [
  {
    id: 1,
    foto: 'https://randomuser.me/api/portraits/men/1.jpg',
    nombre: 'Juan Pérez',
    telefono: '78912345',
    tipo: 'propietario',
    licencia: 'Clase B',
    categoria: 'Transporte público',
    username: 'juan.perez',
    password: '123456', // en un caso real se almacenaría hasheado
    vehiculo: {
      marca: 'Toyota',
      modelo: 'Hiace',
      tipo: 'Minibús',
      placa: 'ABC-123',
      ruat: 'RUAT-001',
      foto: 'https://via.placeholder.com/60x40?text=Toyota'
    }
  },
  {
    id: 2,
    foto: 'https://randomuser.me/api/portraits/women/2.jpg',
    nombre: 'María Gómez',
    telefono: '71234567',
    tipo: 'asalariado',
    licencia: 'Clase A',
    categoria: 'Transporte de carga',
    username: 'maria.gomez',
    password: 'abcdef',
    vehiculo: null
  }
];

function AdminAfiliados({ afiliados: externalAfiliados, onAdd, onEdit, onDelete }) {
  const [localAfiliados, setLocalAfiliados] = useState(initialAfiliados);
  const afiliados = externalAfiliados || localAfiliados;

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('agregar');
  const [currentAfiliado, setCurrentAfiliado] = useState(null);
  const [showVerModal, setShowVerModal] = useState(false);
  const [afiliadoToView, setAfiliadoToView] = useState(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    foto: '',
    nombre: '',
    telefono: '',
    tipo: '',
    licencia: '',
    categoria: '',
    username: '',
    password: '',
    vehiculo: {
      marca: '',
      modelo: '',
      tipo: '',
      placa: '',
      ruat: '',
      foto: ''
    }
  });

  const [errors, setErrors] = useState({});

  // Cargar datos en edición
  useEffect(() => {
    if (modalType === 'editar' && currentAfiliado) {
      setFormData({
        foto: currentAfiliado.foto || '',
        nombre: currentAfiliado.nombre,
        telefono: currentAfiliado.telefono,
        tipo: currentAfiliado.tipo,
        licencia: currentAfiliado.licencia || '',
        categoria: currentAfiliado.categoria || '',
        username: currentAfiliado.username || '',
        password: '', // No cargamos la contraseña por seguridad
        vehiculo: currentAfiliado.vehiculo ? { ...currentAfiliado.vehiculo } : { marca: '', modelo: '', tipo: '', placa: '', ruat: '', foto: '' }
      });
    }
  }, [modalType, currentAfiliado]);

  const resetForm = () => {
    setFormData({
      foto: '',
      nombre: '',
      telefono: '',
      tipo: '',
      licencia: '',
      categoria: '',
      username: '',
      password: '',
      vehiculo: { marca: '', modelo: '', tipo: '', placa: '', ruat: '', foto: '' }
    });
    setErrors({});
  };

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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
    if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.tipo) newErrors.tipo = 'Debe seleccionar un tipo';
    if (!formData.licencia) newErrors.licencia = 'La licencia es requerida';
    if (!formData.categoria) newErrors.categoria = 'La categoría es requerida';
    if (!formData.username) newErrors.username = 'El nombre de usuario es requerido';
    if (!formData.password && modalType === 'agregar') newErrors.password = 'La contraseña es requerida';
    // En edición, la contraseña puede ser opcional, pero si se proporciona, la guardamos.
    // Para simplificar, si está vacía en edición, no la actualizamos.

    if (formData.tipo === 'propietario') {
      if (!formData.vehiculo.marca) newErrors['vehiculo.marca'] = 'La marca es requerida';
      if (!formData.vehiculo.modelo) newErrors['vehiculo.modelo'] = 'El modelo es requerido';
      if (!formData.vehiculo.tipo) newErrors['vehiculo.tipo'] = 'El tipo de vehículo es requerido';
      if (!formData.vehiculo.placa) newErrors['vehiculo.placa'] = 'La placa es requerida';
      if (!formData.vehiculo.ruat) newErrors['vehiculo.ruat'] = 'El RUAT es requerido';
    }
    return newErrors;
  };

  const handleAdd = () => {
    setModalType('agregar');
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (afiliado) => {
    setModalType('editar');
    setCurrentAfiliado(afiliado);
    setShowModal(true);
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Construir objeto a guardar
    const afiliadoData = {
      foto: formData.foto,
      nombre: formData.nombre,
      telefono: formData.telefono,
      tipo: formData.tipo,
      licencia: formData.licencia,
      categoria: formData.categoria,
      username: formData.username,
      // Solo guardamos password si se proporcionó (en edición puede estar vacío)
      ...(formData.password ? { password: formData.password } : {}),
      vehiculo: formData.tipo === 'propietario' ? formData.vehiculo : null
    };

    if (modalType === 'agregar') {
      const nuevo = {
        ...afiliadoData,
        id: Date.now(),
        password: formData.password // requerido en agregar
      };
      if (onAdd) {
        onAdd(nuevo);
      } else {
        setLocalAfiliados([...localAfiliados, nuevo]);
      }
    } else {
      // editar: actualizar solo los campos que cambiaron, mantener el password si no se proporciona uno nuevo
      const actualizado = {
        ...currentAfiliado,
        ...afiliadoData,
        // Si no se proporcionó nueva contraseña, conservar la anterior
        password: formData.password || currentAfiliado.password
      };
      if (onEdit) {
        onEdit(actualizado);
      } else {
        setLocalAfiliados(localAfiliados.map(a =>
          a.id === currentAfiliado.id ? actualizado : a
        ));
      }
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    } else {
      if (window.confirm('¿Eliminar este afiliado?')) {
        setLocalAfiliados(localAfiliados.filter(a => a.id !== id));
      }
    }
  };

  const handleView = (afiliado) => {
    setAfiliadoToView(afiliado);
    setShowVerModal(true);
  };

  const filteredAfiliados = afiliados.filter(afi =>
    afi.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (afi.telefono && afi.telefono.includes(searchTerm))
  );

  return (
    <div className={styles.afiliadosSection}>
      <div className={styles.headerActions}>
        <h2>Lista de Afiliados</h2>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.addButton} onClick={handleAdd}>
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
              <th>Licencia</th>
              <th>Categoría</th>
              <th>Username</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAfiliados.map(afi => (
              <tr key={afi.id}>
                <td><img src={afi.foto} alt={afi.nombre} className={styles.foto} /></td>
                <td>{afi.nombre}</td>
                <td>{afi.telefono}</td>
                <td>{afi.tipo === 'propietario' ? 'Propietario' : 'Asalariado'}</td>
                <td>{afi.licencia}</td>
                <td>{afi.categoria}</td>
                <td>{afi.username}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.actionBtn} ${styles.viewBtn}`} onClick={() => handleView(afi)} title="Ver"><FaEye /></button>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => handleEdit(afi)} title="Editar"><FaEdit /></button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(afi.id)} title="Eliminar"><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredAfiliados.length === 0 && (
              <tr><td colSpan="8" className={styles.noData}>No se encontraron afiliados</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Ver Detalles */}
      {showVerModal && afiliadoToView && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <h3>Detalles del Afiliado</h3>
      <div className={styles.modalContent}>
        {/* Datos personales */}
        <div className={styles.personalData}>
          <p><strong>Nombre:</strong> {afiliadoToView.nombre}</p>
          <p><strong>Teléfono:</strong> {afiliadoToView.telefono}</p>
          <p><strong>Tipo:</strong> {afiliadoToView.tipo === 'propietario' ? 'Propietario' : 'Asalariado'}</p>
          <p><strong>Licencia:</strong> {afiliadoToView.licencia}</p>
          <p><strong>Categoría:</strong> {afiliadoToView.categoria}</p>
        </div>

        {/* Datos del vehículo (solo si es propietario) */}
        {afiliadoToView.tipo === 'propietario' && afiliadoToView.vehiculo && (
          <div className={styles.vehiculoData}>
            <h4>Vehículo</h4>
            <div className={styles.vehiculoInfo}>
              <div className={styles.vehiculoText}>
                <p><strong>Marca:</strong> {afiliadoToView.vehiculo.marca}</p>
                <p><strong>Modelo:</strong> {afiliadoToView.vehiculo.modelo}</p>
                <p><strong>Tipo:</strong> {afiliadoToView.vehiculo.tipo}</p>
                <p><strong>Placa:</strong> {afiliadoToView.vehiculo.placa}</p>
                <p><strong>Ruat:</strong> {afiliadoToView.vehiculo.ruat}</p>
              </div>
              {afiliadoToView.vehiculo.foto && (
                <div className={styles.vehiculoFotoContainer}>
                  <img 
                    src={afiliadoToView.vehiculo.foto} 
                    alt="Vehículo" 
                    className={styles.vehiculoFotoModal} 
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {afiliadoToView.tipo === 'asalariado' && (
          <p className={styles.noVehiculo}>Este afiliado no tiene vehículo registrado.</p>
        )}
      </div>
      <div className={styles.modalActions}>
        <button onClick={() => setShowVerModal(false)}>Cerrar</button>
      </div>
    </div>
  </div>
)}

      {/* Modal Agregar/Editar */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{modalType === 'agregar' ? 'Agregar Nuevo Afiliado' : 'Editar Afiliado'}</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Foto */}
              <div className={styles.formGroup}>
                <label>URL Foto</label>
                <input type="text" name="foto" value={formData.foto} onChange={handleInputChange} />
              </div>

              {/* Nombre */}
              <div className={styles.formGroup}>
                <label>Nombre Completo *</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
              </div>

              {/* Teléfono */}
              <div className={styles.formGroup}>
                <label>Teléfono *</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} />
                {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
              </div>

              {/* Tipo */}
              {modalType === 'agregar' ? (
                <div className={styles.formGroup}>
                  <label>Tipo *</label>
                  <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                    <option value="">Seleccione tipo</option>
                    <option value="propietario">Propietario</option>
                    <option value="asalariado">Asalariado</option>
                  </select>
                  {errors.tipo && <span className={styles.error}>{errors.tipo}</span>}
                </div>
              ) : (
                <div className={styles.formGroup}>
                  <label>Tipo</label>
                  <p className={styles.tipoFijo}>{formData.tipo === 'propietario' ? 'Propietario' : 'Asalariado'}</p>
                </div>
              )}

              {/* Licencia */}
              <div className={styles.formGroup}>
                <label>Licencia *</label>
                <input type="text" name="licencia" value={formData.licencia} onChange={handleInputChange} />
                {errors.licencia && <span className={styles.error}>{errors.licencia}</span>}
              </div>

              {/* Categoría */}
              <div className={styles.formGroup}>
                <label>Categoría *</label>
                <input type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} />
                {errors.categoria && <span className={styles.error}>{errors.categoria}</span>}
              </div>

              {/* Username */}
              <div className={styles.formGroup}>
                <label>Nombre de usuario *</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                {errors.username && <span className={styles.error}>{errors.username}</span>}
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <label>{modalType === 'agregar' ? 'Contraseña *' : 'Contraseña (dejar en blanco para no cambiar)'}</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
              </div>

              {/* Campos de vehículo solo si es propietario */}
              {formData.tipo === 'propietario' && (
                <>
                  <h4>Datos del Vehículo</h4>
                  <div className={styles.formGroup}>
                    <label>Marca *</label>
                    <input type="text" name="vehiculo.marca" value={formData.vehiculo.marca} onChange={handleInputChange} />
                    {errors['vehiculo.marca'] && <span className={styles.error}>{errors['vehiculo.marca']}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label>Modelo *</label>
                    <input type="text" name="vehiculo.modelo" value={formData.vehiculo.modelo} onChange={handleInputChange} />
                    {errors['vehiculo.modelo'] && <span className={styles.error}>{errors['vehiculo.modelo']}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label>Tipo de Vehículo *</label>
                    <input type="text" name="vehiculo.tipo" value={formData.vehiculo.tipo} onChange={handleInputChange} />
                    {errors['vehiculo.tipo'] && <span className={styles.error}>{errors['vehiculo.tipo']}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label>Placa *</label>
                    <input type="text" name="vehiculo.placa" value={formData.vehiculo.placa} onChange={handleInputChange} />
                    {errors['vehiculo.placa'] && <span className={styles.error}>{errors['vehiculo.placa']}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label>Ruat *</label>
                    <input type="text" name="vehiculo.ruat" value={formData.vehiculo.ruat} onChange={handleInputChange} />
                    {errors['vehiculo.ruat'] && <span className={styles.error}>{errors['vehiculo.ruat']}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label>URL Foto del Vehículo</label>
                    <input type="text" name="vehiculo.foto" value={formData.vehiculo.foto} onChange={handleInputChange} />
                  </div>
                </>
              )}

              <div className={styles.modalActions}>
                <button type="button" onClick={handleSave} className={styles.saveBtn}>Guardar</button>
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAfiliados;