import Navegacion from "./Navegacion"
import { Carousel } from "flowbite-react";

function HeaderPrincipal() {
    return (
        <>

            <header className="hero h-auto" >
                <div className="bg-black bg-opacity-20">
                    <Navegacion />
                    <div className="w-10/12 m-auto pb-20  lg:grid lg:grid-cols-5 lg:items-center">
                        <h2 className="uppercase font-bold text-xl lg:text-4xl text-center text-white lg:col-span-2">Viaja por Colombia con la comodidad que mereces</h2>
                        <img className=" m-auto w-1/3 lg:w-2/3 " src="/images/logo_4.png" alt="..." />
                    </div>

                </div>
            </header>

        </>
    )
}

export default HeaderPrincipal;