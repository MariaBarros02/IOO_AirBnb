import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
function Navegacion() {

  const [token, setToken] = useState('');
  const { logout: useLogout } = useAuth();
  const navigate = useNavigate();

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
      <div className="bg-transparent mb-10 text-white flex flex-col lg:flex-row lg:justify-between lg:items-center  ">
        <div className="m-auto lg:m-0 lg:hidden">
          <div className="text-4xl py-3 lg:hidden " id="btn-menu">
            <a href="/" >☰</a>
          </div>
        </div>
        <nav className="hidden  flex-col lg:flex lg:flex-row lg:justify-between lg:w-full *:py-2 lg:*:py-5 *:w-full" id="menu">
          <Link className="navegacion__link" to="/">Home</Link>
          <Link className="navegacion__link" to="/guests">Guests</Link>
          <Link className="navegacion__link" to="/propertyOwners">Property Owners</Link>
          <Link className="navegacion__link" to="/properties">Properties</Link>
          <Link className="navegacion__link" to="/aboutUs">About Us</Link>
          {!token ? (
            <div className="flex gap-2 justify-center flex-col lg:flex-row">
              <Link className=" rounded hover:bg-white hover:text-black p-1 text-sm w-32 m-auto lg:m-0 lg:w-auto flex items-center text-center justify-center" to='/login'> Iniciar Sesion</Link>
              <Link className="border border-white rounded bg-white hover:bg-gray-200 text-black p-1 text-sm w-32 m-auto lg:m-0 lg:w-auto flex items-center justify-center" to='/register'> Registrarse</Link>
            </div>
          ) : (
            <div className="flex gap-2 justify-center flex-col lg:flex-row">
              <Link className=" border border-white rounded bg-white text-black hover:bg-gray-200 p-1 text-sm w-32 m-auto lg:m-0 lg:w-auto flex items-center text-center justify-center" to='/admin'> Menú Administrador</Link>
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