import { useState } from 'react';
import cor from './assets/cor.jpg';
import RAZER from './assets/RAZER.jpg';
import REDRAGON from './assets/REDRAGON.jpg';
import LOGITECH from './assets/LOGITECH.jpg';
import Resultados from './Resultados';

const products = [
  {
    title: 'Reddragon',
    color: 'Rojo',
    description: 'Teclado mecánico económico con excelente iluminación, perfecto para empezar en gaming.',
    image: REDRAGON,
    id: 1,
  },
  {
    title: 'Corsair',
    color: 'Negro/Gris',
    description: 'Teclado premium para jugadores exigentes con acabados y desempeño superiores.',
    image: cor,
    id: 2,
  },
  {
    title: 'Razer',
    color: 'Verde/Negro',
    description: 'Con switches ultrarrápidos y tecnología RGB para una experiencia competitiva.',
    image: RAZER,
    id: 3,
  },
  {
    title: 'Logitech',
    color: 'Blanco/Negro',
    description: 'Diseño elegante y funcional, ideal para trabajo diario con buen rendimiento.',
    image: LOGITECH,
    id: 4,
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

