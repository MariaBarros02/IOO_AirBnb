import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Select, Modal, ModalBody } from 'flowbite-react';
import { HiCheckCircle } from 'react-icons/hi';
import HeaderAdministrador from '../layout/HeaderAdministrador';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/es';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import { parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

moment.locale('es');

const localizer = momentLocalizer(moment);

const AdminReservas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState();
  const [propiedades, setPropiedades] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    email: '',
    propiedad: '',
    propiedadId: '',
    fechaDesde: '',
    fechaHasta: ''
  });

  const [errorFecha, setErrorFecha] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [disponible, setDisponible] = useState(null);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [erroresCampos, setErroresCampos] = useState({});
  const [mensajePropiedad, setMensajePropiedad] = useState('');
  const [mensajeFecha, setMensajeFecha] = useState('');
  const [telefonoInvalido, setTelefonoInvalido] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  useEffect(() => {
    // Cargar propiedades al montar el componente
    const obtenerPropiedades = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/propiedades', {
          withCredentials: true
        });
        setPropiedades(response.data.propiedades || []);
      } catch (error) {
        console.error('Error al obtener propiedades:', error);
      }
    };
    obtenerPropiedades();
  }, []);

  const capitalizarPalabra = (palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
  };

  const handleNombreChange = (e, campo) => {
    const valor = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setDatosFormulario(prev => ({
      ...prev,
      [campo]: capitalizarPalabra(valor)
    }));
    setErroresCampos(prev => ({ ...prev, [campo]: '' }));
  };

  const handleTelefonoChange = (e) => {
    const valor = e.target.value.replace(/\D/g, '').slice(0, 10);
    setDatosFormulario(prev => ({
      ...prev,
      telefono: valor
    }));
    setErroresCampos(prev => ({ ...prev, telefono: '' }));
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setDatosFormulario(prev => ({ ...prev, email }));
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setErrorEmail('Por favor, ingrese un email válido');
    } else {
      setErrorEmail('');
    }
    setErroresCampos(prev => ({ ...prev, email: '' }));
  };

  const handleFechaChange = (e) => {
    const { id, value } = e.target;
    const fechaActual = new Date().toISOString().split('T')[0];

    // Validar que la fecha no sea anterior a la fecha actual
    if (value < fechaActual) {
      setErrorFecha('La fecha no puede ser anterior a la fecha actual');
      return;
    }

    setDatosFormulario(prev => {
      const nuevosDatos = { ...prev, [id]: value };
      
      // Validar fechas
      if (id === 'fechaHasta' && nuevosDatos.fechaDesde && value < nuevosDatos.fechaDesde) {
        setErrorFecha('La fecha de salida no puede ser anterior a la fecha de entrada');
        return { ...prev, fechaHasta: '' };
      } else if (id === 'fechaDesde' && nuevosDatos.fechaHasta && value > nuevosDatos.fechaHasta) {
        setErrorFecha('La fecha de entrada no puede ser posterior a la fecha de salida');
        return { ...prev, fechaDesde: '' };
      }
      
      setErrorFecha('');
      return nuevosDatos;
    });
    setErroresCampos(prev => ({ ...prev, [id]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    setTelefonoInvalido(false);

    // Validación personalizada solo para email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datosFormulario.email)) {
      setError('Por favor, ingrese un email válido');
      setEnviando(false);
      return;
    }

    // Validación personalizada para teléfono
    if (!datosFormulario.telefono || datosFormulario.telefono.length !== 10) {
      setTelefonoInvalido(true);
      setEnviando(false);
      const telefonoInput = document.getElementById('telefono');
      if (telefonoInput) telefonoInput.focus();
      return;
    }

    try {
      const datosFormateados = {
        name: `${datosFormulario.primerNombre.trim()} ${datosFormulario.segundoNombre?.trim() || ''}`.trim(),
        lastName: `${datosFormulario.primerApellido.trim()} ${datosFormulario.segundoApellido?.trim() || ''}`.trim(),
        phone: Number(datosFormulario.telefono),
        email: datosFormulario.email.trim(),
        property: datosFormulario.propiedadId,
        checkIn: new Date(datosFormulario.fechaDesde + 'T00:00:00.000Z').toISOString(),
        checkOut: new Date(datosFormulario.fechaHasta + 'T23:59:59.999Z').toISOString(),
        estado: 'Confirmada'
      };

      if (id) {
        // Editar reserva existente
        await axios.put(`http://localhost:5000/admin/reservas/${id}`, datosFormateados, { withCredentials: true });
        setOpenModal(true);
        setTimeout(() => {
          setOpenModal(false);
          navigate('/admin', {
            state: {
              success: 'Reserva actualizada correctamente'
            }
          });
        }, 3000);
      } else {
        // Crear nueva reserva
        await axios.post('http://localhost:5000/admin/reservas', datosFormateados, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setOpenModal(true);
        setTimeout(() => {
          setOpenModal(false);
          navigate('/admin', {
            state: {
              success: id ? 'Reserva actualizada correctamente' : 'Reserva creada correctamente'
            }
          });
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear la reserva. Por favor, verifique los datos ingresados.');
    } finally {
      setEnviando(false);
    }
  };

  const verificarDisponibilidad = async () => {
    if (!datosFormulario.propiedadId) {
      setMensajePropiedad('Selecciona la propiedad a consultar');
      setTimeout(() => setMensajePropiedad(''), 3000);
      return;
    }
    if (!datosFormulario.fechaDesde || !datosFormulario.fechaHasta) {
      setMensajeFecha('Selecciona ambas fechas para consultar disponibilidad');
      setTimeout(() => setMensajeFecha(''), 3000);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/admin/reservas/verificar-disponibilidad', {
        property: datosFormulario.propiedadId,
        checkIn: datosFormulario.fechaDesde,
        checkOut: datosFormulario.fechaHasta
      });
      setDisponible(response.data.disponible);
    } catch (error) {
      setDisponible(false);
      alert("Error al verificar disponibilidad");
    }
  };

  useEffect(() => {
    if (id && propiedades.length > 0) {
      axios.get(`http://localhost:5000/admin/reservas/${id}`, { withCredentials: true })
        .then(res => {
          const reserva = res.data;
          // Separar el nombre completo en primer y segundo nombre
          const nombres = reserva.name.split(' ');
          const primerNombre = nombres[0] || '';
          const segundoNombre = nombres.slice(1).join(' ') || '';

          // Separar el apellido completo en primer y segundo apellido
          const apellidos = reserva.lastName.split(' ');
          const primerApellido = apellidos[0] || '';
          const segundoApellido = apellidos.slice(1).join(' ') || '';

          // Formatear las fechas para el input type="date"
          const fechaDesde = new Date(reserva.checkIn).toISOString().split('T')[0];
          const fechaHasta = new Date(reserva.checkOut).toISOString().split('T')[0];

          setDatosFormulario({
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            telefono: reserva.phone.toString(),
            email: reserva.email,
            propiedadId: typeof reserva.property === 'object' ? reserva.property._id : reserva.property,
            propiedad: '',
            fechaDesde,
            fechaHasta
          });
        })
        .catch(err => {
          console.error('Error al cargar la reserva:', err);
          setError('Error al cargar los datos de la reserva');
        });
    }
  }, [id, propiedades]);

  useEffect(() => {
    if (datosFormulario.propiedadId && propiedades.length > 0) {
      const propiedadEncontrada = propiedades.find(p => p._id === datosFormulario.propiedadId);
      if (propiedadEncontrada) {
        setDatosFormulario(prev => ({
          ...prev,
          propiedad: propiedadEncontrada.titulo
        }));
      }
    }
  }, [propiedades, datosFormulario.propiedadId]);

  useEffect(() => {
    if (datosFormulario.propiedadId) {
      const propiedadId = typeof datosFormulario.propiedadId === 'object' ? datosFormulario.propiedadId._id : datosFormulario.propiedadId;
      console.log('Fetching reservations for property ID:', propiedadId);
      axios.get(`http://localhost:5000/admin/reservas/ocupadas/${propiedadId}`)
        .then(res => {
          console.log('API response for reservations:', res.data);
          const eventosTransformados = res.data.map(r => ({
            title: 'Reservado',
            start: parseISO(r.checkIn), 
            end: parseISO(r.checkOut),   
            allDay: true,
          }));
          setEventos(eventosTransformados);
        })
        .catch(err => {
          console.error('Error fetching reservations:', err);
          setEventos([]);
        });
    } else {
      setEventos([]);
    }
  }, [datosFormulario.propiedadId]);

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      return fechasOcupadas.some(r => {
        const inicio = new Date(r.checkIn);
        const fin = new Date(r.checkOut);
        return date >= inicio && date <= fin;
      });
    }
    return false;
  };

  // Calcula un array de fechas ocupadas (todas las fechas entre checkIn y checkOut de cada reserva)
  const getFechasOcupadas = () => {
    const fechas = [];
    fechasOcupadas.forEach(r => {
      let current = new Date(r.checkIn);
      const end = new Date(r.checkOut);
      while (current <= end) {
        fechas.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }
    });
    return fechas;
  };

  const fechasOcupadasArray = getFechasOcupadas();

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const fecha = date.toISOString().split('T')[0];
      if (fechasOcupadasArray.includes(fecha)) {
        return 'bg-red-300 text-white'; 
      }
    }
    return null;
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
        <ModalBody>
          <div className="text-center pt-10">
            <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-800">
              La reserva se ha guardado correctamente.
            </h3>
          </div>
        </ModalBody>
      </Modal>
      <HeaderAdministrador />
      <div className='w-11/12 m-auto mt-10'>
        <div className='flex items-center gap-5'>
          <Link
            className='bg-lime-600 text-white rounded-full p-2 text-xl md:text-3xl hover:bg-lime-500'
            title='Regresar'
            to="/admin"
          >
            <BiArrowBack />
          </Link>
          <h1 className='text-4xl font-bold'>
            {id ? "Actualizar Reserva" : "Agregar nueva reserva"}
          </h1>
        </div>
      </div>

      <div className='w-10/12 m-auto mb-5'>
        <form className="p-3 flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className='mt-5 ml-6 text-lg'>Información General</p>
          <div className='border-2 py-3 px-10'>
            <div className='my-2'>
              <div className="mb-2 block">
                <Label htmlFor="nombres" className='text-base uppercase'>Nombres</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  id="primerNombre"
                  type="text"
                  placeholder="Primer Nombre"
                  value={datosFormulario.primerNombre}
                  onChange={(e) => {
                    handleNombreChange(e, 'primerNombre');
                    setErroresCampos(prev => ({ ...prev, primerNombre: '' }));
                  }}
                  required
                />
                {erroresCampos.primerNombre && (
                  <p className="mt-1 text-xs text-red-600">{erroresCampos.primerNombre}</p>
                )}
                <TextInput
                  id="segundoNombre"
                  type="text"
                  placeholder="Segundo Nombre"
                  value={datosFormulario.segundoNombre}
                  onChange={(e) => handleNombreChange(e, 'segundoNombre')}
                />
              </div>
            </div>

            <div className='my-2'>
              <div className="mb-2 block">
                <Label htmlFor="apellidos" className='text-base uppercase'>Apellidos</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  id="primerApellido"
                  type="text"
                  placeholder="Primer Apellido"
                  value={datosFormulario.primerApellido}
                  onChange={(e) => handleNombreChange(e, 'primerApellido')}
                  required
                />
                {erroresCampos.primerApellido && (
                  <p className="mt-1 text-xs text-red-600">{erroresCampos.primerApellido}</p>
                )}
                <TextInput
                  id="segundoApellido"
                  type="text"
                  placeholder="Segundo Apellido"
                  value={datosFormulario.segundoApellido}
                  onChange={(e) => handleNombreChange(e, 'segundoApellido')}
                />
              </div>
            </div>
          </div>

          <p className='mt-5 ml-6 text-lg'>Información de contacto</p>
          <div className='border-2 py-3 px-10'>
            <div className='my-2'>
              <div className="mb-2 block">
                <Label htmlFor="telefono" className='text-base uppercase'>Teléfono</Label>
              </div>
              <TextInput
                id="telefono"
                type="tel"
                placeholder="Teléfono del cliente (10 dígitos)"
                value={datosFormulario.telefono}
                onChange={handleTelefonoChange}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                onInvalid={e => e.target.setCustomValidity('El teléfono debe tener 10 dígitos')}
                onInput={e => e.target.setCustomValidity('')}
              />
            </div>

            <div className='my-2'>
              <div className="mb-2 block">
                <Label htmlFor="email" className='text-base uppercase'>E-mail</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="Email del cliente"
                value={datosFormulario.email}
                onChange={handleEmailChange}
                required
              />
              {errorEmail && (
                <p className="mt-2 text-sm text-red-600">{errorEmail}</p>
              )}
              {erroresCampos.email && (
                <p className="mt-1 text-xs text-red-600">{erroresCampos.email}</p>
              )}
            </div>
          </div>

          <p className='mt-5 ml-6 text-lg'>Información de reserva</p>
          <div className='border-2 py-3 px-10'>
            <div className="mb-6">
              <Label htmlFor="propiedad" className='text-base uppercase'>Propiedad</Label>
              <Select
                id="propiedad"
                value={datosFormulario.propiedadId}
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

            <div className="flex flex-col md:flex-row items-end gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="fechaDesde" className='text-base uppercase'>Desde</Label>
                <TextInput
                  id="fechaDesde"
                  type="date"
                  value={datosFormulario.fechaDesde}
                  onChange={handleFechaChange}
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="fechaHasta" className='text-base uppercase'>Hasta</Label>
                <TextInput
                  id="fechaHasta"
                  type="date"
                  value={datosFormulario.fechaHasta}
                  onChange={handleFechaChange}
                  required
                />
              </div>
              <Button
                className="bg-lime-600 hover:bg-lime-700 text-white uppercase w-full md:w-auto"
                onClick={e => { e.preventDefault(); verificarDisponibilidad(); }}
                type="button"
              >
                Confirmar Disponibilidad
              </Button>
            </div>
            {mensajePropiedad && (
              <p className="mt-2 text-sm text-red-600">{mensajePropiedad}</p>
            )}
            {mensajeFecha && (
              <p className="mt-2 text-sm text-red-600">{mensajeFecha}</p>
            )}
            {errorFecha && (
              <p className="mt-2 text-sm text-red-600">{errorFecha}</p>
            )}
            {erroresCampos.fechaDesde && (
              <p className="mt-1 text-xs text-red-600">{erroresCampos.fechaDesde}</p>
            )}
            {erroresCampos.fechaHasta && (
              <p className="mt-1 text-xs text-red-600">{erroresCampos.fechaHasta}</p>
            )}
            {disponible !== null && (
              <div className="mb-4">
                {disponible ? (
                  <span className="text-green-600 font-bold">¡Disponible!</span>
                ) : (
                  <span className="text-red-600 font-bold">No disponible para esas fechas</span>
                )}
              </div>
            )}
          </div>

          <div className='w-full bg-white rounded-lg shadow-lg p-4 my-6'>
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
              messages={messages}
              views={['month']}
              popup
            />
          </div>

          <div className='flex'>
            <Button
              type="submit"
              className="w-full uppercase"
              size="xl"
              disabled={enviando}
            >
              {enviando ? 'Guardando...' : id ? "Actualizar Reserva" : "Agregar Reserva"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminReservas;