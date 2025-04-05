import { Card, Button } from "flowbite-react"
import { Link } from "react-router-dom"

const CardBoton = ({imagen, titulo, parrafo, boton, link}) => {
    return (
        <>
            <Card
                className="max-w-sm m-auto bg-zinc-50 lg:mx-3 h-full"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={imagen}
            >
                <p className="font-bold text-xl text-rose-600">
                    {titulo}
                </p>
                <p className="font-normal text-sm">
                    {parrafo}
                </p>
                <Button className="bg-cyan-600 font-bold " color="dark" size="xl" as={Link} to={link}>
                    {boton}
                </Button>
            </Card>

        </>
    )
}

export default CardBoton