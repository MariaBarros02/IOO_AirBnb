import HeaderPrincipal from "../layout/HeaderPrincipal";
import CardBoton from "../components/CardBoton";
import Footer from "../layout/Footer"
import { useState, useEffect } from "react";
import axios from "axios";
import { PiSealWarningBold } from "react-icons/pi";

const API_URL = import.meta.env.VITE_API_URL;
const Properties = () => {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0)
    cargarPropiedades();
  }, [])

  const cargarPropiedades = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/propiedades`)
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
        <h2 className="mb-5 text-3xl font-bold tracking-wider text-center uppercase lg:text-5xl ">Propiedades</h2>
      </section>

      <section className="">

        <div className="grid w-10/12 grid-cols-1 gap-4 py-10 m-auto md:grid-cols-2 lg:grid-cols-3 " >
          {propiedades && propiedades.length > 0 ? (
            propiedades.map(propiedad => (
              <CardBoton
                key={propiedad._id}
                prop={propiedad}
              />
            ))
          ) : (
            <div className="flex flex-col items-center m-auto mb-10 text-center text-gray-400 md:col-span-2 lg:col-span-3">
              <PiSealWarningBold className="mb-5 text-9xl" />
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