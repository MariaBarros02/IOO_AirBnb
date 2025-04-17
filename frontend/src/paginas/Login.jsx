import HeaderPrincipal from "../layout/HeaderPrincipal";
import Footer from "../layout/Footer";
import { BiArrowBack } from "react-icons/bi";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redirigiendo a la página de inicio de sesion...");
    if (isAuthenticated) navigate("/");

  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });

  return (
    <>


      <section className="bg-zinc-200 dark:bg-gray-900 flex items-center justify-center py-20">
        <div className="flex flex-col items-center w-full max-w-2xl px-4">
          <div className='flex items-center gap-5 mb-8'>
            <Link className='bg-cyan-700 text-white rounded-full p-2 text-xl md:text-3xl  hover:bg-cyan-800 ' title='Regresar' to="/" >
              <BiArrowBack />
            </Link>
            <h1 className="text-5xl font-bold ">Iniciar sesión</h1>
          </div>
          
          {signinErrors.length > 0 && (
            <div className="w-full max-w-md mb-4">
              {signinErrors.map((error, i) => (
                <div
                  className="bg-red-500 p-3 text-white rounded-lg mb-2 shadow-md"
                  key={i}
                >
                  ⚠️ {error}
                </div>
              ))}
            </div>
          )}
          <form
            onSubmit={onSubmit}
            className="flex max-w-xl flex-col gap-1 w-full"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="correo">Correo Electronico</Label>
              </div>
              <TextInput
                id="correo"
                {...register("email", { required: true })}
                type="email"
                placeholder="Tu correo electronico"
                required
                shadow
              />
              {errors.email && (
                <p className="text-red-500">El email es obligatorio</p>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="contraseña">Tu contraseña</Label>
              </div>
              <TextInput
                id="contraseña"
                {...register("password", { required: true })}
                type="password"
                placeholder="Digíta tu contraseña"
                required
                shadow
              />
              {errors.password && (
                <p className="text-red-500">La contraseña es obligatoria</p>
              )}
            </div>
            <div className="mb-2 block ">
              <Link
                to="/register"
                className="text-[#0e7490] underline hover:text-blue-800"
              >
                ¿No tienes cuenta? Regístrate
              </Link>
            </div>
            <Button type="submit">Iniciar sesión</Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Login;
