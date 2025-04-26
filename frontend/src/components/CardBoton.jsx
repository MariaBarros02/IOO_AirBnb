import { Card, Button } from "flowbite-react"
import { Link } from "react-router-dom"
import { formatearDinero } from "../utils/formatearDinero.js"
import { MdOutlineBathtub } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { TbBedFilled } from "react-icons/tb";
import { PiHouseLineBold } from "react-icons/pi";



const CardBoton = ({ prop }) => {
    const { titulo, descripcionBreve, imagenes, habitaciones, banos, estacionamientos, invitadosMax, areaInmueble, precioDia, _id } = prop
    return (
        <>
            <Card
                className="max-w-sm m-auto bg-zinc-50 lg:mx-3 h-full"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={`http://localhost:5000${imagenes[0]}`}
            >
                <p className="font-bold text-rose-600">
                    {titulo}
                </p>
                <p className="">{formatearDinero(precioDia)} día / noche</p>
                <p className="font-normal text-xs">
                    {descripcionBreve}
                </p>
                <div className="grid grid-cols-5 text-sm">
                    <div className="flex gap-2 justify-center items-center">
                        <TbBedFilled className="text-2xl" />
                        <p>{habitaciones}</p>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <MdOutlineBathtub className="text-2xl" />
                        <p>{banos}</p>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <FaCar className="text-2xl" />
                        <p>{estacionamientos} </p>
                    </div>
                    <div className="flex gap-2 col-span-2 justify-center items-center">
                        <PiHouseLineBold className="text-3xl" />
                        <p >{areaInmueble} m<sup>2</sup></p>
                    </div>

                </div>

                <Button className="bg-cyan-600 font-bold " color="dark" as={Link} to={`/propiedades/propiedad/${_id}`}>
                    Ver detalles
                </Button>
            </Card>

        </>
    )
}

export default CardBoton