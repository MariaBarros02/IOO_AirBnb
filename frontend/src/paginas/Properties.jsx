import HeaderPrincipal from "../layout/HeaderPrincipal";
import CardBoton from "../components/CardBoton";
import Footer from "../layout/Footer"
import { useState, useEffect } from "react";
import axios from "axios";
import { PiSealWarningBold } from "react-icons/pi";


const Properties = () => {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0)
    cargarPropiedades();
  }, [])

  const cargarPropiedades = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/propiedades`)
      const visibles = response.data.propiedades.filter(p => p.visibilidad === true).slice(-3)
      console.log(visibles)
      setPropiedades(visibles);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <HeaderPrincipal
      />
      <section className="pt-10">
        <h2 className="text-3xl text-center font-bold uppercase mb-5 lg:text-5xl tracking-wider ">Propiedades</h2>
      </section>

      <section className=" ">

        <div className="w-10/12 m-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 " >
          {propiedades && propiedades.length > 0 ? (
            propiedades.map(propiedad => (
              <CardBoton
                key={propiedad._id}
                prop={propiedad}
              />
            ))
          ) : (
            <div className="m-auto md:col-span-2 lg:col-span-3 text-center text-gray-400 flex flex-col items-center mb-10">
              <PiSealWarningBold className="text-9xl mb-5" />
              <p className="text-xl font-bold md:w-1/2">¡Lo sentimos, No hay propiedades disponibles en este momento!</p>
            </div>
          )}

        </div>
      </section>
      <Footer />
    </>

  )
}

export default Properties