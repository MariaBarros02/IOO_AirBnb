import HeaderPrincipal from "../layout/HeaderPrincipal"
import { TbLocationPin, TbHomeSignal } from "react-icons/tb";
import { LuCalendarCheck2 } from "react-icons/lu";
import { RiUserHeartLine } from "react-icons/ri";
import Footer from "../layout/Footer"
import { Carousel } from "flowbite-react"

const Guests = () => {
  return (
    <>
      <HeaderPrincipal
      />
      <section className=" py-10">
        <div className="w-10/12 m-auto grid grid-cols-1 gap-8 items-center md:grid-cols-3">
          <img className="rounded-full m-auto" src="/images/image_3.jpg" alt="guests" />
          <div className=" text-center md:col-span-2">
            <h2 className="text-3xl font-bold uppercase mb-3  lg:text-5xl">¡Bienvenidos, <span className="text-cyan-600">huéspedes!</span></h2>
            <p className="">Estamos encantados de ofrecerte el hogar perfecto lejos de casa. Ya sea que estés aquí por negocios, placer o una mezcla de ambos, nuestras propiedades te brindan una comodidad y conveniencia inigualables. En Marketoak, nos complace ofrecerte el lugar ideal para tu estadía.
            ¿Listo para vivir lo mejor en estancias a corto plazo? Echa un vistazo a nuestras propiedades aquí y ¡reserva tu estadía hoy mismo!
            </p>
          </div>

        </div>
      </section>
      <section >
        <div className="guest__carousel banner banner--bg_4 ">
          <Carousel className="bg-zinc-900 bg-opacity-50">
            <div className="w-8/12 grid grid-cols-1 md:grid-cols-3 items-center bg-white rounded-lg shadow m-auto lg:w-6/12">
              <img className="w-auto object-cover rounded-t-lg md:h-full md:rounded-none md:rounded-s-lg" src="/images/image_25.jpg" alt="" />
              <div className="flex flex-col justify-between p-4 leading-normal md:col-span-2">
                <h5 className="mb-2 md:text-2xl font-bold ">Estancias Pet-Friendly: Lleva a tus amigos peludos para una escapada perfecta</h5>
                <p className="mb-3 text-xs font-normal md:text-base">En nuestras propiedades, damos la bienvenida a las mascotas, asegurando que toda tu familia, incluidos los miembros de cuatro patas, puedan disfrutar de una estadía relajante y agradable. Relájate sabiendo que tus mascotas estarán tan cómodas como tú.</p>
              </div>
            </div>
            <div className="w-8/12 grid grid-cols-1 md:grid-cols-3 items-center bg-white rounded-lg shadow m-auto lg:w-6/12">
              <img className="w-auto object-cover rounded-t-lg md:h-full md:rounded-none md:rounded-s-lg" src="/images/image_26.jpg" alt="" />
              <div className="flex flex-col justify-between p-4 leading-normal md:col-span-2">
                <h5 className="mb-2 md:text-2xl font-bold ">Diseño Espacioso y Moderno: Disfruta de la mezcla perfecta de confort y estilo</h5>
                <p className="mb-3 text-xs font-normal md:text-base">Nuestra propiedad cuenta con un diseño espacioso y moderno, ofreciendo la combinación ideal de confort y estilo. Con áreas de estar de concepto abierto, muebles elegantes y acabados de alta calidad, podrás relajarte y desconectarte en un espacio bellamente diseñado que se siente como en casa.</p>
              </div>
            </div>
            <div className="w-8/12 grid grid-cols-1 md:grid-cols-3 items-center bg-white rounded-lg shadow m-auto lg:w-6/12">
              <img className="w-auto object-cover rounded-t-lg md:h-full md:rounded-none md:rounded-s-lg" src="/images/image_27.jpg" alt="" />
              <div className="flex flex-col justify-between p-4 leading-normal md:col-span-2">
                <h5 className="mb-2 md:text-2xl font-bold ">Habitaciones Acogedoras: Duerme plácidamente en habitaciones diseñadas para relajarte</h5>
                <p className="mb-3 text-xs font-normal md:text-base">Nuestra propiedad cuenta con habitaciones acogedoras y cómodas, equipadas con ropa de cama de alta calidad y detalles pensados para garantizar un descanso reparador. Ya sea que estés aquí para una estancia corta o una visita prolongada, apreciarás la atmósfera tranquila y la atención al detalle en cada habitación.</p>
              </div>
            </div>
          </Carousel>
        </div>


      </section>


      <section className="">

        <div className="grid grid-cols-1 lg:grid-cols-3 " >
          <img src="/images/image_7.jpg" alt="..." className="h-full object-cover" />
          <div className="col-span-2 py-10 w-10/12 m-auto text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold my-5 mb-10 uppercase">Disfruta de una<span className="text-cyan-600"> Comodidad</span> y <span
              className="text-rose-600">Conveniencia</span> inigualable</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
              <div className="">
                <TbLocationPin className="text-5xl m-auto md:m-0"/>
                <h3 className="font-bold uppercase text-2xl mb-3">Ubicaciones Privilegiadas</h3>
                <p className="text-sm">
                Nuestras propiedades están situadas en las mejores zonas, por lo que siempre estarás cerca de la acción. Ya sea que desees explorar vibrantes centros urbanos, relajarte en playas pintorescas o experimentar el encanto de barrios pintorescos, nuestras ubicaciones te colocan justo donde quieres estar. Disfruta de fácil acceso a atracciones populares, restaurantes de moda, centros comerciales y transporte público. Nunca te perderás de nada gracias a nuestras propiedades estratégicamente ubicadas, que te permiten disfrutar de todo lo que la zona tiene para ofrecer.
                </p>
              </div>
              <div>
                <TbHomeSignal className="text-5xl m-auto md:m-0"/>
                <h3 className="font-bold uppercase text-2xl my-5">Servicios de Primera Calidad</h3>
                <p className="text-sm">
                Disfruta de Wi-Fi de alta velocidad, cocinas totalmente equipadas, camas cómodas y mucho más. Sabemos que los pequeños detalles pueden marcar una gran diferencia en tu estadía. Conéctate sin problemas con nuestro Wi-Fi de alta velocidad, ideal tanto para trabajar como para entretenerse. Prepara tus comidas favoritas en nuestras cocinas modernas, equipadas con todos los electrodomésticos y utensilios necesarios. Descansa plácidamente en nuestras cómodas camas diseñadas para un sueño reparador.
                </p>
              </div>
              <div>
                <LuCalendarCheck2 className="text-5xl m-auto md:m-0" />
                <h3 className="font-bold uppercase text-2xl my-5" >Flexibilidad                </h3>
                <p className="text-sm">
                Ofrecemos opciones de reserva flexibles que se adaptan a tu horario. Ya sea que necesites una estancia corta de unos días o una estadía prolongada de varias semanas, tenemos opciones que se ajustan a tus necesidades. Nuestro sistema de reservas fácil de usar te permite reservar tu estadía, modificar tus fechas o extender tu visita con solo unos clics. Además, nuestros precios competitivos y ofertas especiales garantizan que obtengas la mejor relación calidad-precio.
                </p>
              </div>

              <div>
                < RiUserHeartLine className="text-5xl m-auto md:m-0"  />
                <h3 className="font-bold uppercase text-2xl my-5">Servicio Personalizado</h3>
                <p className="text-sm">
                Nuestro amable personal siempre está disponible para asistirte y asegurarse de que tengas una estancia placentera. Nos enorgullecemos de ofrecer un servicio personalizado que va más allá de lo esperado. Desde el momento en que reservas, nuestro equipo dedicado está disponible para responder tus preguntas, brindarte recomendaciones locales y ayudarte con cualquier solicitud especial. Estamos aquí para que tu estadía sea lo más cómoda y agradable posible.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>


      <Footer />
    </>
  )
}

export default Guests