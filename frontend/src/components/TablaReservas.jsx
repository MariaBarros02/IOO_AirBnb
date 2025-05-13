import React, { useState, useEffect } from 'react';
import { Button, Modal, Label, TextInput, ModalHeader, ModalBody } from 'flowbite-react';
import axios from 'axios';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Notificacion from './Notificacion.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { BiEdit, BiTrash, BiInfoCircle } from 'react-icons/bi';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

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
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    obtenerReservas();
  }, [paginaActual]);

  const obtenerReservas = async (pagina = 1) => {
    try {
      console.log('Obteniendo reservas...');
      const response = await axios.get(`http://localhost:5000/admin/reservas?page=${pagina}&limit=10`, {
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
      setToast({ msg: "Se ha eliminado la reserva correctamente" });
      setTimeout(() => setToast({}), 5000);
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  const handleVerInfo = (reserva) => {
    setReservaSeleccionada(reserva);
    setOpenModal(true);
  };

  // Eventos para el calendario
  const eventos = reservas.map(reserva => ({
    id: reserva._id,
    title: reserva.property?.titulo || 'Sin título',
    start: new Date(reserva.checkIn),
    end: new Date(reserva.checkOut),
    reserva
  }));

  const onSelectEvent = event => {
    handleVerInfo(event.reserva);
  };

  const { msg: toastMsg } = toast;

  return (
    <section className="py-10 px-10">
      {msg && <Notificacion notificacion={toast} />}
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
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={() => ({
              style: {
                backgroundColor: '#f87171',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
              }
            })}
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
                    <td className="p-4 text-center capitalize">{reserva.status || 'Pendiente'}</td>
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
      <div className="flex justify-around items-center mt-6">
        <Button
          className="ml-5"
          onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
          disabled={paginaActual === 1}
        >
          Anterior
        </Button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <Button
          onClick={() => setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </Button>
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
                <p>{reservaSeleccionada.property?.titulo}</p>
              </div>
              <div>
                <h3 className="font-semibold">Fechas</h3>
                <p>Entrada: {new Date(reservaSeleccionada.checkIn).toLocaleDateString()}</p>
                <p>Salida: {new Date(reservaSeleccionada.checkOut).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Estado</h3>
                <p>{reservaSeleccionada.status}</p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default TablaReservas;