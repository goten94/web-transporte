import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import styles from './SecretarioAfiliados.module.css';

// Datos mockeados de afiliados (incluyendo vehículo)
const mockAfiliados = [
  {
    id: 1,
    foto: 'https://randomuser.me/api/portraits/men/1.jpg',
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    telefono: '71234567',
    tipo: 'propietario',
    vehiculo: {
      marca: 'Toyota',
      tipo: 'Minibús',
      placa: 'ABC-123',
      ruat: 'RUAT-001',
      foto: 'https://via.placeholder.com/60x40?text=Minibus'
    },
    aportes: [
      { mes: 'Enero', año: 2025, monto: 150, estado: 'pagado' },
      { mes: 'Febrero', año: 2025, monto: 150, estado: 'pendiente' }
    ]
  },
  {
    id: 2,
    foto: 'https://randomuser.me/api/portraits/women/2.jpg',
    nombre: 'María Gómez',
    email: 'maria.gomez@example.com',
    telefono: '71345678',
    tipo: 'asalariado',
    vehiculo: {
      marca: 'Volvo',
      tipo: 'Volqueta',
      placa: 'DEF-456',
      ruat: 'RUAT-002',
      foto: 'https://via.placeholder.com/60x40?text=Volqueta'
    },
    aportes: [
      { mes: 'Enero', año: 2025, monto: 150, estado: 'pagado' },
      { mes: 'Febrero', año: 2025, monto: 150, estado: 'pagado' }
    ]
  },
  {
    id: 3,
    foto: 'https://randomuser.me/api/portraits/men/3.jpg',
    nombre: 'Carlos López',
    email: 'carlos.lopez@example.com',
    telefono: '71456789',
    tipo: 'propietario',
    vehiculo: {
      marca: 'Mercedes',
      tipo: 'Minibús',
      placa: 'GHI-789',
      ruat: 'RUAT-003',
      foto: 'https://via.placeholder.com/60x40?text=Minibus'
    },
    aportes: [
      { mes: 'Enero', año: 2025, monto: 150, estado: 'pendiente' },
      { mes: 'Febrero', año: 2025, monto: 150, estado: 'pendiente' }
    ]
  }
];

function SecretarioAfiliados() {
  const [afiliados, setAfiliados] = useState(mockAfiliados);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAfiliado, setEditingAfiliado] = useState(null);
  const [formData, setFormData] = useState({
    foto: '',
    nombre: '',
    email: '',
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

  // Filtrar afiliados por término de búsqueda (nombre, email, placa)
  const filteredAfiliados = afiliados.filter(afiliado =>
    afiliado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    afiliado.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    afiliado.vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('vehiculo.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        vehiculo: { ...formData.vehiculo, [field]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openModal = (afiliado = null) => {
    if (afiliado) {
      setEditingAfiliado(afiliado);
      setFormData({
        foto: afiliado.foto || '',
        nombre: afiliado.nombre,
        email: afiliado.email,
        telefono: afiliado.telefono,
        tipo: afiliado.tipo,
        vehiculo: { ...afiliado.vehiculo }
      });
    } else {
      setEditingAfiliado(null);
      setFormData({
        foto: '',
        nombre: '',
        email: '',
        telefono: '',
        tipo: 'propietario',
        vehiculo: { marca: '', tipo: '', placa: '', ruat: '', foto: '' }
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAfiliado(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar (simulada)
    if (editingAfiliado) {
      // Editar existente
      setAfiliados(afiliados.map(a => a.id === editingAfiliado.id ? { ...a, ...formData, vehiculo: formData.vehiculo } : a));
    } else {
      // Agregar nuevo (generar id temporal)
      const newId = Math.max(...afiliados.map(a => a.id)) + 1;
      const nuevoAfiliado = {
        id: newId,
        ...formData,
        aportes: [] // sin aportes inicialmente
      };
      setAfiliados([...afiliados, nuevoAfiliado]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este afiliado?')) {
      setAfiliados(afiliados.filter(a => a.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gestión de Afiliados</h2>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nombre, email o placa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.addButton} onClick={() => openModal()}>
          <FaPlus /> Nuevo Afiliado
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>Marca Veh.</th>
              <th>Tipo Veh.</th>
              <th>Placa</th>
              <th>RUAT</th>
              <th>Foto Veh.</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAfiliados.map(afiliado => (
              <tr key={afiliado.id}>
                <td className={styles.fotoCell}>
                  <img src={afiliado.foto} alt={afiliado.nombre} className={styles.foto} />
                </td>
                <td>{afiliado.nombre}</td>
                <td>{afiliado.email}</td>
                <td>{afiliado.telefono}</td>
                <td>{afiliado.tipo === 'propietario' ? 'Propietario' : 'Asalariado'}</td>
                <td>{afiliado.vehiculo.marca}</td>
                <td>{afiliado.vehiculo.tipo}</td>
                <td>{afiliado.vehiculo.placa}</td>
                <td>{afiliado.vehiculo.ruat}</td>
                <td className={styles.fotoCell}>
                  <img src={afiliado.vehiculo.foto} alt="Vehículo" className={styles.vehiculoFoto} />
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openModal(afiliado)} title="Editar">
                      <FaEdit />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(afiliado.id)} title="Eliminar">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={closeModal}><FaTimes /></button>
            <h3>{editingAfiliado ? 'Editar Afiliado' : 'Nuevo Afiliado'}</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Foto del Afiliado (URL)</label>
                  <input type="text" name="foto" value={formData.foto} onChange={handleInputChange} placeholder="URL de la imagen" />
                </div>
                <div className={styles.formGroup}>
                  <label>Nombre Completo</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Teléfono</label>
                  <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Tipo de Afiliado</label>
                  <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                    <option value="propietario">Propietario</option>
                    <option value="asalariado">Asalariado</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Marca del Vehículo</label>
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
                  <label>RUAT</label>
                  <input type="text" name="vehiculo.ruat" value={formData.vehiculo.ruat} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Foto del Vehículo (URL)</label>
                  <input type="text" name="vehiculo.foto" value={formData.vehiculo.foto} onChange={handleInputChange} placeholder="URL de la imagen" />
                </div>
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={closeModal}>Cancelar</button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecretarioAfiliados;