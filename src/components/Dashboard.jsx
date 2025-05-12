import { useState, useEffect, useMemo } from "react";
import { Search, X, ShoppingCart, LogOut } from "lucide-react";
import Fuse from "fuse.js";
import AgregarProducto from "./AgregarProducto";
import GemCard from "./GemCard";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const initialGemstones = [
  { id: 1, name: "Rubí", stock: 12, descripcion: "Gema roja intensa.", precio: 100000, imagen: "/img/ruby.png" },
  { id: 2, name: "Esmeralda", stock: 8, descripcion: "Verde y elegante.", precio: 120000, imagen: "/img/esmeralda.png" },
  { id: 3, name: "Sapphire", stock: 23, descripcion: "Azul profundo.", precio: 90000, imagen: "/img/sapphire.png" },
  { id: 4, name: "Amatista", stock: 4, descripcion: "Púrpura espiritual.", precio: 75000, imagen: "/img/amatista.png" },
  { id: 5, name: "Diamante", stock: 30, descripcion: "Brillante y eterno.", precio: 150000, imagen: "/img/diamante.png" },
  { id: 6, name: "Citrinos", stock: 72, descripcion: "Amarillo radiante.", precio: 120000, imagen: "/img/citrinos.png"},
];

function Dashboard() {
  const [search, setSearch] = useState("");
  const [gemstones, setGemstones] = useState(initialGemstones);
  const [rol, setRol] = useState(null);
  const [selectedGem, setSelectedGem] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    celular: "",
  });
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.grams, 0);

  useEffect(() => {
    const savedRol = localStorage.getItem("rol");
    setRol(savedRol);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedGem || showCart ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [selectedGem, showCart]);

  const agregarProducto = (nuevoProducto) => {
    const nuevoId = gemstones.length + 1;
    setGemstones([...gemstones, { id: nuevoId, ...nuevoProducto }]);
  };

  const fuse = useMemo(() => new Fuse(gemstones, { keys: ["name"], threshold: 0.3 }), [gemstones]);
  const filteredGemstones = useMemo(() =>
    search ? fuse.search(search).map((res) => res.item) : gemstones,
    [search, fuse]
  );

  const handleLogout = () => {
    localStorage.removeItem("rol");
    navigate("/");
  };

  return (
    <div className="flex-1 p-8">
      {/* Encabezado */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-accent">Dashboard</h2>
          <p className="text-muted mt-1">Welcome to our BioCristal inventory.</p>
        </div>

        <div className="flex items-center gap-4">
          {rol === "admin" && <AgregarProducto onAgregarProducto={agregarProducto} />}

          {/* Rol + Carrito */}
          <div className="relative">
            {rol && (
              <div
                onClick={() => setShowLogoutModal(true)}
                title="Cerrar sesión"
                className={`absolute -top-9 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md cursor-pointer ${
                  rol === "admin" ? "bg-blue-800" : "bg-gray-600"
                }`}
              >
                {rol === "admin" ? "ADM" : "TRB"}
              </div>
            )}
            <ShoppingCart
              size={32}
              className="text-white cursor-pointer"
              onClick={() => setShowCart(true)}
            />
            {totalItems > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-600 text-white text-sm font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal Cerrar Sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card p-6 rounded-xl text-center text-white shadow-xl">
            <p className="mb-4 text-lg font-semibold">¿Deseas cerrar sesión?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold"
              >
                Cerrar sesión
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buscador */}
      <div className="relative mt-4 w-full md:w-96">
        <Search className="absolute left-3 top-3 text-muted" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar gemas..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-card text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {search && (
          <X className="absolute right-3 top-3 text-muted cursor-pointer" size={20} onClick={() => setSearch("")} />
        )}
      </div>

      {/* Tarjetas de gemas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6 place-items-center">
        {filteredGemstones.map((gem) => (
          <GemCard key={gem.id} gem={gem} onViewDetail={rol === "admin" ? setSelectedGem : null} />
        ))}
      </div>

      {/* Modal de Detalle de Gema */}
      {/* ...ya incluido en tu código... */}

      {/* Modal del Carrito */}
      {/* ...ya incluido en tu código... */}

{selectedGem && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-card rounded-2xl shadow-lg p-6 w-[700px] flex gap-6 text-white relative animate-fade-in">
            <button
              onClick={() => {
                setSelectedGem(null);
                setShowComparison(false);
              }}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500 text-xl"
            >
              ×
            </button>

            <div className="w-1/2">
              <img src={selectedGem.imagen} alt={selectedGem.name} className="rounded-xl w-full h-auto object-cover" />
              <div className="flex justify-center gap-6 mt-4 text-sky-400 text-xl">
                <i className="fas fa-edit cursor-pointer hover:text-white" title="Editar producto"></i>
                <i className="fas fa-trash-alt cursor-pointer hover:text-red-400" title="Eliminar producto"></i>
              </div>
            </div>

            <div className="w-1/2">
              <h2 className="text-2xl font-bold text-sky-400">{selectedGem.name}</h2>
              <p className="text-muted mt-1 mb-2">{selectedGem.descripcion}</p>
              <p className="mb-1">💵 Precio por gramo: ${selectedGem.precio}</p>
              <p className="mb-3">📦 Stock disponible: {selectedGem.stock}</p>

              <label className="block mb-1">Gramos:</label>
              <div className="flex items-center gap-2 mb-4">
                <button className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-600">➖</button>
                <input type="number" value={1} readOnly className="w-16 text-center rounded bg-slate-700 text-white" />
                <button className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-600">➕</button>
              </div>

              <button
                onClick={() => setShowComparison(!showComparison)}
                className="bg-sky-600 text-white w-full py-2 rounded-lg hover:bg-sky-700 font-bold"
              >
                {showComparison ? "Ocultar comparaciones" : "Comparar precio"}
              </button>

              {showComparison && (
                <div className="mt-4 text-cyan-200 text-sm space-y-1 animate-fade-in">
                  <p>💰 Precio sistema 1: $118.000</p>
                  <p>💰 Precio sistema 2: $121.500</p>
                  <p>💰 Precio sistema 3: $119.900</p>
                  <p>💰 Precio sistema 4: $120.000</p>
                  <p>💰 Precio sistema 5: $122.300</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal del Carrito */}
      {showCart && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-card p-6 rounded-2xl max-w-2xl w-full text-white relative shadow-xl overflow-y-auto max-h-[90vh]">
            <button className="absolute top-4 right-4 text-white text-xl hover:text-red-400" onClick={() => setShowCart(false)}>×</button>
            <h2 className="text-2xl font-bold mb-4 text-accent">🛒 Carrito</h2>

            {cart.length === 0 ? (
              <p className="text-muted">Tu carrito está vacío.</p>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-background p-3 rounded-xl shadow">
                    <div>
                      <h3 className="font-bold text-sky-400">{item.name}</h3>
                      <p className="text-sm text-muted">{item.grams}g x ${item.precio} = ${item.grams * item.precio}</p>
                    </div>
                    <img src={item.imagen} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  </div>
                ))}

                <p className="text-right font-semibold text-lg">
                  Total: <span className="text-accent">${cart.reduce((sum, i) => sum + i.precio * i.grams, 0).toLocaleString()}</span>
                </p>

                {/* Formulario del carrito */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Datos del recibo:", formData, cart);
                    setMensajeEnviado(true);
                    setTimeout(() => setMensajeEnviado(false), 4000);
                  }}
                  className="mt-6 space-y-3"
                >
                  <input type="text" placeholder="Nombre completo" className="w-full p-2 rounded bg-slate-700 text-white" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
                  <input type="email" placeholder="Correo electrónico" className="w-full p-2 rounded bg-slate-700 text-white" value={formData.correo} onChange={(e) => setFormData({ ...formData, correo: e.target.value })} required />
                  <input type="text" placeholder="Dirección" className="w-full p-2 rounded bg-slate-700 text-white" value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} required />
                  <input type="tel" placeholder="Número de celular" className="w-full p-2 rounded bg-slate-700 text-white" value={formData.celular} onChange={(e) => setFormData({ ...formData, celular: e.target.value })} required />

                  <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold">
                    Realizar compra
                  </button>

                  {mensajeEnviado && (
                    <p className="text-green-400 font-semibold mt-2 text-center">✅ ¡Recibo enviado al correo!</p>
                  )}
                </form>

                <button
                  onClick={() => {
                    clearCart();
                    setShowCart(false);
                  }}
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
