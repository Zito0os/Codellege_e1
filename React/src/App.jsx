import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import cor from './assets/cor.jpg';
import RAZER from './assets/RAZER.PNG';
import REDRAGON from './assets/REDDRAGON.PNG';
import LOGITECH from './assets/LOGITECH.PNG';
import EPOMAKER from './assets/EPOMAKER.PNG';
import Resultados from './Resultados';
import log from './assets/log.PNG';
import ter from './assets/ter.jpg';
import arco from './assets/arco.jpg';
import './App.css';

const products = [
  {
    title: 'Reddragon',
    color: 'Rojo',
    descuento: 10,
    tipo_switch: 'Blue',
    price: 899.00,
    description: 'Teclado mecánico económico con excelente iluminación, perfecto para empezar en gaming.',
    image: REDRAGON,
    id: 1,
  },
  {
    title: 'Corsair',
    color: 'Negro/Gris',
    tipo_switch: 'Red',
    descuento: 0,
    price: 2499.00,
    description: 'Teclado premium para jugadores exigentes con acabados y desempeño superiores.',
    image: cor,
    id: 2,
  },
  {
    title: 'Razer',
    color: 'Verde/Negro',
    tipo_switch: 'Brown',
    descuento: 15,
    price: 1899.00,
    description: 'Con switches ultrarrápidos y tecnología RGB para una experiencia competitiva.',
    image: RAZER,
    id: 3,
  },
  {
    title: 'Logitech',
    color: 'Blanco/Negro',
    tipo_switch: 'Brown',
    descuento: 0,
    price: 1599.00,
    description: 'Diseño elegante y funcional, ideal para trabajo diario con buen rendimiento.',
    image: LOGITECH,
    id: 4,
  },
  {
    title: 'Epomaker',
    color: 'Verde/Negro',
    tipo_switch: 'Blue',
    descuento: 0,
    price: 1600.00,
    description: 'Wireless gaming keyboard with RGB lighting.',
    image: EPOMAKER,
    id: 5,
  },
  {
    title: 'Razer',
    color: 'Blanco/Negro',
    tipo_switch: 'Red',
    descuento: 0,
    price: 1400.00,
    description: 'Teclado arcoiris negro.',
    image: arco,
    id: 6,
  },
  {
    title: 'Terport',
    color: 'Negro',
    tipo_switch: 'Brown',
    descuento: 0,
    price: 1799.00,
    description: '4 efectos de iluminacion.',
    image: ter,
    id: 7,
  },
  {
    title: 'Logitech',
    color: 'Rosa',
    tipo_switch: 'Blue',
    descuento: 50,
    price: 1399.00,
    description: 'Teclado compacto bluetooth para windows.',
    image: log,
    id: 8,
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

/* =====================================================
   HEADER CON MENÚ HAMBURGUESA
   ===================================================== */

function Header({ menuOpen, setMenuOpen, cart, favorites }) {
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goToSection = (sectionId) => {
    setMenuOpen(false);

    requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const favoritesCount = favorites.length;

  return (
    <header className="header-glass">
      <div className="logo">Peri-Soft</div>

      <button
        type="button"
        className={`hamburger-button ${menuOpen ? 'is-active' : ''}`}
        onClick={() => setMenuOpen((current) => !current)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={closeMenu}
        />
      )}

      <nav
        className={`side-menu ${menuOpen ? 'menu-open' : ''}`}
        aria-label="Menú principal"
      >
        <div className="menu-header">
          <h2>Menú</h2>

          <button
            type="button"
            className="menu-close"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            
          </button>
        </div>

        <ul className="menu-links">
          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() => goToSection('hero')}
            >
              Novedades
            </button>
          </li>

          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() => goToSection('catalogo')}
            >
              Catálogo
            </button>
          </li>

          <li className="menu-divider"></li>

          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() => goToSection('carrito')}
            >
              🛒 Carrito ({cartCount})
            </button>
          </li>

          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() => goToSection('favoritos')}
            >
              ❤️ Favoritos ({favoritesCount})
            </button>
          </li>

          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() => goToSection('contacto')}
            >
              Contacto
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

/* =====================================================
   CATÁLOGO
   ===================================================== */

function Catalog() {
  const navigate = useNavigate();

  const [activeAd, setActiveAd] = useState(0);
  const [switchFilter, setSwitchFilter] = useState('Todos');
  const [priceOrder, setPriceOrder] = useState(null);
  const [offersOnly, setOffersOnly] = useState(false);

  // Funcionalidades nuevas
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAd(
        (currentAd) =>
          (currentAd + 1) % advertisements.length
      );
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const showAd = (index) => {
    setActiveAd(
      (index + advertisements.length) %
        advertisements.length
    );
  };

  const nextAd = () => showAd(activeAd + 1);
  const previousAd = () => showAd(activeAd - 1);

  const filteredProducts = products
    .filter(
      (product) =>
        switchFilter === 'Todos' ||
        product.tipo_switch === switchFilter
    )
    .filter(
      (product) =>
        !offersOnly || product.descuento > 0
    )
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
      if (
        currentOrder === null ||
        currentOrder === 'low-to-high'
      ) {
        return 'high-to-low';
      }

      return 'low-to-high';
    });
  };

  /* =====================================================
     CARRITO
     ===================================================== */

  const handleAddToCart = (productId) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === productId
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: productId,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(
        (p) => p.id === item.id
      );

      if (!product) {
        return total;
      }

      const discount =
        (product.price * product.descuento) / 100;

      const finalPrice =
        product.price - discount;

      return (
        total +
        finalPrice * item.quantity
      );
    }, 0);
  };

  /* =====================================================
     FAVORITOS
     ===================================================== */

  const handleToggleFavorite = (productId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(productId)) {
        return currentFavorites.filter(
          (id) => id !== productId
        );
      }

      return [
        ...currentFavorites,
        productId,
      ];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (id) => id !== productId
      )
    );
  };

  return (
    <main className="catalog-page">

      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cart={cart}
        favorites={favorites}
      />

      {/* =================================================
         CARRUSEL
         ================================================= */}

      <section
        id="hero"
        className="advertisement-carousel"
        aria-label="Publicidad destacada"
      >
        <div className="carousel-slide">
          <img
            src={advertisements[activeAd].image}
            alt={advertisements[activeAd].alt}
            className="carousel-image"
          />

          <div className="carousel-content">
            <span className="carousel-label">
              Ofertas
            </span>

            <h2>
              {advertisements[activeAd].title}
            </h2>

            <p>
              {advertisements[activeAd].text}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="carousel-control carousel-control-previous"
          onClick={previousAd}
          aria-label="Publicidad anterior"
        >
          &#10094;
        </button>

        <button
          type="button"
          className="carousel-control carousel-control-next"
          onClick={nextAd}
          aria-label="Siguiente publicidad"
        >
          &#10095;
        </button>

        <div
          className="carousel-dots"
          aria-label="Seleccionar publicidad"
        >
          {advertisements.map(
            (advertisement, index) => (
              <button
                type="button"
                className={`carousel-dot ${
                  index === activeAd
                    ? 'is-active'
                    : ''
                }`}
                onClick={() => showAd(index)}
                aria-label={`Mostrar publicidad ${index + 1}`}
                aria-current={
                  index === activeAd
                    ? 'true'
                    : undefined
                }
                key={advertisement.title}
              />
            )
          )}
        </div>
      </section>

      {/* =================================================
         FILTROS
         ================================================= */}

      <div
        className="filter-bar"
        aria-label="Filtros de productos"
      >
        <h2>Filtros</h2>

        <label className="filter-select-label">
          Tipo de switch

          <select
            value={switchFilter}
            onChange={(event) =>
              setSwitchFilter(
                event.target.value
              )
            }
          >
            <option value="Todos">
              Todos
            </option>

            <option value="Blue">
              Blue
            </option>

            <option value="Red">
              Red
            </option>

            <option value="Brown">
              Brown
            </option>
          </select>
        </label>

        <button
          type="button"
          className={`filter-button ${
            priceOrder
              ? 'is-active'
              : ''
          }`}
          onClick={togglePriceOrder}
          aria-label={
            priceOrder === 'high-to-low'
              ? 'Ordenar precio de mayor a menor'
              : 'Ordenar precio de menor a mayor'
          }
        >
          Precio{' '}
          {priceOrder === 'high-to-low'
            ? '↑'
            : '↓'}
        </button>

        <button
          type="button"
          className={`filter-button ${
            offersOnly
              ? 'is-active'
              : ''
          }`}
          onClick={() =>
            setOffersOnly(
              (currentValue) =>
                !currentValue
            )
          }
          aria-pressed={offersOnly}
        >
          Ofertas
        </button>
      </div>

      {/* =================================================
         CATÁLOGO
         ================================================= */}

      <section
        id="catalogo"
        className="catalog-grid"
        aria-label="Lista de teclados"
      >
        {filteredProducts.map(
          (product) => (
            <article
              className="product-card"
              key={product.id}
            >
              <div className="product-image-wrap">

                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />

                {product.descuento > 0 && (
                  <span className="discount-badge">
                    -{product.descuento}%
                  </span>
                )}

                <button
                  type="button"
                  className={`favorite-heart ${
                    favorites.includes(
                      product.id
                    )
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    handleToggleFavorite(
                      product.id
                    )
                  }
                  aria-label={
                    favorites.includes(
                      product.id
                    )
                      ? 'Eliminar de favoritos'
                      : 'Agregar a favoritos'
                  }
                >
                  {favorites.includes(
                    product.id
                  )
                    ? '❤️'
                    : '🤍'}
                </button>
              </div>

              <div className="product-info">
                <span className="product-tag">
                  {product.color}
                </span>

                <h2>
                  {product.title}
                </h2>

                <h2>
                  ${product.price.toFixed(2)}
                </h2>
              </div>

              <div className="product-actions">

                <button
                  type="button"
                  className="product-button"
                  onClick={() =>
                    navigate(
                      `/producto/${product.id}`
                    )
                  }
                >
                  Ver producto
                </button>

                <button
                  type="button"
                  className="product-button product-button-secondary"
                  onClick={() =>
                    handleAddToCart(
                      product.id
                    )
                  }
                >
                  🛒 Agregar
                </button>

              </div>
            </article>
          )
        )}

        {filteredProducts.length === 0 && (
          <p className="empty-results">
            No hay productos con esos filtros.
          </p>
        )}
      </section>

      {/* =================================================
         CARRITO
         ================================================= */}

      <section
        id="carrito"
        className="cart-section"
      >
        <h2>🛒 Mi Carrito</h2>

        {cart.length === 0 ? (
          <p className="empty-message">
            Tu carrito está vacío.
          </p>
        ) : (
          <>
            <div className="cart-items">

              {cart.map((item) => {
                const product =
                  products.find(
                    (p) =>
                      p.id === item.id
                  );

                if (!product) {
                  return null;
                }

                const discount =
                  (product.price *
                    product.descuento) /
                  100;

                const finalPrice =
                  product.price -
                  discount;

                return (
                  <div
                    key={item.id}
                    className="cart-item"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="cart-item-image"
                    />

                    <div className="cart-item-info">
                      <h4>
                        {product.title}
                      </h4>

                      <p>
                        Cantidad:{' '}
                        {item.quantity}
                      </p>

                      <p className="item-price">
                        $
                        {(
                          finalPrice *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(
                          item.id
                        )
                      }
                      aria-label={`Eliminar ${product.title}`}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}

            </div>

            <div className="cart-total">
              <strong>
                Total: $
                {calculateTotal().toFixed(2)}
              </strong>
            </div>

            <button
              type="button"
              className="checkout-btn"
            >
              Ir al Pago
            </button>
          </>
        )}
      </section>

      {/* =================================================
         FAVORITOS
         ================================================= */}

      <section
        id="favoritos"
        className="favorites-section"
      >
        <h2>❤️ Mis Favoritos</h2>

        {favorites.length === 0 ? (
          <p className="empty-message">
            No tienes productos favoritos.
          </p>
        ) : (
          <div className="favorites-list">

            {favorites.map((favId) => {
              const product =
                products.find(
                  (p) => p.id === favId
                );

              if (!product) {
                return null;
              }

              return (
                <div
                  key={favId}
                  className="favorite-item"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="favorite-item-image"
                  />

                  <div className="favorite-item-info">
                    <h4>
                      {product.title}
                    </h4>

                    <p>
                      {product.color}
                    </p>

                    <p className="item-price">
                      $
                      {product.price.toFixed(
                        2
                      )}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() =>
                      removeFromFavorites(
                        favId
                      )
                    }
                    aria-label={`Eliminar ${product.title}`}
                  >
                    ✕
                  </button>
                </div>
              );
            })}

          </div>
        )}
      </section>

      <hr />

      {/* =================================================
         FOOTER
         ================================================= */}

      <footer
        id="contacto"
        className="footer"
      >
        <section id="contacto">
          <div className="footer-content">
            <p>
              &copy; 2026 Peri-Soft.
              Todos los derechos reservados.
            </p>

            <p>
              Dirección:
              Constitución 3098-Piso 1
            </p>

            <p>
              Teléfono: 8115724815
            </p>
          </div>
        </section>
      </footer>

    </main>
  );
}

/* =====================================================
   PÁGINA DEL PRODUCTO
   ===================================================== */

function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = products.find(
    (item) =>
      item.id === Number(productId)
  );

  if (!product) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <Resultados
      product={product}
      onBack={() => navigate('/')}
    />
  );
}

/* =====================================================
   APP / ROUTES
   ===================================================== */

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Catalog />}
      />

      <Route
        path="/producto/:productId"
        element={<ProductPage />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}
