import HeaderPrincipal from "../layout/HeaderPrincipal";
import Footer from "../layout/Footer";
import CardFoto from "../components/CardFoto";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {

  const [propiedadesMostrar, setPropiedadesMostrar] = useState([]);

  useEffect(() => {
    cargarPropiedadesMostrar();
  },[])

  const cargarPropiedadesMostrar = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/propiedades`)

      const visibles = response.data.propiedades.filter(p => p.visibilidad === true).slice(-3)
      setPropiedadesMostrar(visibles)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <HeaderPrincipal  />

      <section className=" py-10">
        <div className="w-10/12 m-auto grid grid-cols-1 justify-center items-center gap-5 lg:grid-cols-2">
          <div className="text-center lg:text-left ">
            <h2 className="uppercase text-3xl md:text-5xl font-bold  mb-5">
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
      <section className="bg-zinc-200 py-10">
        <div className="w-10/12 m-auto lg:w-11/12">
          <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5">

            {propiedadesMostrar.map((propiedad,index) => (
                <CardFoto
                key={propiedad._id}
                imagen={`http://localhost:5000${propiedad.imagenes[0]}`}
                titulo={propiedad.titulo}
                clasesTitulo={`${((index+1)%2 === 0 )? 'text-rose-600': 'text-cyan-600'} text-xl`}
                parrafo={propiedad.descripcionBreve}
                link ={`/propiedades/propiedad/${propiedad._id}`}

              />
            ))}
            
            <div className="shadow-lg rounded-lg banner banner--bg_1 transform transition duration-300 hover:scale-110">
              <Link
                to="/propiedades"
                className="w-full h-full flex justify-center  rounded-lg  items-center bg-white  bg-opacity-30 hover:bg-black hover:bg-opacity-40 "
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
        <div className="bg-zinc-900 bg-opacity-70 text-white py-20 flex flex-col justify-center items-center text-center">
          <p className="text-xl lg:text-4xl font-bold w-8/12 m-auto ">
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
        <h2 className="text-center uppercase text-3xl w-10/12 m-auto font-bold lg:text-4xl mb-4">
          {" "}
          <span className="text-rose-600">Potencia </span>tus{" "}
          <span className="text-cyan-600">vacaciones</span> con nosotros porque...
        </h2>
        <div className="w-9/12 m-auto grid grid-cols-1 gap-3 lg:grid-cols-3 lg:items-center text-center">
          <div className="my-3">
            <img
              src="/images/image_21.jpg"
              className="rounded-full shadow-lg border-4 border-white w-4/5 m-auto"
              alt="..."
            />
            <p className="text-md mt-3">
            Nuestras propiedades están diseñadas para brindar comodidad a familias y grupos de amigos.
            Con amplios espacios y comodidades de primer nivel, podrás relajarte y disfrutar al máximo de tus vacaciones.
            </p>
          </div>
          <div className="text-2xl font-semibold italic text-center mb-5 ">
            <p className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-rose-600 relative inline-block">
              <span className="relative text-white text-6xl px-2">&</span>
            </p>
          </div>
          <div className="my-3">
            <img
              src="/images/image_1.jpg"
              className="rounded-full shadow-lg border-4 border-white w-4/5 m-auto"
              alt="..."
            />
            <p className=" text-md my-3">
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
