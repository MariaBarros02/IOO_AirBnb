import HeaderPrincipal from "../layout/HeaderPrincipal"
import Footer from "../layout/Footer"
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Space from "../components/Space";

const PropertyOwners = () => {
    return (
        <>
            <HeaderPrincipal
            />

            <section className=" py-10">
                <div className="w-10/12 m-auto grid grid-cols-1 gap-8 items-center md:grid-cols-3">
                    <img className="rounded-full m-auto" src="/images/image_29.jpg" alt="..." />
                    <div className=" text-center md:col-span-2">
                        <h2 className="text-3xl font-bold uppercase mb-3  lg:text-5xl">¿Te interesa convertirte en <span className="text-rose-600">nuestro socio?</span></h2>
                        <p className="">Nos asociamos contigo para maximizar el potencial de tus inversiones inmobiliarias. Nuestra plataforma ofrece oportunidades incomparables para listar tus propiedades, garantizando alta visibilidad y tasas de ocupación óptimas. Estamos comprometidos a brindar soporte integral y servicios para que tu experiencia sea fluida y rentable.

                            Únete a nuestra red de propietarios satisfechos y descubre la diferencia que nuestra experiencia y compromiso pueden hacer. ¡Lista tu propiedad con nosotros hoy y libera todo su potencial!</p>
                    </div>

                </div>
            </section>


            <section className="">

                <div className="grid grid-cols-1 lg:grid-cols-3 bg-gray-100" >

                    <div className="col-span-2 py-10 w-10/12 m-auto">
                        <h2 className="text-3xl lg:text-5xl font-bold my-5 uppercase">Desbloquea el <span className="text-cyan-600"> Maximo Potencial</span> de tu propiedad con nuestros servicios</h2>
                        <div>
                            <Timeline>
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>Introducción a Nuestros Servicios</Timeline.Time>
                                        <Timeline.Title>Tasas de Ocupación Maximizadas</Timeline.Title>
                                        <Timeline.Body className="text-zinc-700">
                                            Utilizamos estrategias de marketing avanzadas y una amplia red para garantizar que tu propiedad llegue a un público extenso. Nuestra plataforma atrae a una diversidad de huéspedes, desde turistas hasta viajeros de negocios, asegurando altas tasas de ocupación durante todo el año. Al listar tu propiedad con nosotros, puedes estar seguro de que tendrá una gran demanda.
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>Configuración del Servicio</Timeline.Time>
                                        <Timeline.Title>Gestión Inmobiliaria Integral</Timeline.Title>
                                        <Timeline.Body className="text-zinc-700">
                                            Nuestro equipo dedicado de gestión de propiedades se encarga de cada detalle, desde la comunicación con los huéspedes hasta los servicios de mantenimiento y limpieza. Realizamos inspecciones periódicas para mantener los más altos estándares, asegurando que tu propiedad permanezca en condiciones impecables. Esto te permite disfrutar de los beneficios de los ingresos por alquiler sin las molestias de la gestión diaria.
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>Maximizando tus Ganancias</Timeline.Time>
                                        <Timeline.Title>Ganancias Competitivas</Timeline.Title>
                                        <Timeline.Body className="text-zinc-700">
                                            Nuestros modelos de precios dinámicos y el análisis experto del mercado te ayudan a obtener los mejores rendimientos posibles de tu inversión. Monitoreamos continuamente las tendencias del mercado y ajustamos los precios para maximizar tus ganancias mientras mantenemos la competitividad. Además, nuestra estructura de tarifas transparente garantiza que entiendas exactamente cómo se calculan tus ingresos, brindándote tranquilidad y claridad financiera.
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                        <Timeline.Time>Soporte Continuo</Timeline.Time>
                                        <Timeline.Title>Gestión Inmobiliaria Experta</Timeline.Title>
                                        <Timeline.Body className="text-zinc-700">
                                            Nuestro experimentado equipo de gestión de propiedades se encarga de cada detalle, desde el check-in y check-out de los huéspedes hasta el mantenimiento regular y la limpieza. Nos aseguramos de que tu propiedad siempre esté en las mejores condiciones, proporcionando una experiencia fluida tanto para ti como para tus huéspedes. Nuestro equipo está disponible 24/7 para manejar cualquier problema que pueda surgir, dándote tranquilidad.
                                        </Timeline.Body>
                                    </Timeline.Content>
                                </Timeline.Item>
                            </Timeline>
                            <section className="banner banner--bg_2 ">
                                <div className="bg-zinc-900 bg-opacity-70 text-white py-20 flex flex-col justify-center items-center text-center">
                                    <p className="text-xl lg:text-3xl font-bold uppercase w-8/12 m-auto ">¿TE GUSTARON LOS BENEFICIOS Y VENTAJAS QUE OFRECEMOS?
                                        ¡CONTÁCTANOS PARA FORMAR PARTE DE NUESTRA EMPRESA!</p>
                                    <Button className="mt-5 bg-zinc-950" color="dark" size="lg" href="mailto:correo@tuempresa.com" >Conáctanos</Button>
                                </div>
                            </section>

                        </div>

                    </div>
                    <img src="/images/image_30.jpg" alt="..." className="h-full object-cover" />
                </div>

            </section>
            <Footer />
        </>
    )
}

export default PropertyOwners