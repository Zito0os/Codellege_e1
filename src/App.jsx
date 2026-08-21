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
import iconface from './assets/facebook.png';
import iconinsta from './assets/instagram.png';
import iconyoutube from './assets/youtube.png';
import icontiktok from './assets/tiktok.png';
import pub1 from './assets/pub1.jpg';
import pub2 from './assets/pub2.jpg';
import pub3 from './assets/pub3.jpg';
import Resultados from './Resultados';
import Compra from './Compra_realizada';
import log from './assets/log.PNG';
import ter from './assets/ter.jpg';
import arco from './assets/arco.jpg';
import './App.css';

// lista productos
const products = [
  {
    title: 'Reddragon',
    color: 'Rojo',
    descuento: 10,
    tipo_switch: 'Blue',
    price: 899.00,
    description: 'El aliado perfecto para dar el salto al gaming competitivo sin gastar de más. Con su formato compacto del 60%, este Redragon libera espacio vital en tu escritorio para mover el mouse con total libertad. Sus switches Blue ofrecen esa respuesta táctil y el clásico sonido "clicky" súper preciso en cada partida.',
    image: REDRAGON,
    id: 1,
  },
  {
    title: 'Corsair',
    color: 'Negro/Gris',
    tipo_switch: 'Red',
    descuento: 0,
    price: 2499.00,
    description: 'El buque insignia definitivo para tu setup. Construcción sólida en aluminio cepillado con switches Red lineales para una velocidad de respuesta instantánea y fluida. Incluye panel de control táctil, teclas macro dedicadas y reposamuñecas ergonómico de máximo confort para dominar cualquier partida.',
    image: cor,
    id: 2,
  },
  {
    title: 'Razer',
    color: 'Verde/Negro',
    tipo_switch: 'Brown',
    descuento: 15,
    price: 1899.00,
    description:'Diseñado para llevar tu rendimiento al siguiente nivel. Equipado con switches Brown de respuesta táctil equilibrada y silenciosa, este teclado Razer combina la velocidad necesaria para partidas competitivas con la comodidad ideal para largas sesiones de juego o trabajo.',
    image: RAZER,
    id: 3,
  },
  {
    title: 'Logitech',
    color: 'Blanco/Negro',
    tipo_switch: 'Brown',
    descuento: 0,
    price: 1599.00,
    description: 'Diseñado bajo los estándares del gaming profesional. Su formato TKL optimiza el espacio en tu escritorio para un control absoluto del mouse, mientras que sus switches Brown ofrecen una respuesta táctil rápida, silenciosa y ultraprecisa. La combinación ideal para dominar tanto en partidas competitivas como en tu jornada diaria.',
    image: LOGITECH,
    id: 4,
  },
  {
    title: 'Epomaker',
    color: 'Verde/Negro',
    tipo_switch: 'Blue',
    descuento: 0,
    price: 1600.00,
    description: 'Libertad inalámbrica y un diseño ultra compacto para tu setup. Este Epomaker combina una excelente calidad de construcción con conectividad wireless para mantener tu escritorio impecable y libre de cables. Equipado con switches Blue para una respuesta táctil instantánea y el inconfundible sonido "clicky" en cada pulsación.',
    image: EPOMAKER,
    id: 5,
  },
  {
    title: 'Razer',
    color: 'Blanco/Negro',
    tipo_switch: 'Red',
    descuento: 0,
    price: 1400.00,
    description: 'Estética vibrante y velocidad en cada tecla. Este modelo cuenta con iluminación arcoíris envolvente y switches Red lineales que garantizan pulsaciones suaves, fluidas y ultrarrápidas sin resistencia al presionar. Su diseño de teclas flotantes no solo luce increíble en tu escritorio, sino que facilita la limpieza y mejora la ergonomía en largas sesiones.',
    image: arco,
    id: 6,
  },
  {
    title: 'Terport',
    color: 'Negro',
    tipo_switch: 'Brown',
    descuento: 0,
    price: 1799.00,
    description: 'Estética lateral envolvente y tacto equilibrado en cada tecla. Este teclado Terport destaca por su exclusiva tira de iluminación RGB en los bordes laterales con 4 modos configurables para darle una atmósfera única a tu setup. Equipado con switches Brown, ofrece el punto exacto entre respuesta táctil rápida para gaming y suavidad silenciosa para trabajo prolongado.',
    image: ter,
    id: 7,
  },
  {
    title: 'Logitech',
    color: 'Rosa',
    tipo_switch: 'Blue',
    descuento: 50,
    price: 1399.00,
    description: 'Estilo vibrante y libertad inalámbrica en un solo dispositivo. Este teclado Logitech en acabado rosa magenta aporta una estética audaz y moderna a tu setup. Su formato compacto con conectividad Bluetooth optimiza tu espacio de trabajo sin cables, mientras que sus switches Blue ofrecen una respuesta táctil ultraprecisa con el clásico clic audible en cada pulsación.',
    image: log,
    id: 8,
  },
];

// banners hero
const advertisements = [
  {
    image: pub1,
    alt: 'Promo Razer',
    title: 'Modelos 2025 en descuento',
    text: 'Teclados en oferta por tiempo limitado.',
  },
  {
    image: pub2,
    alt: 'Promo Logitech',
    title: 'Arma tu setup',
    text: 'Gana tus partidas sin imput-lag',
  },
  {
    image: pub3,
    alt: 'Promo Logitech mc',
    title: 'RGB incluido',
    text: 'Modelos tematizados, eligelo a tu manera.',
  },
];

// header pagina
function Header({
  menuOpen,
  setMenuOpen,
  cart,
  favorites,
  removeFromCart,
  updateCartQuantity,
}) {
  const navigate = useNavigate();
  // abrir cerrar carrito
  const [cartOpen, setCartOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ir a seccion
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
      } else {
        navigate('/');
      }
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  // sumar total carrito
  const calculateCart = () => {
    let subtotal = 0;
    let totalDiscount = 0;

    cart.forEach((item) => {
      const product = products.find((product) => product.id === item.id);
      if (!product) {
        return;
      }

      const discount = (product.price * product.descuento) / 100;
      const finalPrice = product.price - discount;

      subtotal += product.price * item.quantity;
      totalDiscount += discount * item.quantity;
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
      <div className="logo">Peri-Soft</div>

      <button
        type="button"
        className="header-cart-button"
        onClick={() => setCartOpen((current) => !current)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        <span>({cartCount})</span>
      </button>

      {cartOpen && (
        <div className="cart-menu">
          <div className="cart-menu-header">
            <h2>Mi Carrito</h2>
            <button
              type="button"
              className="cart-close"
              onClick={() => setCartOpen(false)}
            >
              X
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <h3>Tu carrito esta vacio</h3>
              <p>Agrega productos desde el catalogo.</p>
            </div>
          ) : (
            <>
              <div className="cart-menu-items">
                {cart.map((item) => {
                  const product = products.find(
                    (product) => product.id === item.id
                  );

                  if (!product) {
                    return null;
                  }

                  const discount = (product.price * product.descuento) / 100;
                  const finalPrice = product.price - discount;
                  const itemTotal = finalPrice * item.quantity;

                  return (
                    <div className="cart-menu-item" key={item.id}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="cart-menu-item-image"
                      />

                      <div className="cart-menu-item-info">
                        <h3>{product.title}</h3>
                        <p className="cart-item-color">{product.color}</p>

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
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <p className="cart-item-total">
                          Total: ${itemTotal.toFixed(2)}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Subtotal:</span>
                  <span>${cartTotals.subtotal.toFixed(2)}</span>
                </div>

                <div className="cart-summary-row cart-discount-row">
                  <span>Descuento:</span>
                  <span>-${cartTotals.totalDiscount.toFixed(2)}</span>
                </div>

                <div className="cart-summary-total">
                  <strong>Total a pagar:</strong>
                  <strong>${cartTotals.total.toFixed(2)}</strong>
                </div>

                <button type="button" className="checkout-btn">
                  Ir al Pago
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        className={`hamburger-button ${menuOpen ? 'is-active' : ''}`}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`side-menu ${menuOpen ? 'menu-open' : ''}`}>
        <div className="menu-header">
          <h2>Menu</h2>
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
              Catalogo
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
          <li className="menu-divider"></li>
          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() => {
                setMenuOpen(false);
                setCartOpen(true);
              }}
            >
              Carrito ({cartCount})
            </button>
          </li>
          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() => goToSection('favoritos')}
            >
              Favoritos ({favoritesCount})
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// pagina catalogo
function Catalog() {
  const navigate = useNavigate();
  const [activeAd, setActiveAd] = useState(0);
  const [switchFilter, setSwitchFilter] = useState('Todos');
  const [priceOrder, setPriceOrder] = useState(null);
  const [offersOnly, setOffersOnly] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // guardado carrito
  const [cart, setCart] = useState([]);
  // guardado favoritos
  const [favorites, setFavorites] = useState([]);

  // mover carrusel
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

  // filtrar productos
  const filteredProducts = [...products]
    .filter(
      (product) =>
        switchFilter === 'Todos' || product.tipo_switch === switchFilter
    )
    .filter((product) => !offersOnly || product.descuento > 0)
    .sort((a, b) => {
      if (priceOrder === 'high-to-low') {
        return b.price - a.price;
      }
      if (priceOrder === 'low-to-high') {
        return a.price - b.price;
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

  // agregar carrito
  const handleAddToCart = (productId) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === productId);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { id: productId, quantity: 1 }];
    });
  };

  // quitar carrito
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  // cambiar cantidad carrito
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // poner quitar favorito
  const handleToggleFavorite = (productId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(productId)) {
        return currentFavorites.filter((id) => id !== productId);
      }
      return [...currentFavorites, productId];
    });
  };

  // quitar favorito
  const removeFromFavorites = (productId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((id) => id !== productId)
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
        updateCartQuantity={updateCartQuantity}
      />

      <section id="hero" className="advertisement-carousel">
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
          {advertisements.map((advertisement, index) => (
            <button
              type="button"
              className={`carousel-dot ${index === activeAd ? 'is-active' : ''}`}
              onClick={() => showAd(index)}
              key={advertisement.title}
            />
          ))}
        </div>
      </section>

      <div className="filter-bar">
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
        >
          Precio {priceOrder === 'high-to-low' ? '↑' : '↓'}
        </button>

        <button
          type="button"
          className={`filter-button ${offersOnly ? 'is-active' : ''}`}
          onClick={() => setOffersOnly((currentValue) => !currentValue)}
        >
          Ofertas
        </button>
      </div>

      <section id="catalogo" className="catalog-grid">
        {filteredProducts.map((product) => (
          <article
            className="product-card"
            key={product.id}
            onClick={() => navigate(`/producto/${product.id}`)}
          >
            <div className="product-image-wrap">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />

              {product.descuento > 0 && (
                <span className="discount-badge">-{product.descuento}%</span>
              )}

              <button
                type="button"
                className={`favorite-heart ${
                  favorites.includes(product.id) ? 'active' : ''
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleToggleFavorite(product.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
              </button>
            </div>

            <div className="product-info">
              <span className="product-tag">{product.color}</span>
              <h2>{product.title}</h2>
              <h2>${product.price.toFixed(2)}</h2>
            </div>

            <div className="product-actions">
              <button
                type="button"
                className="product-button product-button-secondary add-cart-button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddToCart(product.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </button>
            </div>
          </article>
        ))}

        {filteredProducts.length === 0 && (
          <p className="empty-results">
            No hay productos con esos filtros.
          </p>
        )}
      </section>

      <section
        id="favoritos"
        className={`favorites-section ${
          favorites.length === 0 ? 'is-empty' : ''
        }`}
      >
        <h2>Mis Favoritos</h2>

        {favorites.length === 0 ? (
          <p className="empty-message">No tienes productos favoritos.</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((favId) => {
              const product = products.find((p) => p.id === favId);
              if (!product) {
                return null;
              }

              return (
                <div key={favId} className="favorite-item">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="favorite-item-image"
                  />
                  <div className="favorite-item-info">
                    <h4>{product.title}</h4>
                    <p>{product.color}</p>
                    <p className="item-price">${product.price.toFixed(2)}</p>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromFavorites(favId)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <hr />

      <footer className="footer" id="contacto">
        <div className="footer-column">
          <h4>Soporte al cliente</h4>
          <ul className="footer-nav-list">
            <li><a href="#">Seguimiento de Pedido</a></li>
            <li><a href="#">Envios y Devoluciones</a></li>
            <li><a href="#">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Acerca de Peri-Soft</h4>
          <ul className="footer-nav-list">
            <li><a href="#">Quienes Somos</a></li>
            <li><a href="#">Terminos y Condiciones</a></li>
            <li><a href="#">Politica de Privacidad</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Promociones</h4>
          <ul className="footer-nav-list">
            <li><a href="#">Ofertas del Mes</a></li>
            <li><a href="#">Cupones de Descuento</a></li>
            <li><a href="#">Kits Completos</a></li>
          </ul>
        </div>

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
              <img src={iconyoutube} alt="YouTube" className="social-img-icon" />
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

// pagina producto
function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  // guardado carrito
  const [cart, setCart] = useState([]);
  // guardado favoritos
  const [favorites, setFavorites] = useState([]);

  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return <Navigate to="/" replace />;
  }

  // quitar carrito
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  // cambiar cantidad carrito
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cart={cart}
        favorites={favorites}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
      />
      <Resultados
        product={product}
        onBack={() => navigate('/')}
        onBuy={() => navigate(`/compra/${product.id}`)}
      />
    </>
  );
}

// pagina compra
function CompraPage() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <Compra
      product={product}
      onBack={() => navigate('/')}
    />
  );
}

// rutas app
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/producto/:productId" element={<ProductPage />} />
      <Route path="/compra/:productId" element={<CompraPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
