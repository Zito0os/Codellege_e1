export default function Resultados({ product, onBack }) {
  if (!product) {
    return null;
  }

  const features = [
    'Iluminación RGB premium',
    'Diseño ergonómico',
    'Compatibilidad multi-device',
  ];

  return (
    <main className="result-page">
      <div className="result-shell">
        <button className="back-button" onClick={onBack} type="button">
          ← Volver a productos
        </button>

        <section className="result-layout">
          <div className="result-visual">
            <div className="image-frame">
              <img src={product.image} alt={product.title} className="result-image" />
            </div>
          </div>

          <div className="result-details">
            <span className="eyebrow">Teclado recomendado</span>
            <h1>{product.title}</h1>
            <h1>${product.price}</h1>

            <div className="meta-row">
              <span className="meta-pill">Color: {product.color}</span>
              <span className="meta-pill">Calificación: 4.9/5</span>
            </div>

            <p className="result-description">{product.description}</p>

            <ul className="feature-list">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="action-row">
              <button className="primary-action" type="button">
                Comprar ahora
              </button>
              <button className="secondary-action" onClick={onBack} type="button">
                Explorar más
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
