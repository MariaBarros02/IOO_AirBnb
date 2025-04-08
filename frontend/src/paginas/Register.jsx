import HeaderPrincipal from "../layout/HeaderPrincipal";
import Footer from "../layout/Footer";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redirigiendo a la página de inicio de sesion...");
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <>
      <HeaderPrincipal imagen="3" />

      <section className="bg-zinc-200 dark:bg-gray-900 flex items-center justify-center py-20">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-8">Registro de usuario</h1>
          {registerErrors.length > 0 && (
            <div className="w-full max-w-md mb-4">
              {registerErrors.map((error, i) => (
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
            className="flex max-w-md flex-col gap-1 w-full"
          >
            <div className="flex gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2">Nombre(s)</Label>
                </div>
                <TextInput
                  id="nombre"
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Tus Nombre(s)"
                  required
                  shadow
                />
                {errors.name && (
                  <p className="text-red-500">El nombre es obligatorio</p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2">Apellido(s)</Label>
                </div>
                <TextInput
                  id="apellido"
                  {...register("lastName", { required: true })}
                  type="text"
                  placeholder="Tus Apellido(s)"
                  required
                  shadow
                />
                {errors.lastName && (
                  <p className="text-red-500">El apellido es obligatorio</p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="fecha-nacimiento">Fecha de Nacimiento</Label>
                </div>
                <TextInput
                  id="fecha-nacimiento"
                  {...register("dateOfBirth", { required: true })}
                  type="date"
                  placeholder="Tu fecha de nacimiento"
                  required
                  shadow
                />
              </div>
            </div>
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
            <div className="flex gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="telefono">Telefono</Label>
                </div>
                <TextInput
                  id="telefono"
                  {...register("phone", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="Tu telefono"
                  required
                  shadow
                />
                {errors.phone && (
                  <p className="text-red-500">El telefono es obligatorio</p>
                )}
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="email2">Dirección</Label>
                </div>
                <TextInput
                  id="direccion"
                  {...register("address", { required: true })}
                  type="text"
                  placeholder="Tu dirección"
                  required
                  shadow
                />
                {errors.address && (
                  <p className="text-red-500">La dirección es obligatoria</p>
                )}
              </div>
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirmar-contraseña">
                  Confirmar tu contraseña
                </Label>
              </div>
              <TextInput
                id="contraseña-contraseña"
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="Confirma tu contraseña"
                required
                shadow
              />
            </div>

            <div className="mb-2 block ">
              <Link
                to="/login"
                className="text-[#0e7490] underline hover:text-blue-800"
              >
                ¿Tienes ya una cuenta? Inicia Sesión
              </Link>
            </div>
            <Button type="submit">Registrarse</Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Register;
