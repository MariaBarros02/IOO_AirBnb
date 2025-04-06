import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./layout/Index";
import Home from "./paginas/Home";
import Guests from "./paginas/Guests";
import PropertyOwners from "./paginas/PropertyOwners";
import Properties from "./paginas/Properties";
import AboutUs from "./paginas/AboutUs";
import Property from "./paginas/Property";
import Register from "./paginas/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<Home />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/propertyOwners" element={<PropertyOwners />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/properties" element={<Index />}>
            <Route index element={<Properties />} />
            <Route path="property/:idPropiedad" element={<Property />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
