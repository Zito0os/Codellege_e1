import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import cor from './assets/cor.jpg';
import RAZER from './assets/RAZER.jpg';
import REDRAGON from './assets/REDRAGON.jpg';
import LOGITECH from './assets/LOGITECH.jpg';
import EPOMAKER from './assets/LOGITECH.jpg';
import Resultados from './Resultados';
import log from './assets/log.jpg';
import EPOMAKER from './assets/EPOMAKER.jpg';
import ter from './assets/ter.jpg';
import arco from './assets/arco.jpg';




import Resultados from './Resultados';



const products = [
   {
    id: 1,
    title: 'Redragon',
    color: 'Rojo',
    price: 899.00,
    description:'Teclado mecánico económico con excelente iluminación, perfecto para empezar en gaming.',
    image: REDRAGON,
    stock: 12,
  },

  {
    id: 2,
    title: 'Corsair',
    color: 'Negro/Gris',
    tipo_switch: 'Red',
    descuento: 0,
    price: 2499.00,
    description:'Teclado premium para jugadores exigentes con acabados y desempeño superiores.',
    image: cor,
    stock: 8,
  },

  {
    id: 3,
    title: 'Razer',
    color: 'Verde/Negro',
    tipo_switch: 'Brown',
    descuento: 15,
    price: 1899.00,
    description:'Con switches ultrarrápidos y tecnología RGB para una experiencia competitiva.',
    image: RAZER,
    stock: 5,
  },

  {
    id: 4,
    title: 'Logitech',
    color: 'Blanco/Negro',
    tipo_switch: 'Brown',
    descuento: 0,
    price: 1599.00,
    description:'Diseño elegante y funcional, ideal para trabajo diario con buen rendimiento.',
    image: LOGITECH,
    stock: 10,
  },
  {
    id: 5,
    title: 'Epomaker',
    color: 'Verde/Negro',
    tipo_switch: 'Blue',
    descuento: 0,
    price: 1600.00,
    description:'Wireless gaming keyboard with RGB lighting.',
    image: raz,
    stock: 6,
  },

  {
    id: 6,
    title: 'Razer',
    color: 'Blanco/Negro',
    tipo_switch: 'Red',
    descuento: 0,
    price: 1400.00,
    description:'Teclado arcoiris negro.',
    image: arco,
    stock: 3,
  },

  {
    id: 7,
    title: 'Terport',
    color: 'Negro',
    tipo_switch: 'Brown',
    descuento: 0,
    price: 1799.00,
    description:'4 efectos de iluminacion.',
    image: ter,
    stock: 0,
  },

  {
    id: 8,
    title: 'Logitech',
    color: 'Rosa',
    tipo_switch: 'Blue',
    descuento: 50,
    price: 1399.00,
    description:'Teclado compacto bluetooth para windows.',
    image: log,
    stock: 15,
  },
];

const advertisements = [
  {
    image: RAZER,
    alt: 'Promoción de teclados Razer',
    title: 'Modelos 2025 en descuento',
    text: 'Descubre teclados diseñados para competir.',
  },
  {
    image: LOGITECH,
    alt: 'Promoción de teclados Logitech',
    title: 'Tu setup, tu estilo',
    text: 'Encuentra el teclado ideal para tu espacio.',
  },
  {
    image: log,
    alt: 'Promoción de teclados Epomaker',
    title: 'Ilumina cada jugada',
    text: 'RGB y rendimiento para llevar tu experiencia al siguiente nivel.',
  },
];

function Catalog() {
  const navigate = useNavigate();
  const [activeAd, setActiveAd] = useState(0);
  const [switchFilter, setSwitchFilter] = useState('Todos');
  const [priceOrder, setPriceOrder] = useState(null);
  const [offersOnly, setOffersOnly] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAd((currentAd) => (currentAd + 1) % advertisements.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const showAd = (index) => {
    setActiveAd((index + advertisements.length) % advertisements.length);
  };

  const nextAd = () => showAd(activeAd + 1);
  const previousAd = () => showAd(activeAd - 1);

  const filteredProducts = products
    .filter((product) => switchFilter === 'Todos' || product.tipo_switch === switchFilter)
    .filter((product) => !offersOnly || product.descuento > 0)
    .sort((firstProduct, secondProduct) => {
      if (priceOrder === 'high-to-low') {
        return secondProduct.price - firstProduct.price;
      }

      if (priceOrder === 'low-to-high') {
        return firstProduct.price - secondProduct.price;
      }

      return 0;
    });

  const togglePriceOrder = () => {
    setPriceOrder((currentOrder) => {
      if (currentOrder === null || currentOrder === 'low-to-high') {
        return 'high-to-low';
      }

      return 'low-to-high';
    });
  };

  return (
    <main className="catalog-page">
      
      <header className="header-glass">
        <div className="logo">Peri-Soft</div>
        <nav>
          <ul className="nav-links">
            <li><a href="#hero">Novedades</a></li>
            <li><a href="#catalogo">Catalogo</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <section id="hero" className="advertisement-carousel" aria-label="Publicidad destacada">
        <div className="carousel-slide">
          <img
            src={advertisements[activeAd].image}
            alt={advertisements[activeAd].alt}
            className="carousel-image"
          />
          <div className="carousel-content">
            <span className="carousel-label">Ofertas</span>
            <h2>{advertisements[activeAd].title}</h2>
            <p>{advertisements[activeAd].text}</p>
          </div>
        </div>

      </section>
            
      <div className="filter-bar" aria-label="Filtros de productos">
        <h2>Filtros</h2>

        <label className="filter-select-label">
          Tipo de switch
          <select
            value={switchFilter}
            onChange={(event) => setSwitchFilter(event.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="Brown">Brown</option>
          </select>
        </label>

        <button
          type="button"
          className={`filter-button ${priceOrder ? 'is-active' : ''}`}
          onClick={togglePriceOrder}
          aria-label={priceOrder === 'high-to-low'
            ? 'Ordenar precio de mayor a menor'
            : 'Ordenar precio de menor a mayor'}
        >
          Precio {priceOrder === 'high-to-low' ? '↑' : '↓'}
        </button>

        <button
          type="button"
          className={`filter-button ${offersOnly ? 'is-active' : ''}`}
          onClick={() => setOffersOnly((currentValue) => !currentValue)}
          aria-pressed={offersOnly}
        >
          Ofertas
        </button>
      </div>


      <section id="catalogo" className="catalog-grid" aria-label="Lista de teclados">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img src={product.image} alt={product.title} className="product-image" />
            </div>

            <div className="product-info">
              <span className="product-tag">{product.color}</span>
              <h2>{product.title}</h2>
              
              <h2>${product.price}</h2>
            </div>

            <button
              type="button"
              className="product-button"
              onClick={() => navigate(`/producto/${product.id}`)}
            >
              Ver producto
            </button>
          </article>
        ))}
        {filteredProducts.length === 0 && (
          <p className="empty-results">No hay productos con esos filtros.</p>
        )}
      </section>
      <hr></hr>
      
        <footer id="contacto" className="footer">
          <section id="contacto">
        <div className="footer-content">
          <p>&copy; 2026 Peri-Soft. Todos los derechos reservados.</p>
          <p> Dirección: Constitución 3098-Piso 1 </p>
          <p> Teléfono: 8115724815</p>
        </div>
        </section>
      </footer>
      
    </main>
  );
}

function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return <Resultados product={product} onBack={() => navigate('/')} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/producto/:productId" element={<ProductPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

