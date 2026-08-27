import { useEffect, useRef, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
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
import CompraCarrito from './CompraCarrito';
import MiPerfil from './MiPerfil';
import Auth from './Auth';
import log from './assets/log.PNG';
import ter from './assets/ter.jpg';
import arco from './assets/arco.jpg';
import perfil from './assets/perfil.jpg';
import switch1 from './assets/switch1.webp';
import switch2 from './assets/switch2.webp';
import switch3 from './assets/switch3.webp';
import base1 from './assets/base1.webp';
import base2 from './assets/base2.webp';
import base3 from './assets/base3.jpg';
import pcb1 from './assets/pcb1.webp';
import pcb2 from './assets/pcb2.webp';
import pcb3 from './assets/pcb3.jpg';
import keycaps1 from './assets/keycaps1.webp';
import keycaps2 from './assets/keycaps2.webp';
import keycaps3 from './assets/keycaps3.png';
import './App.css';

// ir a perfil o login
const goToAccount = (navigate) => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      navigate('/perfil');
      return;
    }
  } catch {
    // sin sesion
  }

  navigate('/login');
};

const productImages = {
  'REDDRAGON.PNG': REDRAGON,
  'cor.jpg': cor,
  'RAZER.PNG': RAZER,
  'LOGITECH.PNG': LOGITECH,
  'EPOMAKER.PNG': EPOMAKER,
  'arco.jpg': arco,
  'ter.jpg': ter,
  'log.PNG': log,
};

const toProductView = (product) => ({
  ...product,
  title: product.nombre,
  price: Number(product.precio),
  image: productImages[product.imagen],
  tipo_switch: product.tipoSwitch,
});

// opciones personalizar
const basicColors = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#3b82f6',
  '#a855f7',
  '#ec4899',
  '#f8fafc',
];

const switchOptions = [
  { name: 'Rojo', precio: 420, image: switch1 },
  { name: 'Cafe', precio: 600, image: switch3 },
  { name: 'Azul', precio: 300, image: switch2 },
];

const baseColorOptions = [
  { name: 'Negra', precio: 400, image: base1 },
  { name: 'Blanca', precio: 420, image: base2 },
  { name: 'Custom', precio: 450, image: base3, hasColors: true },
];

const pcbOptions = [
  { name: 'Soldada', precio: 480, image: pcb1 },
  { name: 'HotSwap', precio: 550, image: pcb2 },
  { name: 'Wireless', precio: 650, image: pcb3 },
];

const keycapOptions = [
  { name: 'ABS', precio: 280, image: keycaps1, hasColors: true },
  { name: 'PBT', precio: 450, image: keycaps2, hasColors: true },
  { name: 'Resina', precio: 980, image: keycaps3, hasColors: true },
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
  products,
  favorites,
  removeFromCart,
  updateCartQuantity,
  onOpenPersonaliza,
  onCheckout,
}) {
  const navigate = useNavigate();
  // abrir cerrar carrito
  const [cartOpen, setCartOpen] = useState(false);
  const cartMenuRef = useRef(null);
  const cartButtonRef = useRef(null);

  // cerrar carrito al click afuera
  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    const handleClickOutside = (event) => {
      if (
        cartMenuRef.current?.contains(event.target) ||
        cartButtonRef.current?.contains(event.target)
      ) {
        return;
      }

      setCartOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartOpen]);

  // ir a seccion
  const goToSection = (sectionId) => {
    setMenuOpen(false);
    setCartOpen(false);

    if (sectionId === 'personaliza' && onOpenPersonaliza) {
      onOpenPersonaliza();
    }

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
      if (item.isCustom) {
        subtotal += item.precio * item.quantity;
        return;
      }

      const product = products.find((product) => product.id === item.id);
      if (!product) {
        return;
      }

        const precio = Number(product.precio);
        const descuento = Number(product.descuento || 0);

        const discount = (precio * descuento) / 100;
        subtotal += precio * item.quantity;
        totalDiscount += discount * item.quantity;
    });

    return {
      subtotal,
      totalDiscount,
      total: subtotal - totalDiscount,
    };
  };

  const cartTotals = calculateCart();

  // volver al inicio
  const goHome = () => {
    setMenuOpen(false);
    setCartOpen(false);
    navigate('/');
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <header className="header-glass">
      <button type="button" className="logo" onClick={goHome}>
        Peri-Soft
      </button>

      <button
        type="button"
        className="header-cart-button"
        ref={cartButtonRef}
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

      <button
        type="button"
        className="header-profile-button"
        onClick={() => {
          setCartOpen(false);
          goToAccount(navigate);
        }}
        title="Perfil"
      >
        <img src={perfil} alt="Perfil" />
      </button>

      {cartOpen && (
        <div className="cart-menu" ref={cartMenuRef}>
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
                  if (item.isCustom) {
                    const itemTotal = item.precio * item.quantity;

                    return (
                      <div className="cart-menu-item" key={item.id}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="cart-menu-item-image"
                        />

                        <div className="cart-menu-item-info">
                          <h3>{item.title}</h3>
                          <p className="cart-item-color">{item.parts}</p>

                          <div className="cart-prices">
                            <span className="cart-final-price">
                              ${Number(item.precio).toFixed(2)}
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
                  }

                  const product = products.find(
                    (product) => product.id === item.id
                  );

                  if (!product) {
                    return null;
                  }

                  const discount = (Number(product.precio) * product.descuento) / 100;
                  const finalPrice = Number(product.precio) - discount;
                  const itemTotal = finalPrice * item.quantity;

                  return (
                    <div className="cart-menu-item" key={item.id}>
                      <img
                        src={productImages[product.imagen]}
                        alt={product.nombre}
                        className="cart-menu-item-image"
                      />

                      <div className="cart-menu-item-info">
                        <h3>{product.nombre}</h3>
                        <p className="cart-item-color">{product.color}</p>

                        {product.descuento > 0 && (
                          <span className="cart-discount">
                            -{product.descuento}%
                          </span>
                        )}

                        {/**Andrea - Aplicando descuento  */}

                        <div className="cart-prices">
                          {product.descuento > 0 && (
                            <span className="cart-original-price">
                              ${Number(product.precio).toFixed(2)}
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

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={onCheckout}
                >
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
              onClick={() => goToSection('personaliza')}
            >
              Personaliza
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
          <li>
            <button
              type="button"
              className="menu-link"
              onClick={() => {
                setMenuOpen(false);
                setCartOpen(false);
                goToAccount(navigate);
              }}
            >
              Mi perfil
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// pagina catalogo
function Catalog({ products }) {
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
  // personalizar teclado
  const [selectedSwitch, setSelectedSwitch] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedBaseColor, setSelectedBaseColor] = useState(null);
  const [selectedPcb, setSelectedPcb] = useState(null);
  const [selectedKeycaps, setSelectedKeycaps] = useState(null);
  const [selectedKeycapColor, setSelectedKeycapColor] = useState(null);
  const [customOpen, setCustomOpen] = useState(false);

  // mover carrusel
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAd((currentAd) => (currentAd + 1) % advertisements.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const cargarFavoritos = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!usuario?.id) {
          setFavorites([]);
          return;
        }

        const response = await fetch(`/api/favoritos/${usuario.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudieron cargar los favoritos');
        }

        setFavorites(data);
      } catch (error) {
        console.error('ERROR AL CARGAR FAVORITOS:', error);
        setFavorites([]);
      }
    };

    cargarFavoritos();
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
        switchFilter === 'Todos' || product.tipoSwitch === switchFilter
    )
    .filter((product) => !offersOnly || product.descuento > 0)
    .sort((a, b) => {
      if (priceOrder === 'high-to-low') {
        return Number(b.precio) - Number(a.precio);
      }

      if (priceOrder === 'low-to-high') {
        return Number(a.precio) - Number(b.precio);
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
    const existingItem = currentCart.find(
      (item) => item.id === productId
    );

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
  const handleToggleFavorite = async (productId) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario?.id) {
      navigate('/login');
      return;
    }

    const wasFavorite = favorites.includes(productId);
    setFavorites((currentFavorites) => wasFavorite
      ? currentFavorites.filter((id) => id !== productId)
      : [...currentFavorites, productId]);

    try {
      const response = wasFavorite
        ? await fetch(`/api/favoritos/${usuario.id}/${productId}`, { method: 'DELETE' })
        : await fetch('/api/favoritos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: usuario.id, productoId: productId }),
          });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'No se pudo actualizar el favorito');
      }
    } catch (error) {
      console.error('ERROR AL ACTUALIZAR FAVORITO:', error);
      setFavorites((currentFavorites) => wasFavorite
        ? [...currentFavorites, productId]
        : currentFavorites.filter((id) => id !== productId));
    }
  };

  // quitar favorito
  const removeFromFavorites = (productId) => {
    handleToggleFavorite(productId);
  };

  const getOptionPrice = (options, selectedName) => {
    const option = options.find((item) => item.name === selectedName);
    return option ? Number(option.precio) : 0;
  };

  const customParts = [];

  if (selectedSwitch) {
    customParts.push({
      label: 'Switch',
      name: selectedSwitch,
      precio: getOptionPrice(switchOptions, selectedSwitch),
    });
  }

  if (selectedBase) {
    const baseName =
      selectedBase === 'Custom' && selectedBaseColor
        ? `Custom (${selectedBaseColor})`
        : selectedBase;

    customParts.push({
      label: 'Base',
      name: baseName,
      precio: getOptionPrice(baseColorOptions, selectedBase),
    });
  }

  if (selectedPcb) {
    customParts.push({
      label: 'PCB',
      name: selectedPcb,
      precio: getOptionPrice(pcbOptions, selectedPcb),
    });
  }

  if (selectedKeycaps) {
    const keycapName = selectedKeycapColor
      ? `${selectedKeycaps} (${selectedKeycapColor})`
      : selectedKeycaps;

    customParts.push({
      label: 'Keycaps',
      name: keycapName,
      precio: getOptionPrice(keycapOptions, selectedKeycaps),
    });
  }

  const customTotal = customParts.reduce((sum, part) => sum + Number(part.precio), 0);
  const customReady =
    selectedSwitch &&
    selectedBase &&
    (selectedBase !== 'Custom' || selectedBaseColor) &&
    selectedPcb &&
    selectedKeycaps &&
    selectedKeycapColor;

  // agregar personalizado al carrito
  const handleAddCustomToCart = () => {
    if (!customReady) {
      return;
    }

    const partsText = customParts
      .map((part) => `${part.label}: ${part.name}`)
      .join(' | ');

    setCart((currentCart) => [
      ...currentCart,
      {
        id: `custom-${Date.now()}`,
        quantity: 1,
        isCustom: true,
        title: 'Teclado personalizado',
        precio: customTotal,
        parts: partsText,
        image: arco,
      },
    ]);
  };

  return (
    <main className="catalog-page">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cart={cart}
        products={products}
        favorites={favorites}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
        onOpenPersonaliza={() => setCustomOpen(true)}
        onCheckout={() => {
          if (cart.length > 0) {
            navigate('/compra-carrito', { state: { cart } });
          }
        }}
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
        {filteredProducts.map((product) => {
          const precio = Number(product.precio);
          const descuento = Number(product.descuento || 0);

          const discount = (precio * descuento) / 100;
          const finalPrice = precio - discount;
        

    return(
          <article
            className="product-card"
            key={product.id}
            onClick={() => navigate(`/producto/${product.id}`)}
          >
            <div className="product-image-wrap">
              <img
                src={productImages[product.imagen]}
                alt={product.nombre}
                className="product-image"
              />

              {product.descuento > 0 && (
                <span className="discount-badge">-{Number(product.descuento)}%</span>
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

                <h2>{product.nombre}</h2>

                {Number(product.descuento) > 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '2px',
                    }}
                  >
                    <span
                      style={{
                        textDecoration: 'line-through',
                        opacity: 1,
                        fontSize: '0.95em',
                        color: '#ff2c2c',
                      }}
                    >
                      ${Number(product.precio).toFixed(2)}
                    </span>

                    <h2 style={{ margin: 0, fontSize: '1.8em' }}>
                      ${finalPrice.toFixed(2)}
                    </h2>
                  </div>
                ) : (
                  <h2 style={{ margin: 0, fontSize: '1.8em' }}>
                    ${Number(product.precio).toFixed(2)}
                  </h2>
                )}
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
        );
})}

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
                      src={productImages[product.imagen]}
                      alt={product.nombre}
                      className="product-image"
                    />
                  
                  <div className="favorite-item-info">
                    <h4>{product.nombre}</h4>
                    <p>{product.color}</p>
                    <p className="item-price">${Number(product.precio).toFixed(2)}</p>
                  </div>
                  <button
                    type="button"
                    className="product-button product-button-secondary add-cart-button"
                    onClick={() => handleAddToCart(favId)}
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

      <section
        id="personaliza"
        className={`favorites-section ${customOpen ? '' : 'is-empty'}`}
      >
        <div className={`custom-panel ${customOpen ? 'is-open' : ''}`}>
        <button
          type="button"
          className={`custom-toggle ${customOpen ? 'is-open' : ''}`}
          onClick={() => setCustomOpen((current) => !current)}
        >
          <h2>Personaliza tu teclado</h2>
          <span className="custom-toggle-arrow" aria-hidden="true"></span>
        </button>

        {customOpen && (
        <div className="custom-layout">
          <div className="custom-options">
            <h3>Switches</h3>
            <div className="custom-option-grid">
              {switchOptions.map((option) => (
                <button
                  type="button"
                  key={option.name}
                  className={`custom-option-card ${
                    selectedSwitch === option.name ? 'is-selected' : ''
                  }`}
                  onClick={() => setSelectedSwitch(option.name)}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    className="custom-option-image"
                  />
                  <h4>{option.name}</h4>
                  <p className="item-price">${Number(option.precio).toFixed(2)}</p>
                </button>
              ))}
            </div>

            <h3>Base</h3>
            <div className="custom-option-grid">
              {baseColorOptions.map((option) => (
                <button
                  type="button"
                  key={option.name}
                  className={`custom-option-card ${
                    selectedBase === option.name ? 'is-selected' : ''
                  }`}
                  onClick={() => {
                    setSelectedBase(option.name);
                    if (option.name !== 'Custom') {
                      setSelectedBaseColor(null);
                    }
                  }}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    className="custom-option-image"
                  />
                  <h4>{option.name}</h4>
                  <p className="item-price">${Number(option.precio).toFixed(2)}</p>
                </button>
              ))}
            </div>

            {selectedBase === 'Custom' && (
              <div className="color-picker">
                {basicColors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    className={`color-swatch ${
                      selectedBaseColor === color ? 'is-selected' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedBaseColor(color)}
                  />
                ))}
              </div>
            )}

            <h3>PCB</h3>
            <div className="custom-option-grid">
              {pcbOptions.map((option) => (
                <button
                  type="button"
                  key={option.name}
                  className={`custom-option-card ${
                    selectedPcb === option.name ? 'is-selected' : ''
                  }`}
                  onClick={() => setSelectedPcb(option.name)}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    className="custom-option-image"
                  />
                  <h4>{option.name}</h4>
                  <p className="item-price">${Number(option.precio).toFixed(2)}</p>
                </button>
              ))}
            </div>

            <h3>Keycaps</h3>
            <div className="custom-option-grid">
              {keycapOptions.map((option) => (
                <button
                  type="button"
                  key={option.name}
                  className={`custom-option-card ${
                    selectedKeycaps === option.name ? 'is-selected' : ''
                  }`}
                  onClick={() => setSelectedKeycaps(option.name)}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    className="custom-option-image"
                  />
                  <h4>{option.name}</h4>
                  <p className="item-price">${Number(option.precio).toFixed(2)}</p>
                </button>
              ))}
            </div>

            {selectedKeycaps && (
              <div className="color-picker">
                {basicColors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    className={`color-swatch ${
                      selectedKeycapColor === color ? 'is-selected' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedKeycapColor(color)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="custom-summary">
            <h3>Tu seleccion</h3>

            {customParts.length === 0 ? (
              <p className="empty-message">Elige una opcion de cada categoria.</p>
            ) : (
              <div className="custom-parts-list">
                {customParts.map((part) => (
                  <div key={part.label} className="custom-part-item">
                    <span>{part.label}:</span>
                    <span>
                      {part.name} - ${Number(part.precio).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="item-price">Cotizacion: ${customTotal.toFixed(2)}</p>

            <button
              type="button"
              className="product-button"
              onClick={handleAddCustomToCart}
              disabled={!customReady}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
        )}
        </div>
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
function ProductPage({ products }) {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  // guardado carrito
  const [cart, setCart] = useState([]);
  // guardado favoritos
  const [favorites] = useState([]);

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
        products={products}
        favorites={favorites}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
      />
      <Resultados
        product={toProductView(product)}
        onBack={() => navigate('/')}
        onBuy={() => navigate(`/compra/${product.id}`)}
      />
    </>
  );
}

// pagina compra
function CompraPage({ products }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <Compra
      product={toProductView(product)}
      purchaseKey={location.key}
      onBack={() => navigate('/')}
    />
  );
}

// rutas app
export default function App() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState('');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoadingProducts(true);
        setErrorProducts('');

        const response = await fetch('/api/productos');

        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos');
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error('ERROR AL CARGAR PRODUCTOS:', error);
        setErrorProducts(error.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    cargarProductos();
  }, []);

  if (loadingProducts) {  
    return <p>Cargando productos...</p>;
  }

  if (errorProducts) {
    return <p>Error: {errorProducts}</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Catalog products={products} />}
      />

      <Route
        path="/producto/:productId"
        element={<ProductPage products={products} />}
      />

      <Route
        path="/compra/:productId"
        element={<CompraPage products={products} />}
      />

      <Route
        path="/compra-carrito"
        element={<CompraCarrito />}
      />

      <Route
        path="/perfil"
        element={<MiPerfil />}
      />

      <Route
        path="/login"
        element={<Auth />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
