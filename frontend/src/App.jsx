import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./layout/Index";
import Home from "./paginas/Home";
import Guests from "./paginas/Guests";
import PropertyOwners from "./paginas/PropertyOwners";
import Properties from "./paginas/Properties";
import AboutUs from "./paginas/AboutUs";
import Property from "./paginas/Property";
import Register from "./paginas/Register";
import Login from "./paginas/Login";
import AdminPropiedad from "./paginas/AdminPropiedad";
import Administracion from "./paginas/Administracion";
import PrivateRoute from "./components/PrivateRoutes";
import { PropiedadProvider } from "./context/PropiedadContext";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <PropiedadProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />}>
              <Route index element={<Home />} />
              <Route path="/huespedes" element={<Guests />} />
              <Route path="/paraSocios" element={<PropertyOwners />} />
              <Route path="/nosotros" element={<AboutUs />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

            </Route>
            <Route path="/propiedades" element={<Index />}>
              <Route index element={<Properties />} />
              <Route path="propiedad/:idPropiedad" element={<Property />} />
            </Route>

            <Route path="/admin" element={<PrivateRoute requiredRole="admin" />}>
              <Route index element={<Administracion />} />
              <Route path="adminPropiedad" element={<AdminPropiedad />} />
              <Route path="adminPropiedad/:id" element={<AdminPropiedad />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PropiedadProvider>

    </AuthProvider>
  );
}

export default App;
