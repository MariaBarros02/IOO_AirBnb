import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MapByAddress from "../components/MapByAddress";
import HeaderPrincipal from "../layout/HeaderPrincipal";
import Footer from "../layout/Footer"
import { Carousel, Button, Timeline, Breadcrumb } from "flowbite-react";
import { HiArrowNarrowRight, HiHome } from "react-icons/hi";

const Property = () => {

  const { idPropiedad } = useParams();

  const [propiedad, setPropiedad] = useState();
  const [inventario, setInventario] = useState();

  useEffect(() => {
    cargarPropiedad();

  }, []);


  const cargarPropiedad = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/propiedad/${idPropiedad}`, {
        withCredentials: true,
      })
      setPropiedad(response.data);
      setInventario(response.data.inventario)

      console.log(response.data.inventario)
    } catch (error) {
      console.log(error)
    }
  }

  if (!propiedad) return <p className="text-center mt-10">Cargando propiedad...</p>;

  return (
    <>
      <HeaderPrincipal
      />
      <section className="pt-16 pb-10 bg-zinc-100">
        <div className="w-10/12 m-auto">

          <Breadcrumb className="mb-5 hidden md:block" aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="/" icon={HiHome}>
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/propiedades">Propiedades</Breadcrumb.Item>
            <Breadcrumb.Item>{propiedad.titulo}</Breadcrumb.Item>
          </Breadcrumb>
          <h2 className="text-2xl md:text-5xl font-bold mb-5">{propiedad.titulo}</h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            <div className=" lg:col-span-3">

              <div className="h-56 md:h-96">
                <Carousel>
                  {
                    propiedad.imagenes.map((imagen, index) => (
                      <img src={`http://localhost:5000${imagen}`} alt="..." key={index} />
                    )
                    )}
                </Carousel>


              </div>


              <Button className="w-full my-5 uppercase font-bold tracking-widest block" outline gradientDuoTone="cyanToBlue" size="xl" href="#" target="_blank">
                Contáctanos para consultar disponibilidad
              </Button>


            </div>

            <div className="bg-white p-5 shadow-xl lg:mt-0 rounded-md lg:col-span-2 ">
              <p className="text-xl  ">!Bienvenido a tu escapada cultural en <span className="text-cyan-600">{propiedad.ciudad}</span> en {propiedad.barrio}!</p>
              <MapByAddress city={propiedad.ciudad} neighborhood={propiedad.barrio} />
              <p >{propiedad.descripcionCompleta}</p>
            </div>
          </div>
        </div>
      </section>
      <section className=" py-10">
        <div className="w-10/12 m-auto">
          <p className="text-4xl font-bold my-5">Durante tu estancia, <span className="text-cyan-600"> podrás disfrutar</span> de...</p>
          <Timeline horizontal >
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-zinc-700">Sala</Timeline.Time>
                <Timeline.Title className=" font-bold text-xl">Tendrás un excelente lugar para disfrutar de momentos divertidos e inolvidables después de un día ajetreado o una salida.</Timeline.Title>
                <Timeline.Body className="text-zinc-700" >

                  <p>
                    {inventario.entretenimiento
                      .filter(e => e.existencia)
                      .map(e => e.nombre)
                      .join(", ")}
                  </p>
                </Timeline.Body>

              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-zinc-700">Habitaciones</Timeline.Time>
                <Timeline.Title>Descansa en una de estas cómodas habitaciones, cuidadosamente diseñadas y amuebladas para ofrecerte todo lo que necesitas.</Timeline.Title>
                <Timeline.Body className="text-zinc-700">
                  <p>
                    {inventario.habitaciones
                      .filter(e => e.existencia)
                      .map(e => e.nombre)
                      .join(", ")}
                  </p>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-zinc-700">Cocina</Timeline.Time>
                <Timeline.Title >La cocina equipada cuenta con una amplia variedad de electrodomésticos de alta gama, encimeras espaciosas y un mesón central.</Timeline.Title>
                <Timeline.Body className="text-zinc-700">
                  <p>
                    {inventario.cocina
                      .filter(e => e.existencia)
                      .map(e => e.nombre)
                      .join(", ")}
                  </p>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-zinc-700">Baños</Timeline.Time>
                <Timeline.Title >El apartamento cuenta con un baño relajante, con toallas limpias y artículos de tocador básicos para garantizar la máxima comodidad y conveniencia.</Timeline.Title>
                <Timeline.Body className="text-zinc-700">
                  <p>
                    {inventario.bano
                      .filter(e => e.existencia)
                      .map(e => e.nombre)
                      .join(", ")}
                  </p>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>

      </section>
      <Footer />
    </>
  )
}

export default Property