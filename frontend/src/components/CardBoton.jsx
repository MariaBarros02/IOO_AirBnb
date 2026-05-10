import { Card, Button } from "flowbite-react"
import { Link } from "react-router-dom"
import { formatearDinero } from "../utils/formatearDinero.js"
import { MdOutlineBathtub } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { TbBedFilled } from "react-icons/tb";
import { PiHouseLineBold } from "react-icons/pi";

const API_URL = import.meta.env.VITE_API_URL;

const CardBoton = ({ prop }) => {
    const { titulo, descripcionBreve, imagenes, habitaciones, banos, estacionamientos, invitadosMax, areaInmueble, precioDia, _id } = prop
    return (
        <>
            <Card
                className="h-full max-w-sm m-auto bg-zinc-50 lg:mx-3"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={`${API_URL}${imagenes[0]}`}
            >
                <p className="font-bold text-rose-600">
                    {titulo}
                </p>
                <p className="">{formatearDinero(precioDia)} día / noche</p>
                <p className="text-xs font-normal">
                    {descripcionBreve}
                </p>
                <div className="grid grid-cols-5 text-sm">
                    <div className="flex items-center justify-center gap-2">
                        <TbBedFilled className="text-2xl" />
                        <p>{habitaciones}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <MdOutlineBathtub className="text-2xl" />
                        <p>{banos}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <FaCar className="text-2xl" />
                        <p>{estacionamientos} </p>
                    </div>
                    <div className="flex items-center justify-center col-span-2 gap-2">
                        <PiHouseLineBold className="text-3xl" />
                        <p >{areaInmueble} m<sup>2</sup></p>
                    </div>

                </div>

                <Button className="font-bold bg-cyan-600 " color="dark" as={Link} to={`/propiedades/propiedad/${_id}`}>
                    Ver detalles
                </Button>
            </Card>

        </>
    )
}

export default CardBoton