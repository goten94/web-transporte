import { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import styles from './AdminListaAdministrativa.module.css';

// Datos mock de usuarios administrativos (boleteros y tesoreros)
const initialAdministrativos = [
  {
    id: 1,
    foto: 'https://randomuser.me/api/portraits/men/5.jpg',
    nombre: 'Roberto Gómez',
    username: 'rgomez',
    telefono: '78912345',
    tipo: 'boletero',
    puntoVenta: 'Terminal Central',
    fechaInicio: '2024-01-15',
    // para tesorero no aplica
  },
  {
    id: 2,
    foto: 'https://randomuser.me/api/portraits/women/6.jpg',
    nombre: 'Laura Fernández',
    username: 'lfernandez',
    telefono: '71234567',
    tipo: 'tesorero',
    numeroCuenta: '1234567890',
    fechaInicio: '2023-11-01',
  },
  {
    id: 3,
    foto: 'https://randomuser.me/api/portraits/men/7.jpg',
    nombre: 'Carlos Ruiz',
    username: 'cruiz',
    telefono: '69876543',
    tipo: 'boletero',
    puntoVenta: 'Terminal Sur',
    fechaInicio: '2024-02-10',
  },
];

function AdminListaAdministrativa() {
  const [administrativos, setAdministrativos] = useState(initialAdministrativos);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('agregar'); // 'agregar' o 'editar'
  const [currentItem, setCurrentItem] = useState(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    foto: '',
    nombre: '',
    username: '',
    password: '',
    telefono: '',
    tipo: '', // 'boletero' o 'tesorero'
    // Campos específicos
    puntoVenta: '',
    numeroCuenta: '',
    fechaInicio: '',
  });

  // Para manejar errores
  const [errors, setErrors] = useState({});

  // Filtrar por búsqueda (nombre, username, teléfono)
  const filtered = administrativos.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.telefono.includes(searchTerm)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const resetForm = () => {
    setFormData({
      foto: '',
      nombre: '',
      username: '',
      password: '',
      telefono: '',
      tipo: '',
      puntoVenta: '',
      numeroCuenta: '',
      fechaInicio: '',
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'Nombre requerido';
    if (!formData.username) newErrors.username = 'Username requerido';
    if (modalType === 'agregar' && !formData.password) newErrors.password = 'Contraseña requerida';
    if (!formData.telefono) newErrors.telefono = 'Teléfono requerido';
    if (!formData.tipo) newErrors.tipo = 'Seleccione un tipo';
    if (!formData.fechaInicio) newErrors.fechaInicio = 'Fecha de inicio requerida';
    if (formData.tipo === 'boletero' && !formData.puntoVenta) newErrors.puntoVenta = 'Punto de venta requerido';
    if (formData.tipo === 'tesorero' && !formData.numeroCuenta) newErrors.numeroCuenta = 'Número de cuenta requerido';
    return newErrors;
  };

  const handleAdd = () => {
    setModalType('agregar');
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalType('editar');
    setCurrentItem(item);
    setFormData({
      foto: item.foto || '',
      nombre: item.nombre,
      username: item.username,
      password: '', // no cargamos contraseña
      telefono: item.telefono,
      tipo: item.tipo,
      puntoVenta: item.puntoVenta || '',
      numeroCuenta: item.numeroCuenta || '',
      fechaInicio: item.fechaInicio || '',
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este usuario administrativo?')) {
      setAdministrativos(administrativos.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let datosGuardar = { ...formData };
    if (modalType === 'editar' && !datosGuardar.password) {
      delete datosGuardar.password; // no cambiar contraseña
    }

    if (modalType === 'agregar') {
      const nuevo = {
        ...datosGuardar,
        id: Date.now(),
      };
      setAdministrativos([...administrativos, nuevo]);
    } else {
      const actualizado = {
        ...datosGuardar,
        id: currentItem.id,
      };
      setAdministrativos(administrativos.map(item => item.id === currentItem.id ? actualizado : item));
    }
    setShowModal(false);
    resetForm();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerActions}>
        <h2>Lista Administrativa</h2>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nombre, username o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.addButton} onClick={handleAdd}>
          <FaPlus /> Nuevo Administrativo
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Username</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>Fecha Inicio</th>
              <th>Específico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id}>
                <td><img src={item.foto} alt={item.nombre} className={styles.foto} /></td>
                <td>{item.nombre}</td>
                <td>{item.username}</td>
                <td>{item.telefono}</td>
                <td>{item.tipo === 'boletero' ? 'Boletero' : 'Tesorero'}</td>
                <td>{item.fechaInicio}</td>
                <td>
                  {item.tipo === 'boletero' ? (
                    <span>Punto de venta: {item.puntoVenta}</span>
                  ) : (
                    <span>N° Cuenta: {item.numeroCuenta}</span>
                  )}
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => handleEdit(item)} title="Editar">
                      <FaEdit />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(item.id)} title="Eliminar">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="8" className={styles.noData}>No se encontraron registros</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{modalType === 'agregar' ? 'Agregar Administrativo' : 'Editar Administrativo'}</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label>URL Foto</label>
                <input type="text" name="foto" value={formData.foto} onChange={handleInputChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Nombre *</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Username *</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                {errors.username && <span className={styles.error}>{errors.username}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>{modalType === 'agregar' ? 'Contraseña *' : 'Nueva contraseña (dejar vacío para no cambiar)'}</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Teléfono *</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} />
                {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Tipo *</label>
                <select name="tipo" value={formData.tipo} onChange={handleInputChange} disabled={modalType === 'editar'}>
                  <option value="">Seleccione tipo</option>
                  <option value="boletero">Boletero</option>
                  <option value="tesorero">Tesorero</option>
                </select>
                {errors.tipo && <span className={styles.error}>{errors.tipo}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Fecha de inicio de cargo *</label>
                <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleInputChange} />
                {errors.fechaInicio && <span className={styles.error}>{errors.fechaInicio}</span>}
              </div>

              {formData.tipo === 'boletero' && (
                <div className={styles.formGroup}>
                  <label>Punto de venta *</label>
                  <input type="text" name="puntoVenta" value={formData.puntoVenta} onChange={handleInputChange} />
                  {errors.puntoVenta && <span className={styles.error}>{errors.puntoVenta}</span>}
                </div>
              )}

              {formData.tipo === 'tesorero' && (
                <div className={styles.formGroup}>
                  <label>Número de cuenta *</label>
                  <input type="text" name="numeroCuenta" value={formData.numeroCuenta} onChange={handleInputChange} />
                  {errors.numeroCuenta && <span className={styles.error}>{errors.numeroCuenta}</span>}
                </div>
              )}

              <div className={styles.modalActions}>
                <button type="button" onClick={handleSave}>Guardar</button>
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminListaAdministrativa;