import { Card } from "flowbite-react"

const CardFoto = ({ imagen, titulo, parrafo, clasesTitulo }) => {
    return (
        <>
            <Card href="#"
                className="max-w-lg mx-auto transform transition duration-300 hover:scale-110 hover:bg-white"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={imagen}
            >
                <h5 className={`font-bold  ${clasesTitulo}`}>
                    {titulo}
                </h5>
                <p className="font-normal text-sm">
                    {parrafo}
                </p>
            </Card>
        </>
    )
}

export default CardFoto