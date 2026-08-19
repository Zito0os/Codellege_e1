import { useState } from 'react';
import cor from './assets/cor.jpg';
import RAZER from './assets/RAZER.jpg';
import REDRAGON from './assets/REDRAGON.jpg';
import LOGITECH from './assets/LOGITECH.jpg';
import log from './assets/log.jpg';
import EPOMAKER from './assets/EPOMAKER.jpg';
import ter from './assets/ter.jpg';
import arco from './assets/arco.jpg';




import Resultados from './Resultados';



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

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (selectedProduct) {
    return <Resultados product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div>
          <p className="hero-kicker">Encuentra tu setup ideal</p>
          <h1>Teclados gaming para cada estilo</h1>
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
              onClick={() => setSelectedProduct(product)}
            >
              Ver producto
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

