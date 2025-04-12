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
            <div className='bg-zinc-700 p-5 flex justify-between items-center'>
                <img src='/images/logo_4.png' className='w-32' />
                <h1 className='text-white text-4xl font-bold uppercase text-center pl-16'>Menú Administrativo</h1>
                <Button
                    color="transparent"
                    onClick={async () => {
                        await useLogout();
                        navigate("/login");
                    }}
                    title="Cerrar Sesión"
                >
                    <FiLogOut className='text-2xl text-white' />
                </Button>

            </div>

        </>
    )
}

export default HeaderAdministrador