import Navegacion from "./Navegacion"
import { Carousel } from "flowbite-react";

function HeaderPrincipal({ imagen }) {
    return (
        <>

            <header className={`hero hero--bg_${imagen} h-auto`} >
                <div className="bg-zinc-900 bg-opacity-70">
                    <Navegacion />
                    <div className="w-10/12 m-auto">
                        <img className=" m-auto md:w-1/2 lg:w-2/5"  src="/images/logo_4.png" alt="..."/>
                        <h2 className="text-center font-bold text-white text-2xl pb-16 md:text-3xl ">Discover the pleasure of staying well</h2>

                    </div>

                </div>
            </header>

        </>
    )
}

export default HeaderPrincipal;