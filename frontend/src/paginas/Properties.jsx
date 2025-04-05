import HeaderPrincipal from "../layout/HeaderPrincipal";
import CardBoton from "../components/CardBoton";
import propiedades from "../data/propiedades";
import Footer from "../layout/Footer"

const Properties = () => {
  return (
    <>
      <HeaderPrincipal
        imagen="2"
      />
      <section className="pt-10">
        <h2 className="text-5xl text-center font-bold uppercase mb-5 lg:text-7xl tracking-wider ">Properties</h2>
      </section>

      <section className=" ">
  
        <div className="w-10/12 m-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 " >

          {propiedades.map(propiedad => (
            <CardBoton
            key={propiedad.id}
            imagen={`/propiedades/id_${propiedad.id}/principal.jpg`}
            titulo={`${propiedad.ubicacion}: ${propiedad.titulo}`}
            parrafo={propiedad.descripcion}
            boton="MORE INFORMATION"
            link={`/properties/property/${propiedad.id}`}
            />
          ))}
        </div>
      </section>
      <Footer/>
    </>

  )
}

export default Properties