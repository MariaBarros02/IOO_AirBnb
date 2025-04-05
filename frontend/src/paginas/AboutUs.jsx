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

      <section className="bg-gray-200 py-10">
        <div className="w-10/12 m-auto grid grid-cols-1 gap-3 items-center md:grid-cols-2">
          
          <img src="/images/image_15.jpg" alt="advisory" className="rounded-full lg:w-4/6 m-auto lg:col-start-2" />
          <div className="row-start-1 text-center " >
            <h2 className="text-5xl font-bold uppercase mb-3 lg:text-7xl "><span className="text-cyan-600">About</span> Us</h2>
            <p className="">"Welcome to Marketoak, your premier choice for short and mid-term accommodations in the in the vibrant landscapes of the United States, our company offers anexceptional alternative to traditional hotel stays, providing you with the comfort and convenience of a home away from home. Our methodology mirrors the innovative approach of Airbnb, ensuring that our guests experience the best in local living. Recently, we have proudly joined the Beyond Corporate Housing Network, a distinguished nationwide community for companies specializing in midterm stays. This affiliation allows us to elevate our standards and expand our reach, providing unparalleled services to our guests."</p>
          </div>


        </div>
      </section>
      <section className=" py-10">
        <div className="grid grid-cols-1 w-10/12 m-auto text-center md:grid-cols-2 gap-5 ">
          <CardFoto
            imagen="/images/image_8.jpg"
            titulo="MISSION"
            clasesTitulo="text-3xl"
            parrafo="At Marketoak Consulting, our mission is to provide high-quality short and mid-term accommodation solutions that exceed our guest's expectations. We are dedicated to creating a seamless and comfortable stay experience, offering personalized service and top-notch amenities. Our goal is to make every guest feel at home, whether they are traveling for business, pleasure, or both. Additionally, we strive to support our clients with comprehensive credit advisory services and business creation assistance, ensuring their overall success and satisfaction."
          
          />
          <CardFoto
            imagen="/images/image_9.jpg"
            titulo="VISION"
            clasesTitulo="text-3xl"
            parrafo="Our vision is to be the leading provider of short and mid-term accommodations in San Francisco and beyond, setting the standard for excellence in the industry. We aim to continuously enhance our offerings, expand our property portfolio, and innovate our services to meet the evolving needs of our guests. By fostering a community of satisfied clients and leveraging our affiliation with Beyond Corporate Housing Network, we envision a future where Marketoak is synonymous with quality, comfort, and exceptional service."
          
          />
          
        </div>
      </section>
      <section className="bg-zinc-950">
        <div className="w-10/12 m-auto text-center text-white grid grid-cols-1 gap-8 py-16 lg:grid-cols-2 leading-relaxed ">
          <div>
            <p>
              You can contact us though these means to rent our accomodations or adress any questions you may have
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
            <p>We will respond to your message or call as soon as possible.</p>
            <p>Email: admin@marketoakconsult.com</p>
            <p>Adress: 2603 Camino Ramón, Ste. 200. CA 94583</p>
            <p>Tel: 888-383-4390</p>
          </div>
        </div>
      </section>
      <section className="bg-zinc-200 py-16">
        <h2 className="uppercase text-center mb-10 font-bold text-5xl md:text-6xl">Our <span className="text-cyan-600">principal</span> skills</h2>
        <div className="w-10/12 m-auto grid grid-cols-1 gap-5 lg:grid-cols-3 text-center">
          <CardFoto
            imagen="/images/image_10.jpg"
            titulo="SEGURITY"
            clasesTitulo="text-rose-600 text-4xl"
            parrafo="We take pride in providing not just a place to stay but a home where you feel secure and entirely satisfied. We take your well-being seriously and strive to maintain a safe and protected environment. In addition to safety, we are committed to delivering a service that ensures your satisfaction at every moment. Our spaces are designed with comfort in mind, ensuring that every corner of your accommodation is a cozy haven."
          />
          <CardFoto
            imagen="/images/image_11.jpg"
            titulo="QUALITY"
            clasesTitulo="text-rose-600 text-4xl"
            parrafo="We strive to exceed your expectations by providing personalized service that caters to your individual preferences. Guest satisfaction is our priority, and we work tirelessly to create an experience that you will fondly remember. By choosing us, you are selecting more than just a place to stay; you are choosing a home where safety and satisfaction come together to offer an unparalleled lodging experience. Contact us today to reserve your next retreat of elegance and comfort."
          />
          <CardFoto
            imagen="/images/image_12.jpg"
            titulo="PRICE"
            clasesTitulo="text-rose-600 text-4xl"
            parrafo="We recognize the importance of providing high-quality amenities at affordable prices, ensuring an exceptional stay for our guests. Our goal is to strike a perfect balance between affordability and quality, ensuring that each customer receives maximum value for their investment. We believe that quality should not be compromised by price, and therefore, we strive to offer accommodations that meet the highest standards while remaining accessible to all."
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default AboutUs