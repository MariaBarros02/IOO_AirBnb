import { useParams } from "react-router-dom";
import propiedades from "../data/propiedades";
import HeaderPrincipal from "../layout/HeaderPrincipal";
import Footer from "../layout/Footer"
import Space from "../components/Space"
import { Carousel, Button, Timeline, Breadcrumb } from "flowbite-react";
import { HiArrowNarrowRight, HiHome } from "react-icons/hi";

const Property = () => {

  const { idPropiedad } = useParams();

  const { id, titulo, ubicacion, descripcionCompleta, imagenes, sala, habitaciones, link } = propiedades[idPropiedad - 1]
  return (
    <>
      <HeaderPrincipal
        imagen="1"
      />
      <section className="pt-16 pb-10 bg-zinc-100">
        <div className="w-10/12 m-auto">

          <Breadcrumb className="mb-5 hidden md:block" aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="/" icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/properties">Properties</Breadcrumb.Item>
            <Breadcrumb.Item>{titulo}</Breadcrumb.Item>
          </Breadcrumb>
          <h2 className="text-2xl md:text-5xl font-bold mb-5">{ubicacion}: <span className="text-rose-600">{titulo}</span></h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            <div className=" lg:col-span-3">

              <div className="h-56 md:h-96">
                <Carousel>
                  {
                    imagenes.map((imagen, index) => (
                      <img src={`/propiedades/id_${id}/${imagen}.jpg`} alt="..." key={index} />
                    )
                    )}
                </Carousel>


              </div>


              <Button className="w-full my-5 uppercase font-bold tracking-widest block" outline gradientDuoTone="cyanToBlue" size="xl" href={link} target="_blank">
                Contact us to check availability!
              </Button>

              <section className="w-10/12  text-sm m-auto lg:mt-10 lg:flex lg:justify-between">
                <img className="w-1/4  m-auto my-5" src=" /images/beyond.png" alt="beyond-logo" />
                <p className="text-center font-bold tracking-wider text-xs lg:w-2/3">
                  MARKETOAK CONSULTING LLC is an partner of the Beyond Corporate Housing Network.
                  Beyond CHN is a distinguished nationwide corporate housing network
                  for individual companies specializing in midterm stays.
                </p>
              </section>
            </div>

            <div className="bg-white p-5 shadow-xl lg:mt-0 rounded-md lg:col-span-2 ">
              <p className="text-xl">Welcome to your gateway to <span className="text-cyan-600">San
                Francisco's</span> cultural diversity in SoMa Distric!</p>
              <iframe className="w-full rounded-md my-3 h-60"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25227.38069460778!2d-122.42865942614189!3d37.780135176332664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858083a662307b%3A0xfd99010c2dc1f950!2sSoMa%2C%20San%20Francisco%2C%20California%2C%20EE.%20UU.!5e0!3m2!1ses-419!2sco!4v1720104557173!5m2!1ses-419!2sco"
                allowFullScreen="" referrerPolicy="no-referrer-when-downgrade">
              </iframe>
              <p >{descripcionCompleta}</p>
            </div>
          </div>
        </div>
      </section>
      <section className=" py-10">
        <div className="w-10/12 m-auto">
          <p className="text-4xl font-bold my-5">During this stay, you will <span className="text-cyan-600"> be able to</span> enjoy...</p>
          <Timeline horizontal >
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-zinc-700">Living Room</Timeline.Time>
                <Timeline.Title className=" font-bold text-xl">The living room is a great place to enjoy fun and memorable moments after a busy day or outing.</Timeline.Title>
                <Timeline.Body className="text-zinc-700" >
                  {sala}
                </Timeline.Body>

              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-zinc-700">Bedroom</Timeline.Time>
                <Timeline.Title>Rest in one of these comfortable rooms, carefully designed and furnished to provide everything you need</Timeline.Title>
                <Timeline.Body className="text-zinc-700">
                  {habitaciones}
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-zinc-700">Kitchen</Timeline.Time>
                <Timeline.Title className="text-zinc-700">Equipped kitchen feactures a wide range of top-notch appliances, spacious granite countertops with a central island</Timeline.Title>
                <Timeline.Body className="text-zinc-700">
                  Microwave oven, stove, refrigerator/freezer, coffee maker, trays, glasses, cutlery, pots and pans
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-zinc-700">Bathroom</Timeline.Time>
                <Timeline.Title >The aparment features a relaxing bathroom with clean towels and basic toiletries to ensure maximum comfort and convenience.</Timeline.Title>
                <Timeline.Body className="text-zinc-700"> 
                  Shower, vanity, mirror, toilet, towels, essential toiletries
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