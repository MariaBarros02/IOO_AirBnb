import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { Button } from 'flowbite-react';
import { useAuth } from '../context/AuthContext';

const HeaderAdministrador = () => {
    const { logout: useLogout } = useAuth();
      const navigate = useNavigate();
    return (
        <>
            <div className='bg-zinc-700 p-5 flex flex-col md:flex-row justify-between items-center '>
                <img src='/images/logo_4.png' className='w-20 sm:w-32' />
                <h1 className='text-white text-3xl md:text-4xl font-bold uppercase text-center my-3'>Menú Administrativo</h1>
                <Button
                    color="transparent"
                    onClick={async () => {
                        await useLogout();
                        navigate("/");
                    }}
                    title="Cerrar Sesión"
                >
                    <FiLogOut className=' md:text-2xl text-white' />
                </Button>

            </div>

        </>
    )
}

export default HeaderAdministrador