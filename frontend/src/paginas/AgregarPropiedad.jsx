import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Checkbox, Label, TextInput, Select, FileInput, HelperText, Textarea } from "flowbite-react";
import { Link } from 'react-router-dom';
import HeaderAdministrador from '../layout/HeaderAdministrador';
import { BiTrash, BiCheck } from "react-icons/bi";


const AgregarPropiedad = () => {
    const [items, setItems] = useState([
        { id: 1, nombre: "Toalla", checked: true },
        { id: 2, nombre: "Jabón", checked: true },
        { id: 3, nombre: "Champú", checked: true },
    ]);

    const [nuevoItem, setNuevoItem] = useState("");

    const toggleChecked = (id) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const eliminarItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const agregarItem = (e) => {
        e.preventDefault();
        const nombre = nuevoItem.trim();
        if (nombre !== "") {
            setItems((prev) => [
                ...prev,
                { id: Date.now(), nombre, checked: false },
            ]);
            setNuevoItem("");
        }
    };
    return (


        <>
            <HeaderAdministrador />

            <div className='w-10/12 m-auto my-10'>

                <h1 className='text-center text-3xl mb-10'>Agregar nueva Propiedad</h1>
                <Link className='bg-lime-600 p-4 px-10 text-white rounded-lg hover:bg-lime-500 ' to="/admin" >
                    Volver
                </Link>

                <form className="p-3  flex flex-col gap-4 ">
                    <p className='mt-10 ml-6 text-lg'>Información General</p>
                    <div className='border-2 py-3 px-10 '>
                        <div className='my-2'>
                            <div className="mb-2 block">
                                <Label htmlFor="titulo" className='text-base uppercase'>Titulo</Label>
                            </div>
                            <TextInput id="titulo" type="text" placeholder="Titulo de la propiedad" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="precioDia" className='text-base uppercase'>Precio (Día)</Label>
                            </div>
                            <TextInput id="precioDia" type="number" placeholder="Precio de la propiedad (Día)" required />
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <div className="mt-2 max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="tipoInmueble" className='uppercase text-base'>Tipo de Inmueble</Label>
                                </div>
                                <Select id="tipoInmueble" required>
                                    <option>Casa</option>
                                    <option>Apartamento</option>
                                    <option>Apataestudio</option>
                                    <option>Habitación</option>
                                </Select>
                            </div>
                            <div className='my-2'>
                                <div className="mb-2 block">
                                    <Label htmlFor="ciudad" className='text-base uppercase'>Ciudad</Label>
                                </div>
                                <TextInput id="ciudad" type="text" placeholder="Ciudad" required />
                            </div>
                            <div className='my-2'>
                                <div className="mb-2 block">
                                    <Label htmlFor="barrio" className='text-base uppercase'>Barrio</Label>
                                </div>
                                <TextInput id="barrio" type="text" placeholder="Barrio" required />
                            </div>

                        </div>

                        <div className='my-2'>
                            <div className="mb-2 block">
                                <Label htmlFor="direccion" className='text-base uppercase'>Dirección</Label>
                            </div>
                            <TextInput id="direccion" type="text" placeholder="Dirección de la propiedad" required />
                        </div>
                        <div id="imagenes" className="my-2">
                            <Label className="mb-2 block uppercase text-base" htmlFor="file">
                                Imágenes
                            </Label>
                            <FileInput id="file" multiple accept='image/*' />
                            <HelperText className="mt-1">Seleccione las fotografias de su propiedad</HelperText>
                        </div>
                        <div className='my-2'>
                            <div className="mb-2 block">
                                <Label htmlFor="descripcionBreve" className='text-base uppercase'>Descripción Breve</Label>
                            </div>
                            <Textarea
                                id="descripcionBreve"
                                placeholder="Descripción breve de la propiedad"
                                required
                                rows={3} // Puedes cambiar el número de líneas
                                maxLength={350}
                                className="text-base"
                            />
                        </div>

                        <div className='my-2'>
                            <div className="mb-2 block">
                                <Label htmlFor="descripcionCompleta" className='text-base uppercase'>Descripción Completa</Label>
                            </div>
                            <Textarea
                                id="descripcionBreve"
                                placeholder="Descripción breve de la propiedad"
                                required
                                rows={6} // Puedes cambiar el número de líneas
                                maxLength={650}
                                className="text-base"
                            />
                        </div>


                    </div>

                    <p className='mt-2 ml-6 text-lg'>Información del Inmueble</p>
                    <div className='border-2 py-3 px-10 '>


                        <div className='grid md:grid-cols-5 grid-cols-2 gap-2'>
                            <div className='my-2'>
                                <div className="mt-2 block">
                                    <Label htmlFor="numHabitaciones" className='text-base uppercase'>Habitaciones</Label>
                                </div>
                                <TextInput id="numHabitaciones" type="number" required className='w-1/2' min="0" value="0" />
                            </div>
                            <div className="my-2 ">
                                <div className="mt-2 block">
                                    <Label htmlFor="numBanos" className='text-base uppercase'>Baños</Label>
                                </div>
                                <TextInput id="numBanos" type="number" required className='w-1/2' min="0" value="0" />
                            </div>
                            <div className='my-2'>
                                <div className="mt-2 block">
                                    <Label htmlFor="numEstacionamientos" className='text-base uppercase'>Estacionamientos</Label>
                                </div>
                                <TextInput id="numEstacionamientos" type="number" required className='w-1/2' min="0" value="0" />
                            </div>
                            <div className='my-2'>
                                <div className="mt-2 block">
                                    <Label htmlFor="areaInmueble" className='text-base uppercase'>Area del inmueble</Label>
                                </div>
                                <TextInput id="areaInmueble" type="number" required className='w-1/2' min="0" value="0" />
                            </div>
                            <div className='my-2'>
                                <div className="mt-2 block">
                                    <Label htmlFor="numInvitados" className='text-base uppercase'>Maxímo de invitados</Label>
                                </div>
                                <TextInput id="numInvitados" type="number" required className='w-1/2' min="0" value="0" />
                            </div>

                        </div>

                        <div className='grid md:grid-cols-4 gap-20 mt-4 grid-cols-2'>
                            <div className="w-56">
                                <label className="block text-base text-gray-900 mb-2">
                                    INVENTARIO BAÑO:
                                </label>
                                <div className="h-64 overflow-y-auto border rounded p-2 bg-white shadow-sm space-y-2">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between text-sm text-gray-700"
                                        >
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    onChange={() => toggleChecked(item.id)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                                />
                                                <span>{item.nombre}</span>
                                            </div>
                                            <button
                                                onClick={() => eliminarItem(item.id)}
                                                className="text-lg"
                                                title="Eliminar"
                                            >
                                                <BiTrash/>
                                            </button>
                                        </div>
                                    ))}

                                    {/* Input para nuevo producto */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="text"
                                            value={nuevoItem}
                                            onChange={(e) => setNuevoItem(e.target.value)}
                                            placeholder="Añadir producto..."
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                  e.preventDefault(); // Evita que el formulario se envíe
                                                  agregarItem(e);     // Opcional: permite agregar con Enter
                                                }
                                              }}
                                            className="flex-1 px-2 py-1 text-sm  border-0 border-b border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={agregarItem}
                                            className="text-green-600 hover:text-green-800 text-lg"
                                            title="Agregar"
                                        >
                                            <BiCheck/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                           

                        </div>





                    </div>



                    <Button type="submit" className='uppercase ' size="xl">Agregar propiedad</Button>
                </form>

            </div>


        </>
    )
}

export default AgregarPropiedad