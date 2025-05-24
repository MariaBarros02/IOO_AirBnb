import React, { useState, useEffect } from 'react';
import { Button, Modal, Label, TextInput, ModalHeader, ModalBody } from 'flowbite-react';
import axios from 'axios';
import { HiOutlineExclamationCircle, HiCheckCircle, HiClock, HiXCircle } from 'react-icons/hi';
import Notificacion from './Notificacion.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { BiEdit, BiTrash, BiInfoCircle } from 'react-icons/bi';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { Select } from 'flowbite-react';

moment.locale('es');

const localizer = momentLocalizer(moment);

const messages = {
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Todo el día',
  week: 'Semana',
  work_week: 'Semana laboral',
  day: 'Día',
  month: 'Mes',
  previous: 'Atrás',
  next: 'Siguiente',
  yesterday: 'Ayer',
  tomorrow: 'Mañana',
  today: 'Hoy',
  agenda: 'Agenda',
  noEventsInRange: 'No hay eventos en este rango.',
  showMore: total => `+ Ver más (${total})`
};

const TablaReservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [toast, setToast] = useState({});
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [estadoReservaSeleccionada, setEstadoReservaSeleccionada] = useState('');
  const [colorPropiedadSeleccionada, setColorPropiedadSeleccionada] = useState('#f87171'); 
  const [eventos, setEventos] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    propiedadId: '',
    propiedad: ''
  });

  useEffect(() => {
    const obtenerFechasOcupadas = async (propiedadId) => {
      try {
        const response = await axios.get(`http://localhost:5000/reservas/ocupadas/${propiedadId}`, {
          withCredentials: true
        });
        const eventosTransformados = response.data.map(r => ({
          title: 'Reservado',
          start: parseISO(r.checkIn),
          end: parseISO(r.checkOut),
          allDay: true,
        }));
        setEventos(eventosTransformados);
      } catch (error) {
        console.error('Error al obtener fechas ocupadas:', error);
        setEventos([]);
        setToast({ msg: "Error al cargar las fechas ocupadas", tipo: "error" });
        setTimeout(() => setToast({}), 3000);
      }
    };

    obtenerReservas(paginaActual);

    if (reservaSeleccionada?.property?._id) {
      obtenerFechasOcupadas(reservaSeleccionada.property._id);
    } else {
      setEventos([]);
    }
  }, [paginaActual, reservaSeleccionada]);

  useEffect(() => {
    if (datosFormulario.propiedadId && propiedades.length > 0) {
      const propiedadEncontrada = propiedades.find(p => p._id === datosFormulario.propiedadId);
      if (propiedadEncontrada && datosFormulario.propiedad !== propiedadEncontrada.titulo) {
        setDatosFormulario(prev => ({
          ...prev,
          propiedad: propiedadEncontrada.titulo
        }));
      }
    }
  }, [propiedades, datosFormulario.propiedadId]);

  const obtenerReservas = async (pagina = 1) => {
    try {
      console.log('Obteniendo reservas...');
      const response = await axios.get(`http://localhost:5000/admin/reservas?page=${pagina}&limit=4`, {
        withCredentials: true,
      });
      console.log('Respuesta del servidor:', response.data);
      
      // Si la respuesta es un array directo
      if (Array.isArray(response.data)) {
        setReservas(response.data);
        setPaginaActual(1);
        setTotalPaginas(1);
      }
      // Si la respuesta es un objeto con la estructura esperada
      else if (response.data && response.data.reservas) {
        setReservas(response.data.reservas);
        setPaginaActual(response.data.paginaActual);
        setTotalPaginas(response.data.paginasTotales);
      } else {
        console.error('Formato de respuesta inesperado:', response.data);
        setReservas([]);
      }
    } catch (error) {
      console.error('Error al obtener las reservas:', error.response?.data || error.message);
      setReservas([]);
    }
  };

  const eliminarReserva = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/reservas/${id}`, {
        withCredentials: true,
      });
      setOpenModalEliminar(false);
      obtenerReservas(paginaActual);
      setToast({ msg: "La reserva se ha eliminado correctamente", tipo: "success" }); 
      setTimeout(() => {
        setToast({});
      }, 3000);

    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  const handleVerInfo = (reserva) => {
    setReservaSeleccionada(reserva);
    setEstadoReservaSeleccionada(reserva.status || 'Pendiente'); // Inicializar con el estado actual
    setColorPropiedadSeleccionada(localStorage.getItem(`colorPropiedad_${reserva.property?._id}`) || '#f87171');
    setOpenModal(true);
    setDatosFormulario({
      propiedadId: typeof reserva.property === 'object' ? reserva.property._id : reserva.property,
      propiedad: reserva.property?.titulo || ''
    });
  };

  const handleGuardarCambiosInfo = async () => {
    if (!reservaSeleccionada) return;
    try {
      // Actualizar estado de la reserva
      await axios.put(`http://localhost:5000/admin/reservas/${reservaSeleccionada._id}`, 
        {
          name: reservaSeleccionada.name,
          lastName: reservaSeleccionada.lastName,
          phone: reservaSeleccionada.phone,
          email: reservaSeleccionada.email,
          property: reservaSeleccionada.property?._id,
          checkIn: reservaSeleccionada.checkIn,
          checkOut: reservaSeleccionada.checkOut,
          estado: estadoReservaSeleccionada 
        }, 
        { withCredentials: true }
      );
      
      // Guardar color de la propiedad (usando localStorage)
      if (reservaSeleccionada.property?._id) {
        localStorage.setItem(`colorPropiedad_${reservaSeleccionada.property._id}`, colorPropiedadSeleccionada);
      }
      
      setOpenModal(false);
      obtenerReservas(paginaActual);
      setToast({ msg: "La reserva se ha actualizado correctamente", tipo: "success" });
      setTimeout(() => setToast({}), 3000);
    } catch (error) {
      console.error('Error al guardar cambios de la reserva:', error);
      setToast({ msg: "Error al actualizar la reserva", tipo: "error" });
      setTimeout(() => setToast({}), 3000);
    }
  };

  // Eventos para el calendario
  const eventosCalendario = reservas.map(reserva => ({
    id: reserva._id,
    title: reserva.property?.titulo || 'Sin título',
    start: new Date(reserva.checkIn),
    end: new Date(reserva.checkOut),
    reserva
  }));

  const onSelectEvent = event => {
    handleVerInfo(event.reserva);
  };

  const { msg: toastMsg, tipo: toastTipo } = toast;

  return (
    <section className="py-10 px-10">
      {toastMsg && <Notificacion notificacion={{ msg: toastMsg, tipo: toastTipo }} />}
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold uppercase">Reservas</h1>
        <Link className='bg-lime-600 p-2 text-white rounded-lg text-center text-xs hover:bg-lime-700' to="/admin/adminReservas">
          Agregar Reserva
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto items-start">
        {/* Calendario a la izquierda */}
        <div className="w-full md:w-2/5 bg-white rounded-lg shadow-lg p-4">
          <BigCalendar
            localizer={localizer}
            events={eventosCalendario}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={(event) => {
              const backgroundColor = localStorage.getItem(`colorPropiedad_${event.reserva.property?._id}`) || '#f87171';
              return {
                style: {
                  backgroundColor,
                  color: 'white',
                  borderRadius: '6px',
                  border: 'none',
                }
              };
            }}
            onSelectEvent={onSelectEvent}
            views={['month']}
            popup
            messages={messages}
          />
        </div>

        {/* Tabla de reservas */}
        <div className="w-full md:w-3/5 overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-sm bg-white dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-4 text-center">Cliente</th>
                <th className="p-4 text-center">Propiedad</th>
                <th className="p-4 text-center">Fecha Desde</th>
                <th className="p-4 text-center">Fecha Hasta</th>
                <th className="p-4 text-center">Estado</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length > 0 ? (
                reservas.map((reserva, index) => (
                  <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-4 text-center">{`${reserva.name} ${reserva.lastName}`}</td>
                    <td className="p-4 text-center">{reserva.property?.titulo || 'Propiedad no disponible'}</td>
                    <td className="p-4 text-center">{new Date(reserva.checkIn).toLocaleDateString()}</td>
                    <td className="p-4 text-center">{new Date(reserva.checkOut).toLocaleDateString()}</td>
                                    <td className="p-4 text-center">
                      {reserva.status === 'Confirmada' && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center">
                          <HiCheckCircle className="w-4 h-4 mr-1" />
                          Confirmada
                        </span>
                      )}
                      {reserva.status === 'Pendiente' && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 inline-flex items-center">
                          <HiClock className="w-4 h-4 mr-1" />
                          Pendiente
                        </span>
                      )}
                      {reserva.status === 'Cancelada' && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 inline-flex items-center">
                          <HiXCircle className="w-4 h-4 mr-1" />
                          Cancelada
                        </span>
                      )}
                      {(!reserva.status || !['Confirmada', 'Pendiente', 'Cancelada'].includes(reserva.status)) && (
                         <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 inline-flex items-center">
                           <HiClock className="w-4 h-4 mr-1" />
                           Pendiente
                         </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className='p-2' onClick={() => handleVerInfo(reserva)}>
                          <BiInfoCircle className='text-3xl text-blue-700 hover:text-blue-800 m-auto' title='Ver información' />
                        </button>
                        <button className='p-2' onClick={() => navigate(`/admin/adminReservas/${reserva._id}`)}>
                          <BiEdit className='text-3xl text-cyan-700 hover:text-cyan-800 m-auto' title='Editar' />
                        </button>
                        <button
                          className='p-2'
                          onClick={() => {
                            setOpenModalEliminar(true);
                            setReservaSeleccionada(reserva);
                          }}
                        >
                          <BiTrash className='text-3xl text-red-600 hover:text-red-500 m-auto' title='Eliminar' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center">No hay reservas disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-3 items-center">
        <div>
          <Button
            className="ml-0"
            onClick={() => {
              const nuevaPagina = Math.max(1, paginaActual - 1);
              setPaginaActual(nuevaPagina);
            }}
            disabled={paginaActual === 1}
          >
            Anterior
          </Button>
        </div>
        <div className="text-center">
          Página {paginaActual} de {totalPaginas}
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              const nuevaPagina = Math.min(totalPaginas, paginaActual + 1);
              setPaginaActual(nuevaPagina);
            }}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </Button>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <Modal show={openModalEliminar} size="md" onClose={() => setOpenModalEliminar(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-800">
              ¿Estás segur@ de que quieres eliminar esta reserva?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => eliminarReserva(reservaSeleccionada?._id)}>
                Si, estoy segur@
              </Button>
              <Button color="gray" onClick={() => setOpenModalEliminar(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
        <Modal.Header>Información de la Reserva</Modal.Header>
        <Modal.Body>
          {reservaSeleccionada && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Cliente</h3>
                <p>{reservaSeleccionada.name} {reservaSeleccionada.lastName}</p>
              </div>
              <div>
                <h3 className="font-semibold">Contacto</h3>
                <p>Email: {reservaSeleccionada.email}</p>
                <p>Teléfono: {reservaSeleccionada.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Propiedad</h3>
                <Select
                  id="propiedad"
                  value={datosFormulario.propiedadId || ""}
                  onChange={(e) => {
                    const propiedadSeleccionada = propiedades.find(p => p._id === e.target.value);
                    setDatosFormulario({
                      ...datosFormulario,
                      propiedadId: e.target.value,
                      propiedad: propiedadSeleccionada ? propiedadSeleccionada.titulo : ''
                    });
                  }}
                  required
                >
                  <option value="">Selecciona una propiedad</option>
                  {propiedades.map((propiedad) => (
                    <option key={propiedad._id} value={propiedad._id}>
                      {propiedad.titulo}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <h3 className="font-semibold">Fechas</h3>
                <p>Entrada: {new Date(reservaSeleccionada.checkIn).toLocaleDateString()}</p>
                <p>Salida: {new Date(reservaSeleccionada.checkOut).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Estado</h3>
                {reservaSeleccionada.status === 'Confirmada' && (
                  <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 inline-flex items-center">
                    <HiCheckCircle className="w-4 h-4 mr-1" />
                    Confirmada
                  </span>
                )}
                {reservaSeleccionada.status === 'Pendiente' && (
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 inline-flex items-center">
                    <HiClock className="w-4 h-4 mr-1" />
                    Pendiente
                  </span>
                )}
                {reservaSeleccionada.status === 'Cancelada' && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 inline-flex items-center">
                    <HiXCircle className="w-4 h-4 mr-1" />
                    Cancelada
                  </span>
                )}
                {(!reservaSeleccionada.status || !['Confirmada', 'Pendiente', 'Cancelada'].includes(reservaSeleccionada.status)) && (
                   <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 inline-flex items-center">
                     <HiClock className="w-4 h-4 mr-1" />
                     Pendiente
                   </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold">Cambiar Estado</h3>
                <select 
                  value={estadoReservaSeleccionada}
                  onChange={(e) => setEstadoReservaSeleccionada(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
              <div>
                <h3 className="font-semibold">Color de Eventos para esta Propiedad</h3>
                <input 
                  type="color" 
                  value={colorPropiedadSeleccionada}
                  onChange={(e) => setColorPropiedadSeleccionada(e.target.value)}
                  className="mt-1 block w-full h-10"
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleGuardarCambiosInfo}>Guardar Cambios</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default TablaReservas;