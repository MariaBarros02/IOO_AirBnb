import HeaderPrincipal from "../layout/HeaderPrincipal";
import Navegacion from "../layout/Navegacion";
import Footer from "../layout/Footer";
import CardFoto from "../components/CardFoto";
import Space from "../components/Space";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";




const Home = () => {
  return (
    <>
      <HeaderPrincipal 
        imagen="3"
      />

      <section className="bg-zinc-200 py-10">
        <div className="w-10/12 m-auto grid grid-cols-1 justify-center items-center gap-5 lg:grid-cols-2">
          <div className="">
            <h2 className="uppercase  text-5xl font-bold  mb-5" >
              Here is your <span className="text-rose-600">next home </span>for when you travel...</h2>
            <p className="text-lg">
              Our accommodations provide everything you need to rest and relax because we have efficient Wi-Fi
              connections, water and electricity
              services, customer support, clean and fresh spaces.
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
     
      <section className=" py-10">
        <div className="w-10/12 m-auto lg:w-11/12">
          <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5">
            <CardFoto
              imagen="/propiedades/id_1/4.jpg"
              titulo="San Francisco, California: SoMa"
              clasesTitulo="text-rose-600  text-xl"
              parrafo="Our property offers strategic access to iconic sites like China Town,
              Haight-Ashbury'sbohemian energy and Little Italy's fresh coffee
              aroma."
            />
            <CardFoto
              imagen="/propiedades/id_2/3.jpg"
              titulo="San Francisco, California: Cozy & Complete"
              clasesTitulo="text-cyan-600 text-xl"
              parrafo="Discover the charm of San Francisco in our cozy apartment, ideally located near the
              illuminated Bay Bridge and the dynamic SOMA district."
            />
            <CardFoto
              imagen="/propiedades/id_3/5.jpg"
              clasesTitulo="text-rose-600 text-xl"
              titulo="San Francisco, California: Comfy Retreat"
              parrafo="Just steps from local attractions and with easy access to transport, it's the ideal
              starting point for exploring the city."
            />

            <div className="shadow-lg rounded-lg banner banner--bg_1 transform transition duration-300 hover:scale-110" >
              <Link to="/properties" className="w-full h-full flex justify-center  rounded-lg  items-center bg-white  bg-opacity-30 hover:bg-black hover:bg-opacity-40 " >
                <svg className="w-[70px] h-[70px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14m-7 7V5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="banner banner--bg_2 ">
        <div className="bg-zinc-900 bg-opacity-70 text-white py-20 flex flex-col justify-center items-center text-center">
          <p className="text-xl lg:text-3xl font-bold uppercase w-8/12 m-auto ">Have you liked any of our accommodations? We invite you to contact us to rent your favorite one.</p>
          <Button className="mt-5 bg-zinc-950" color="dark" size="lg" href="mailto:admin@marketoakconsult.com" >CONTACT US</Button>
        </div>
      </section>
      

      <section className="py-16 bg-zinc-200 ">
        <h2 className="text-center uppercase text-3xl w-10/12 m-auto font-bold lg:text-5xl"> <span className="text-rose-600">Empower </span>Your <span className="text-cyan-500">vacations</span> with us because</h2>
        <div className="w-9/12 m-auto grid grid-cols-1 gap-3 lg:grid-cols-3 lg:items-center text-center">
          <div className="my-3">
            <img src="/images/image_21.jpg" className="rounded-full shadow-lg border-4 border-white w-4/5 m-auto" alt="..." />
            <p className="text-md mt-3">
              Our properties are designed to provide comfort for families and groups. With ample space and top-notch amenities, you can relax and enjoy your vacation to the fullest.
            </p>
          </div>
          <div className="text-2xl font-semibold italic text-center mb-5 ">
            <p className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-rose-600 relative inline-block">
              <span className="relative text-white text-6xl px-2">AND</span>
            </p>
           
          </div>
          <div className="my-3">
          <img src="/images/image_1.jpg" className="rounded-full shadow-lg border-4 border-white w-4/5 m-auto" alt="..." />
            <p className=" text-md my-3">
              Our dedicated team will assist you with any needs or questions you may have in your stay, ensuring your stay is seamless and enjoyable from start to finish.
            </p>
          </div>
        </div>
      </section>
     



      


      <Footer />
    </>
  )
}

export default Home