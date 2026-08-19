import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import cor from './assets/cor.jpg';
import RAZER from './assets/RAZER.jpg';
import REDRAGON from './assets/REDRAGON.jpg';
import LOGITECH from './assets/LOGITECH.jpg';
import EPOMAKER from './assets/LOGITECH.jpg';
import Resultados from './Resultados';

import log from './assets/log.jpg';

import ter from './assets/ter.jpg';
import arco from './assets/arco.jpg';


const products = [
  {
    title: 'Reddragon',
    color: 'Rojo',
    price: 899.00,
    description: 'Teclado mecánico económico con excelente iluminación, perfecto para empezar en gaming.',
    image: REDRAGON,
    id: 1,
  },
  {
    title: 'Corsair',
    color: 'Negro/Gris',
    price: 2499.00,
    description: 'Teclado premium para jugadores exigentes con acabados y desempeño superiores.',
    image: cor,
    id: 2,
  },
  {
    title: 'Razer',
    color: 'Verde/Negro',
    price: 1899.00,
    description: 'Con switches ultrarrápidos y tecnología RGB para una experiencia competitiva.',
    image: RAZER,
    id: 3,
  },
  {
    title: 'Logitech',
    color: 'Blanco/Negro',
    price: 1599.00,
    description: 'Diseño elegante y funcional, ideal para trabajo diario con buen rendimiento.',
    image: LOGITECH,
    id: 4,
  },
  {
    title: 'Epomaker',
    color: 'Verde/Negro',
    price: 1600.00,
    description: 'Wireless gaming keyboard with RGB lighting.',
    image: EPOMAKER,
    id: 5,
  },
  {
    title: 'Razer',
    color: 'Blanco/Negro',
    price: 1400.00,
    description: 'Teclado arcoiris negro.',
    image: arco,
    id: 6,
  },
  {
    title: 'Terport',
    color: 'Negro',
    price: 1799.00,
    description: '4 efectos de iluminacion.',
    image: ter,
    id: 7,
  },
  {
    title: 'Logitech',
    color: 'Rosa',
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
    title: 'Potencia tu partida',
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

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div>
          <p className="hero-kicker">Encuentra tu setup ideal</p>
          <h1>Teclados gaming para cada estilo</h1>
        </div>

      </section>

      <section className="advertisement-carousel" aria-label="Publicidad destacada">
        <div className="carousel-slide">
          <img
            src={advertisements[activeAd].image}
            alt={advertisements[activeAd].alt}
            className="carousel-image"
          />
          <div className="carousel-content">
            <span className="carousel-label">Publicidad</span>
            <h2>{advertisements[activeAd].title}</h2>
            <p>{advertisements[activeAd].text}</p>
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

        <div className="carousel-dots" aria-label="Seleccionar publicidad">
          {advertisements.map((advertisement, index) => (
            <button
              type="button"
              className={`carousel-dot ${index === activeAd ? 'is-active' : ''}`}
              onClick={() => showAd(index)}
              aria-label={`Mostrar publicidad ${index + 1}`}
              aria-current={index === activeAd ? 'true' : undefined}
              key={advertisement.title}
            />
          ))}
        </div>
      </section>

      <section className="catalog-grid" aria-label="Lista de teclados">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img src={product.image} alt={product.title} className="product-image" />
            </div>

            <div className="product-info">
              <span className="product-tag">{product.color}</span>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
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
      </section>
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

