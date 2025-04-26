import HeaderPrincipal from "../layout/HeaderPrincipal"
import Footer from "../layout/Footer"
import CardFoto from "../components/CardFoto"
import { Blockquote, Card } from "flowbite-react"
import { Link } from "react-router-dom"

const AboutUs = () => {
  return (
    <>
      <HeaderPrincipal
        imagen="6"
      />

      <section className=" py-10">
        <div className="w-10/12 m-auto grid grid-cols-1 gap-3 items-center lg:grid-cols-2">

          <img src="/images/image_15.jpg" alt="advisory" className="rounded-full lg:w-4/6 m-auto lg:col-start-2" />
          <div className="row-start-1 text-center " >
            <h2 className="text-4xl font-bold uppercase mb-3 md:text-5xl "><span className="text-cyan-600">sobre</span> nosotros</h2>
            <p className="">En el corazón de nuestra empresa hay una historia de pasión por la hospitalidad y visión innovadora. Todo comenzó cuando un grupo de profesionales del sector inmobiliario y turístico identificó una necesidad común: conectar propiedades excepcionales con huéspedes exigentes, ofreciendo experiencias memorables mientras los propietarios disfrutaban de ingresos pasivos sin complicaciones.

              Con años de experiencia acumulada en gestión de propiedades, marketing digital y servicio al cliente, decidimos crear una plataforma diferente. Una donde la tecnología inteligente se combina con el toque humano, donde cada propiedad cuenta una historia única y cada huésped se siente como en casa.

              Lo que empezó como un proyecto local hoy es una red en expansión, uniendo propietarios y viajeros con un mismo objetivo: experiencias auténticas, rentabilidad asegurada y servicio impecable. Nuestro equipo multicultural - formado por expertos en bienes raíces, especialistas en hospitalidad y apasionados por la innovación - trabaja cada día para superar expectativas.</p>
          </div>


        </div>
      </section>
      <section className=" py-10">
        <div className="grid grid-cols-1 w-10/12 m-auto text-center md:grid-cols-2 gap-5 ">
          <CardFoto
            imagen="/images/image_8.jpg"
            titulo="MISIÓN"
            clasesTitulo="text-3xl"
            parrafo="Convertir cada propiedad en una oportunidad de éxito, ofreciendo soluciones integrales de gestión inmobiliaria que maximicen su rentabilidad mientras elevamos los estándares de hospitalidad. Nos comprometemos a ser el puente perfecto entre propietarios y huéspedes, mediante tecnología innovadora, servicio excepcional y estrategias personalizadas que transformen espacios en experiencias memorables y inversiones prósperas."

          />
          <CardFoto
            imagen="/images/image_9.jpg"
            titulo="VISIÓN"
            clasesTitulo="text-3xl"
            parrafo="Liderar la revolución en la gestión de propiedades vacacionales, siendo reconocidos como el referente de confianza y excelencia en el sector. Aspiramos a expandir nuestra red globalmente, manteniendo siempre el equilibrio perfecto entre rentabilidad para propietarios y autenticidad para viajeros. Visualizamos un futuro donde cada propiedad bajo nuestro cuidado no solo genere ingresos óptimos, sino que también contribuya a redefinir la manera en que el mundo experimenta la hospitalidad."

          />

        </div>
      </section>
      <section className="bg-zinc-950">
        <div className="w-10/12 m-auto text-center text-white grid grid-cols-1 gap-8 py-16 lg:grid-cols-2 leading-relaxed ">
          <div>
            <p>
              Puedes contactarnos a través de estos medios para rentar nuestros alojamientos o resolver cualquier duda que puedas tener.
            </p>
            <div >
              <Link target="_blank" to="https://www.instagram.com/marketoakconsulting?igsh=MzRlODBiNWFlZA==">
                <svg className="m-auto mt-3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 48 48">
                  <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div >
            <p>Te responderemos tan pronto como podamos</p>
            <p>Email: correo@tuempresa.com</p>
            <p>Adress: 2603 Camino Ramón, Ste. 200. CA 94583</p>
            <p>Tel: 888-383-4390</p>
          </div>
        </div>
      </section>
      <section className="bg-zinc-200 py-16">
        <h2 className="uppercase text-center mb-10 font-bold text-4xl md:text-5xl">Nuestras <span className="text-cyan-600">habilidades</span> principales</h2>
        <div className="w-10/12 m-auto grid grid-cols-1 gap-5 lg:grid-cols-3 text-center">
          <CardFoto
            imagen="/images/image_10.jpg"
            titulo="SEGURIDAD"
            clasesTitulo="text-rose-600 text-4xl"
            parrafo="Nos enorgullece ofrecer no solo un lugar para quedarse, sino un hogar donde se sienta seguro y completamente satisfecho. Tomamos su bienestar con seriedad y nos esforzamos por mantener un entorno seguro y protegido. Además de la seguridad, estamos comprometidos a brindar un servicio que garantice su satisfacción en cada momento. Nuestros espacios están diseñados pensando en la comodidad, asegurando que cada rincón de su alojamiento sea un refugio acogedor."
          />
          <CardFoto
            imagen="/images/image_11.jpg"
            titulo="CALIDAD"
            clasesTitulo="text-rose-600 text-4xl"
            parrafo="Nos esforzamos por superar sus expectativas ofreciendo un servicio personalizado que se adapte a sus preferencias individuales. La satisfacción del huésped es nuestra prioridad, y trabajamos incansablemente para crear una experiencia que recordará con cariño. Al elegirnos, no solo está seleccionando un lugar para alojarse; está eligiendo un hogar donde la seguridad y la satisfacción se unen para ofrecer una experiencia de hospedaje sin igual. Contáctenos hoy mismo para reservar su próximo retiro de elegancia y comodidad."
          />
          <CardFoto
            imagen="/images/image_12.jpg"
            titulo="PRECIOS"
            clasesTitulo="text-rose-600 text-4xl"
            parrafo="Reconocemos la importancia de ofrecer amenidades de alta calidad a precios accesibles, garantizando una estancia excepcional para nuestros huéspedes. Nuestro objetivo es lograr el equilibrio perfecto entre asequibilidad y calidad, asegurando que cada cliente reciba el máximo valor por su inversión. Creemos que la calidad no debe verse comprometida por el precio y, por lo tanto, nos esforzamos por ofrecer alojamientos que cumplan con los más altos estándares mientras siguen siendo accesibles para todos."
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default AboutUs