import React from 'react'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom';
import { BiHide, BiEdit, BiTrash } from "react-icons/bi";

const TablaPropiedades = () => {
    return (
        <section className="py-10 px-10">
            <div className=" w:10/12 md:w-9/12 mx-auto mb-6">
                <div className='flex justify-between items-center'>
                    <h1 className="text-4xl font-bold">Propiedades</h1>
                    <Link className='bg-lime-600 p-2 text-white rounded-lg hover:bg-lime-700'  to="/admin/agregarPropiedad" >
                        Agregar Propiedad
                    </Link>

                </div>


            </div>

            {/* Tabla de usuarios */}
            <div className="overflow-x-auto rounded-lg shadow-lg max-w-5xl mx-auto">
                <table className="w-full text-sm bg-white dark:bg-gray-800">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="p-4 text-center">ID</th>
                            <th className="p-4 text-center">Titulo</th>
                            <th className="p-4 text-center">Imagen</th>
                            <th className="p-4 text-center">Precio (Día)</th>
                            <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr

                            className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td className="p-4 text-center">1</td>
                            <td className="p-4 text-center">Apartamento de lujo en el centro de Neiva</td>
                            <td className="p-4 text-center w-48"><img src='/images/image_5.jpg' /></td>
                            <td className="p-4 text-center capitalize">$150.000 COP</td>
                            <td className="p-4 ">
                                <div className='flex flex-col md:flex-row justify-center'>
                                    <Link className='p-2' >
                                        <BiEdit className='text-3xl text-cyan-800 hover:text-cyan-600 m-auto ' title='Editar' />
                                    </Link>
                                    <Button size="xs" color="transparent" >
                                        <BiTrash className='text-3xl text-red-600 hover:text-red-500' title='Eliminar' />
                                    </Button>
                                    <Button size='xs' color="transparent" >
                                        <BiHide className='text-3xl hover:text-zinc-600' title='Ocultar' />
                                    </Button>

                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            
        </section>
    )
}

export default TablaPropiedades