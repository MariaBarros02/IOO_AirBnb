import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Label, TextInput, ModalHeader, ModalBody } from "flowbite-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const [openModalEliminar, setOpenModalEliminar] = useState(false)


  const obtenerUsuarios = async (pagina = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/usuarios?page=${pagina}&limit=10`,
        {
          withCredentials: true,
        }
      );
      setUsers(res.data.users);
      setPaginaActual(res.data.currentPage);
      setTotalPaginas(res.data.totalPages);
    } catch (error) {
      console.error(
        "Error al obtener los usuarios:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "No autorizado");
    }
  };

  const eliminarUsuario = async (id) => {
    
    try {
      await axios.delete(`http://localhost:5000/admin/usuarios/${id}`, {
        withCredentials: true,
      });
      obtenerUsuarios(paginaActual);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
    cerrarModalEliminar()
  };

  const abrirModal = (usuario) => {
    setUsuarioActual(usuario);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setUsuarioActual(null);
    setModalOpen(false);
  };

  const abrirModalEliminar = (usuario) =>{
    setUsuarioActual(usuario);
    setOpenModalEliminar(true)
  }

  const cerrarModalEliminar = () => {
    setUsuarioActual(null);
    setOpenModalEliminar(false)
  }

  const actualizarUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/admin/usuarios/${usuarioActual._id}`,
        usuarioActual,
        {
          withCredentials: true,
        }
      );
      cerrarModal();
      obtenerUsuarios(paginaActual);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios(paginaActual);
  }, [paginaActual]);

  return (
    <section className="py-6 px-10">
      {/* Header con botón de logout */}
      <div className="w:10/12 md:w-9/12 mx-auto mb-6">
        <h1 className="text-4xl font-bold uppercase">Usuarios</h1>

      </div>

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto rounded-lg shadow-lg max-w-5xl mx-auto">
        <table className="w-full text-sm bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-center">Nombre</th>
              <th className="p-4 text-center">Correo</th>
              <th className="p-4 text-center">Teléfono</th>
              <th className="p-4 text-center">Rol</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-4 text-center">{`${user.name} ${user.lastName}`}</td>
                <td className="p-4 text-center">{user.email}</td>
                <td className="p-4 text-center">{user.phone}</td>
                <td className="p-4 text-center capitalize">{user.role}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <Button size="xs" onClick={() => abrirModal(user)}>
                      Editar
                    </Button>
                    <Button
                      size="xs"
                      color="failure"
                      onClick={() => abrirModalEliminar(user)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-around items-center mt-6">
        <Button
          className="ml-5"
          onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
          disabled={paginaActual === 1}
        >
          Anterior
        </Button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <Button
          onClick={() =>
            setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))
          }
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </Button>
      </div>

      {/* Modal de edición */}
      <Modal show={modalOpen} onClose={cerrarModal}>
        <Modal.Header>Editar Usuario</Modal.Header>
        <Modal.Body>
          {usuarioActual && (
            <form onSubmit={actualizarUsuario} className="space-y-4">
              <div>
                <Label>Nombre</Label>
                <TextInput
                  value={usuarioActual.name}
                  onChange={(e) =>
                    setUsuarioActual({ ...usuarioActual, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Apellido</Label>
                <TextInput
                  value={usuarioActual.lastName}
                  onChange={(e) =>
                    setUsuarioActual({
                      ...usuarioActual,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Correo</Label>
                <TextInput
                  value={usuarioActual.email}
                  onChange={(e) =>
                    setUsuarioActual({
                      ...usuarioActual,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <TextInput
                  value={usuarioActual.phone}
                  onChange={(e) =>
                    setUsuarioActual({
                      ...usuarioActual,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Rol</Label>
                <select
                  className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
                  value={usuarioActual.role}
                  onChange={(e) =>
                    setUsuarioActual({
                      ...usuarioActual,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Actualizar</Button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
      <Modal show={openModalEliminar} size="md" onClose={cerrarModalEliminar} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-800">
              ¿Estás segur@ de que quieres eliminar este usuario?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => eliminarUsuario(usuarioActual._id)}>
                Si, estoy segur@
              </Button>
              <Button color="gray" onClick={cerrarModalEliminar}>
                No, cancelar
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>



    </section>
  );
};

export default Users;
