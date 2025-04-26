import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Button } from "flowbite-react";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
function Navegacion() {

  const [token, setToken] = useState('');
  const { logout: useLogout } = useAuth();

  useEffect(() => {
    setToken(Cookies.get('token'))

    
  }, []);
  useEffect(() => {
    const btnMenu = document.querySelector('#btn-menu');
    const menu = document.querySelector('#menu');

    const handleMenuToggle = (e) => {
      e.preventDefault();
      if (menu) {
        menu.classList.toggle('hidden');
      }
    };

    if (btnMenu) {
      btnMenu.addEventListener('click', handleMenuToggle);
    }

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      if (btnMenu) {
        btnMenu.removeEventListener('click', handleMenuToggle);
      }
    };
  }, []);




  return (
    <>
      <div className="bg-transparent mb-10 text-white flex flex-col lg:flex-row lg:justify-between lg:items-center  font-bold">
        <div className="m-auto lg:m-0 lg:hidden">
          <div className="text-4xl py-3 lg:hidden " id="btn-menu">
            <a href="/" >☰</a>
          </div>
        </div>
        <nav className="hidden flex flex-col justify-center items-center pb-2 lg:flex-row lg:flex w-full" id="menu">
          <Link className="py-2 hover:bg-[#00000030] w-full text-center uppercase lg:py-5" to="/">Inicio</Link>
          <Link className="py-2 hover:bg-[#00000030] w-full text-center uppercase lg:py-5" to="/huespedes">Huéspedes</Link>
          <Link className="py-2 hover:bg-[#00000030] w-full text-center uppercase lg:py-5" to="/paraSocios">Para socios</Link>
          <Link className="py-2 hover:bg-[#00000030] w-full text-center uppercase lg:py-5" to="/propiedades">Propiedades</Link>
          <Link className="py-2 hover:bg-[#00000030] w-full text-center uppercase lg:py-5" to="/nosotros">Nosotros</Link>
          {!token ? (
            <div className="flex gap-2 justify-center items-center flex-col lg:flex-row lg:px-5 uppercase">
              <Link className=" rounded  hover:bg-cyan-500 bg-white text-cyan-700 hover:text-white p-2 text-sm m-auto flex items-center text-center justify-center w-36" to='/login'> Iniciar Sesión</Link>
              <Link className=" rounded bg-cyan-600  hover:bg-gray-100 hover:text-cyan-700 text-white p-2 text-sm m-auto flex items-center justify-center " to='/register'> Registrarse</Link>
            </div>
          ) : (
            <div className="flex gap-2 justify-center items-center flex-col lg:flex-row lg:pl-5 uppercase">
              <Link className=" rounded  hover:bg-cyan-700 bg-white text-cyan-700 hover:text-white p-2 text-sm m-auto w-48 flex items-center text-center justify-center" to='/admin'> Menú Administrador</Link>
              <Button
                color="transparent"
                onClick={async () => {
                  await useLogout();
                  window.location.reload()
                }}
                title="Cerrar Sesión"
              >
                <FiLogOut className=' lg:text-xl text-white' />
              </Button>
              
            </div>
          )

          }


        </nav>
      </div>
    </>
  )
}

export default Navegacion