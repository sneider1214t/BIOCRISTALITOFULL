import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Formulario from "./components/Formulario";
import Gemstones from "./components/Gemstones";
import Categories from "./components/Categories";
import Sales from "./components/Sales";
import Customers from "./components/Customers";
import { CartProvider } from "./context/CartContext";
import Ubicacion from "./components/Ubicacion";


function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route path="/" element={<Login />} />

        {/* Ruta principal: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <div className="flex bg-background min-h-screen text-text">
              <Sidebar />
              <Dashboard />
            </div>
          }
        />

        {/* Ruta de Gemstones */}
        <Route
          path="/gemstones"
          element={
            <div className="flex bg-background min-h-screen text-text">
              <Sidebar />
              <Gemstones />
            </div>
          }
        />

        {/* Ruta de Categorías */}
        <Route
          path="/categories"
          element={
            <div className="flex bg-background min-h-screen text-text">
              <Sidebar />
              <Categories />
            </div>
          }
        />

        {/* Ruta de Ventas */}
        <Route
          path="/sales"
          element={
            <div className="flex bg-background min-h-screen text-text">
              <Sidebar />
              <Sales />
            </div>
          }
        />

        {/* Ruta de Clientes */}
        <Route
          path="/customers"
          element={
            <div className="flex bg-background min-h-screen text-text">
              <Sidebar />
              <Customers />
            </div>
          }
        />

        {/* Ruta del Formulario para agregar producto */}
        <Route
          path="/formulario"
          element={
            <div className="flex bg-background min-h-screen text-text">
              <Sidebar />
              <Formulario />
            </div>
          }
        />

        <Route path="/ubicacion" element={<Ubicacion />} />

      </Routes>
    </CartProvider>
  );
}

export default App;
