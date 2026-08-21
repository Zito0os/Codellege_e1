import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';

import cor from './assets/cor.jpg';
import RAZER from './assets/RAZER.PNG';
import REDRAGON from './assets/REDDRAGON.PNG';
import LOGITECH from './assets/LOGITECH.PNG';
import EPOMAKER from './assets/EPOMAKER.PNG';
import iconface from './assets/iconface.PNG';
import iconinsta from './assets/iconinsta.PNG';
import iconwhatsapp from './assets/iconwhatsapp.PNG';
import icontiktok from './assets/icontiktok.PNG';
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
    description:
      'Teclado mecánico económico con excelente iluminación, perfecto para empezar en gaming.',
    image: REDRAGON,
    id: 1,
  },
  {
    title: 'Corsair',
    color: 'Negro/Gris',
    tipo_switch: 'Red',
    descuento: 0,
    price: 2499.00,
    description:
      'Teclado premium para jugadores exigentes con acabados y desempeño superiores.',
    image: cor,
    id: 2,
  },
  {
    title: 'Razer',
    color: 'Verde/Negro',
    tipo_switch: 'Brown',
    descuento: 15,
    price: 1899.00,
    description:
      'Con switches ultrarrápidos y tecnología RGB para una experiencia competitiva.',
    image: RAZER,
    id: 3,
  },
  {
    title: 'Logitech',
    color: 'Blanco/Negro',
    tipo_switch: 'Brown',
    descuento: 0,
    price: 1599.00,
    description:
      'Diseño elegante y funcional, ideal para trabajo diario con buen rendimiento.',
    image: LOGITECH,
    id: 4,
  },
  {
    title: 'Epomaker',
    color: 'Verde/Negro',
    tipo_switch: 'Blue',
    descuento: 0,
    price: 1600.00,
    description:
      'Wireless gaming keyboard with RGB lighting.',
    image: EPOMAKER,
    id: 5,
  },
  {
    title: 'Razer',
    color: 'Blanco/Negro',
    tipo_switch: 'Red',
    descuento: 0,
    price: 1400.00,
    description:
      'Teclado arcoiris negro.',
    image: arco,
    id: 6,
  },
  {
    title: 'Terport',
    color: 'Negro',
    tipo_switch: 'Brown',
    descuento: 0,
    price: 1799.00,
    description:
      '4 efectos de iluminacion.',
    image: ter,
    id: 7,
  },
  {
    title: 'Logitech',
    color: 'Rosa',
    tipo_switch: 'Blue',
    descuento: 50,
    price: 1399.00,
    description:
      'Teclado compacto bluetooth para windows.',
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
    alt: 'Promoción de teclados Logitech',
    title: 'Ilumina cada jugada',
    text:
      'RGB y rendimiento para llevar tu experiencia al siguiente nivel.',
  },
];

/* =====================================================
   HEADER
   ===================================================== */

function Header({
  menuOpen,
  setMenuOpen,
  cart,
  favorites,
  removeFromCart,
  updateCartQuantity,
}) {
  const [cartOpen, setCartOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goToSection = (sectionId) => {
    setMenuOpen(false);
    setCartOpen(false);

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

  /* =====================================================
     CALCULAR CARRITO
     ===================================================== */

  const calculateCart = () => {
    let subtotal = 0;
    let totalDiscount = 0;

    cart.forEach((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      if (!product) {
        return;
      }

      const discount =
        (product.price * product.descuento) / 100;

      const finalPrice =
        product.price - discount;

      subtotal +=
        product.price * item.quantity;

      totalDiscount +=
        discount * item.quantity;
    });

    return {
      subtotal,
      totalDiscount,
      total: subtotal - totalDiscount,
    };
  };

  const cartTotals = calculateCart();

  return (
    <header className="header-glass">

      <div className="logo">
        Peri-Soft
      </div>

      {/* =================================================
          BOTÓN CARRITO
          ================================================= */}

      <button
        type="button"
        className="header-cart-button"
        onClick={() =>
          setCartOpen(
            (current) => !current
          )
        }
      >
        🛒 Carrito ({cartCount})
      </button>

      {/* =================================================
          VENTANA DEL CARRITO
          ================================================= */}

      {cartOpen && (
        <div className="cart-menu">

          <div className="cart-menu-header">

            <h2>
              🛒 Mi Carrito
            </h2>

            <button
              type="button"
              className="cart-close"
              onClick={() =>
                setCartOpen(false)
              }
            >
              ✕
            </button>

          </div>

          {cart.length === 0 ? (

            <div className="cart-empty">

              <div className="cart-empty-icon">
                🛒
              </div>

              <h3>
                Tu carrito está vacío
              </h3>

              <p>
                Agrega productos desde el catálogo.
              </p>

            </div>

          ) : (

            <>

              {/* PRODUCTOS */}

              <div className="cart-menu-items">

                {cart.map((item) => {

                  const product =
                    products.find(
                      (product) =>
                        product.id === item.id
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

                  const itemTotal =
                    finalPrice *
                    item.quantity;

                  return (
                    <div
                      className="cart-menu-item"
                      key={item.id}
                    >

                      <img
                        src={product.image}
                        alt={product.title}
                        className="cart-menu-item-image"
                      />

                      <div className="cart-menu-item-info">

                        <h3>
                          {product.title}
                        </h3>

                        <p className="cart-item-color">
                          {product.color}
                        </p>

                        {product.descuento > 0 && (
                          <span className="cart-discount">
                            -{product.descuento}%
                          </span>
                        )}

                        <div className="cart-prices">

                          {product.descuento > 0 && (
                            <span className="cart-original-price">
                              ${product.price.toFixed(2)}
                            </span>
                          )}

                          <span className="cart-final-price">
                            ${finalPrice.toFixed(2)}
                          </span>

                        </div>

                        <div className="cart-item-controls">

                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                        <p className="cart-item-total">
                          Total: $
                          {itemTotal.toFixed(2)}
                        </p>

                      </div>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        ✕
                      </button>

                    </div>
                  );
                })}

              </div>

              {/* =================================================
                  RESUMEN
                  ================================================= */}

              <div className="cart-summary">

                <div className="cart-summary-row">
                  <span>
                    Subtotal:
                  </span>

                  <span>
                    $
                    {cartTotals.subtotal.toFixed(
                      2
                    )}
                  </span>
                </div>

                <div className="cart-summary-row cart-discount-row">
                  <span>
                    Descuento:
                  </span>

                  <span>
                    -$
                    {cartTotals.totalDiscount.toFixed(
                      2
                    )}
                  </span>
                </div>

                <div className="cart-summary-total">

                  <strong>
                    Total a pagar:
                  </strong>

                  <strong>
                    $
                    {cartTotals.total.toFixed(
                      2
                    )}
                  </strong>

                </div>

                <button
                  type="button"
                  className="checkout-btn"
                >
                  Ir al Pago
                </button>

              </div>

            </>
          )}

        </div>
      )}

      {/* =================================================
          MENÚ HAMBURGUESA
          ================================================= */}

      <button
        type="button"
        className={`hamburger-button ${
          menuOpen
            ? 'is-active'
            : ''
        }`}
        onClick={() =>
          setMenuOpen(
            (current) => !current
          )
        }
        aria-label={
          menuOpen
            ? 'Cerrar menú'
            : 'Abrir menú'
        }
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
        className={`side-menu ${
          menuOpen
            ? 'menu-open'
            : ''
        }`}
        aria-label="Menú principal"
      >

        <div className="menu-header">

          <h2>
            Menú
          </h2>

          <button
            type="button"
            className="menu-close"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            ✕
          </button>

        </div>

        <ul className="menu-links">

          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() =>
                goToSection('hero')
              }
            >
              Novedades
            </button>
          </li>

          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() =>
                goToSection('catalogo')
              }
            >
              Catálogo
            </button>
          </li>

          <li className="menu-divider"></li>

          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() =>
                setCartOpen(true)
              }
            >
              🛒 Carrito ({cartCount})
            </button>
          </li>

          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() =>
                goToSection('favoritos')
              }
            >
              ❤️ Favoritos ({favoritesCount})
            </button>
          </li>

          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() =>
                goToSection('contacto')
              }
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

  const [activeAd, setActiveAd] =
    useState(0);

  const [switchFilter, setSwitchFilter] =
    useState('Todos');

  const [priceOrder, setPriceOrder] =
    useState(null);

  const [offersOnly, setOffersOnly] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cart, setCart] =
    useState([]);

  const [favorites, setFavorites] =
    useState([]);

  /* =====================================================
     CARRUSEL
     ===================================================== */

  useEffect(() => {

    const timer =
      window.setInterval(() => {

        setActiveAd(
          (currentAd) =>
            (currentAd + 1) %
            advertisements.length
        );

      }, 5000);

    return () =>
      window.clearInterval(timer);

  }, []);

  const showAd = (index) => {

    setActiveAd(
      (index +
        advertisements.length) %
      advertisements.length
    );

  };

  const nextAd = () =>
    showAd(activeAd + 1);

  const previousAd = () =>
    showAd(activeAd - 1);

  /* =====================================================
     FILTROS
     ===================================================== */

  const filteredProducts =
    products
      .filter(
        (product) =>
          switchFilter === 'Todos' ||
          product.tipo_switch ===
            switchFilter
      )
      .filter(
        (product) =>
          !offersOnly ||
          product.descuento > 0
      )
      .sort(
        (
          firstProduct,
          secondProduct
        ) => {

          if (
            priceOrder ===
            'high-to-low'
          ) {
            return (
              secondProduct.price -
              firstProduct.price
            );
          }

          if (
            priceOrder ===
            'low-to-high'
          ) {
            return (
              firstProduct.price -
              secondProduct.price
            );
          }

          return 0;

        }
      );

  const togglePriceOrder = () => {

    setPriceOrder(
      (currentOrder) => {

        if (
          currentOrder === null ||
          currentOrder ===
            'low-to-high'
        ) {
          return 'high-to-low';
        }

        return 'low-to-high';

      }
    );

  };

  /* =====================================================
     CARRITO
     ===================================================== */

  const handleAddToCart = (
    productId
  ) => {

    setCart(
      (currentCart) => {

        const existingItem =
          currentCart.find(
            (item) =>
              item.id ===
              productId
          );

        if (existingItem) {

          return currentCart.map(
            (item) =>
              item.id ===
              productId
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      1,
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

      }
    );

  };

  const removeFromCart = (
    productId
  ) => {

    setCart(
      (currentCart) =>
        currentCart.filter(
          (item) =>
            item.id !==
            productId
        )
    );

  };

  const updateCartQuantity = (
    productId,
    newQuantity
  ) => {

    if (newQuantity <= 0) {

      removeFromCart(
        productId
      );

      return;
    }

    setCart(
      (currentCart) =>
        currentCart.map(
          (item) =>
            item.id ===
            productId
              ? {
                  ...item,
                  quantity:
                    newQuantity,
                }
              : item
        )
    );

  };

  /* =====================================================
     FAVORITOS
     ===================================================== */

  const handleToggleFavorite = (
    productId
  ) => {

    setFavorites(
      (currentFavorites) => {

        if (
          currentFavorites.includes(
            productId
          )
        ) {

          return currentFavorites.filter(
            (id) =>
              id !== productId
          );

        }

        return [
          ...currentFavorites,
          productId,
        ];

      }
    );

  };

  const removeFromFavorites = (
    productId
  ) => {

    setFavorites(
      (currentFavorites) =>
        currentFavorites.filter(
          (id) =>
            id !== productId
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
        removeFromCart={removeFromCart}
        updateCartQuantity={
          updateCartQuantity
        }
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
            src={
              advertisements[
                activeAd
              ].image
            }
            alt={
              advertisements[
                activeAd
              ].alt
            }
            className="carousel-image"
          />

          <div className="carousel-content">

            <span className="carousel-label">
              Ofertas
            </span>

            <h2>
              {
                advertisements[
                  activeAd
                ].title
              }
            </h2>

            <p>
              {
                advertisements[
                  activeAd
                ].text
              }
            </p>

          </div>

        </div>

        <button
          type="button"
          className="carousel-control carousel-control-previous"
          onClick={previousAd}
        >
          &#10094;
        </button>

        <button
          type="button"
          className="carousel-control carousel-control-next"
          onClick={nextAd}
        >
          &#10095;
        </button>

        <div className="carousel-dots">

          {advertisements.map(
            (
              advertisement,
              index
            ) => (

              <button
                type="button"
                className={`carousel-dot ${
                  index ===
                  activeAd
                    ? 'is-active'
                    : ''
                }`}
                onClick={() =>
                  showAd(index)
                }
                key={
                  advertisement.title
                }
              />

            )
          )}

        </div>

      </section>

      {/* =================================================
          FILTROS
          ================================================= */}

      <div className="filter-bar">

        <h2>
          Filtros
        </h2>

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
          onClick={
            togglePriceOrder
          }
        >
          Precio{' '}
          {priceOrder ===
          'high-to-low'
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

                {product.descuento >
                  0 && (

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

        {filteredProducts.length ===
          0 && (

          <p className="empty-results">
            No hay productos con esos filtros.
          </p>

        )}

      </section>

      {/* =================================================
          FAVORITOS
          ================================================= */}

      <section
        id="favoritos"
        className="favorites-section"
      >

        <h2>
          ❤️ Mis Favoritos
        </h2>

        {favorites.length ===
        0 ? (

          <p className="empty-message">
            No tienes productos favoritos.
          </p>

        ) : (

          <div className="favorites-list">

            {favorites.map(
              (favId) => {

                const product =
                  products.find(
                    (p) =>
                      p.id ===
                      favId
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
                    >
                      ✕
                    </button>

                  </div>

                );

              }
            )}

          </div>

        )}

      </section>

      <hr />

      {/* =================================================
          FOOTER
          ================================================= */}

      <footer className="footer">
  {/* Columna 1 */}
  <div className="footer-column">
    <h4>Soporte al cliente</h4>
    <ul className="footer-nav-list">
      <li><a href="#">Seguimiento de Pedido</a></li>
      <li><a href="#">Envíos y Devoluciones</a></li>
      <li><a href="#">Preguntas Frecuentes</a></li>
    </ul>
  </div>

  {/* Columna 2 */}
  <div className="footer-column">
    <h4>Acerca de Peri-Soft</h4>
    <ul className="footer-nav-list">
      <li><a href="#">Quiénes Somos</a></li>
      <li><a href="#">Términos y Condiciones</a></li>
      <li><a href="#">Política de Privacidad</a></li>
    </ul>
  </div>

  {/* Columna 3 */}
  <div className="footer-column">
    <h4>Promociones</h4>
    <ul className="footer-nav-list">
      <li><a href="#">Ofertas del Mes</a></li>
      <li><a href="#">Cupones de Descuento</a></li>
      <li><a href="#">Kits Completos</a></li>
    </ul>
  </div> {/* <-- Aquí faltaba este cierre */}

   {/* Columna 4 */}
<div className="footer-column">
  <h4>Redes sociales</h4>
  <div className="social-icons-container">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
      <img src={iconface} alt="Facebook" className="social-img-icon" /> 
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
      <img src={iconinsta} alt="Instagram" className="social-img-icon" /> 
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
      <img src={iconwhatsapp} alt="YouTube" className="social-img-icon" /> 
    </a>
    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok">
      <img src={icontiktok} alt="TikTok" className="social-img-icon" /> 
    </a>
  </div>
</div>
</footer>


    </main>
  );
}

/* =====================================================
   PRODUCT PAGE
   ===================================================== */

function ProductPage() {

  const navigate =
    useNavigate();

  const { productId } =
    useParams();

  const product =
    products.find(
      (item) =>
        item.id ===
        Number(productId)
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
      onBack={() =>
        navigate('/')
      }
    />
  );
}

/* =====================================================
   APP
   ===================================================== */

export default function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={
          <Catalog />
        }
      />

      <Route
        path="/producto/:productId"
        element={
          <ProductPage />
        }
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