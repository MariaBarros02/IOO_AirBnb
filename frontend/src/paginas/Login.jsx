import HeaderPrincipal from "../layout/HeaderPrincipal";
import Footer from "../layout/Footer";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <HeaderPrincipal imagen="3" />

      <section className="bg-zinc-200 dark:bg-gray-900 flex items-center justify-center py-20">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-8">Registro de usuario</h1>
          <form className="flex max-w-md flex-col gap-1 w-full">
            <div className="flex gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2">Nombre(s)</Label>
                </div>
                <TextInput
                  id="nombre"
                  type="string"
                  placeholder="Tus Nombre(s)"
                  required
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2">Apellido(s)</Label>
                </div>
                <TextInput
                  id="apellido"
                  type="string"
                  placeholder="Tus Apellido(s)"
                  required
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="fecha-nacimiento">Fecha de Nacimiento</Label>
                </div>
                <TextInput
                  id="fecha-nacimiento"
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
                type="email"
                placeholder="Tu correo electronico"
                required
                shadow
              />
            </div>
            <div className="flex gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="telefono">Telefono</Label>
                </div>
                <TextInput
                  id="telefono"
                  type="string"
                  placeholder="Tu telefono"
                  required
                  shadow
                />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="email2">Dirección</Label>
                </div>
                <TextInput
                  id="direccion"
                  type="string"
                  placeholder="Tu dirección"
                  required
                  shadow
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="contraseña">Tu contraseña</Label>
              </div>
              <TextInput
                id="contraseña"
                type="password"
                placeholder="Digíta tu contraseña"
                required
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirmar-contraseña">
                  Confirmar tu contraseña
                </Label>
              </div>
              <TextInput
                id="contraseña-contraseña"
                type="password"
                placeholder="Confirma tu contraseña"
                required
                shadow
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree" />
              <Label htmlFor="agree" className="flex">
                Estoy de acuerdo con los &nbsp;
                <Link
                  href="#"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  términos y condiciones
                </Link>
              </Label>
            </div>
            <Button type="submit">Registrarse</Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Login;
