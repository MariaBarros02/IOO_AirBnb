import HeaderPrincipal from "../layout/HeaderPrincipal";
import Footer from "../layout/Footer";
import CardFoto from "../components/CardFoto";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {

  const [propiedadesMostrar, setPropiedadesMostrar] = useState([]);

  useEffect(() => {
    cargarPropiedadesMostrar();
  },[])

  const cargarPropiedadesMostrar = async () => {
    try {
      const response = await axios.get(`https://ioo-airbnb.onrender.com/admin/propiedades`)

      const visibles = response.data.propiedades.filter(p => p.visibilidad === true).slice(-3)
      setPropiedadesMostrar(visibles)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <HeaderPrincipal  />

      <section className="py-10 ">
        <div className="grid items-center justify-center w-10/12 grid-cols-1 gap-5 m-auto lg:grid-cols-2">
          <div className="text-center lg:text-left ">
            <h2 className="mb-5 text-3xl font-bold uppercase md:text-5xl">
              Encuentra aquí tu <span className="text-cyan-700">próximo hogar </span>for
              cuando viajes...
            </h2>
            <p className="md:text-lg">
            Nuestros alojamientos te ofrecen todo lo que necesitas para descansar y relajarte. Contamos con conexión Wi-Fi eficiente, servicios de agua y energía, atención al cliente, y espacios limpios y frescos pensados para tu comodidad.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <img src="/propiedades/id_1/2.jpg" alt="propiedad_1" />
            <img src="/propiedades/id_1/4.jpg" alt="propiedad_2" />
            <img src="/propiedades/id_2/2.jpg" alt="propiedad_3" />
            <img src="/propiedades/id_2/4.jpg" alt="propiedad_4" />
          </div>
        </div>
      </section>

      {propiedadesMostrar.length > 2 ? (
      <section className="py-10 bg-zinc-200">
        <div className="w-10/12 m-auto lg:w-11/12">
          <div className="grid grid-cols-1 gap-8 my-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">

            {propiedadesMostrar.map((propiedad,index) => (
                <CardFoto
                key={propiedad._id}
                imagen={`${API_URL}${propiedad.imagenes[0]}`}
                titulo={propiedad.titulo}
                clasesTitulo={`${((index+1)%2 === 0 )? 'text-rose-600': 'text-cyan-600'} text-xl`}
                parrafo={propiedad.descripcionBreve}
                link ={`/propiedades/propiedad/${propiedad._id}`}

              />
            ))}
            
            <div className="transition duration-300 transform rounded-lg shadow-lg banner banner--bg_1 hover:scale-110">
              <Link
                to="/propiedades"
                className="flex items-center justify-center w-full h-full bg-white rounded-lg bg-opacity-30 hover:bg-black hover:bg-opacity-40 "
              >
                <svg
                  className="w-[70px] h-[70px] text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      ) : (<div></div>)}
      <section className="banner banner--bg_2 ">
        <div className="flex flex-col items-center justify-center py-20 text-center text-white bg-zinc-900 bg-opacity-70">
          <p className="w-8/12 m-auto text-xl font-bold lg:text-4xl ">
          ¿Te ha gustado alguno de nuestros alojamientos?
          ¡Te invitamos a contactarnos para que puedas alquilar tu favorito!
          </p>
          <Button
            className="mt-5 font-bold"
            size="lg"
            href="mailto:correo@tuempresa.com"
          >
            CONTÁCTANOS
          </Button>
        </div>
      </section>

      <section className="py-16 bg-zinc-200 ">
        <h2 className="w-10/12 m-auto mb-4 text-3xl font-bold text-center uppercase lg:text-4xl">
          {" "}
          <span className="text-rose-600">Potencia </span>tus{" "}
          <span className="text-cyan-600">vacaciones</span> con nosotros porque...
        </h2>
        <div className="grid w-9/12 grid-cols-1 gap-3 m-auto text-center lg:grid-cols-3 lg:items-center">
          <div className="my-3">
            <img
              src="/images/image_21.jpg"
              className="w-4/5 m-auto border-4 border-white rounded-full shadow-lg"
              alt="..."
            />
            <p className="mt-3 text-md">
            Nuestras propiedades están diseñadas para brindar comodidad a familias y grupos de amigos.
            Con amplios espacios y comodidades de primer nivel, podrás relajarte y disfrutar al máximo de tus vacaciones.
            </p>
          </div>
          <div className="mb-5 text-2xl italic font-semibold text-center ">
            <p className="relative inline-block before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-rose-600">
              <span className="relative px-2 text-6xl text-white">&</span>
            </p>
          </div>
          <div className="my-3">
            <img
              src="/images/image_1.jpg"
              className="w-4/5 m-auto border-4 border-white rounded-full shadow-lg"
              alt="..."
            />
            <p className="my-3 text-md">
            Nuestro equipo está comprometido a asistirte con cualquier necesidad o inquietud durante tu estadía, asegurando que tu experiencia sea fluida y placentera de principio a fin.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
