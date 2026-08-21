export default function Resultados({ product, onBack, onBuy }) {
  if (!product) {
    return null;
  }

  // lista features
  const features = [
    'Iluminacion RGB',
    'Diseño comodo',
    'Compatible con Windows',
  ];

  return (
    <main className="result-page">
      <div className="result-shell">
        <button className="back-button" onClick={onBack} type="button">
          Volver
        </button>

        <section className="result-layout">
          <div className="result-visual">
            <div className="image-frame">
              <img src={product.image} alt={product.title} className="result-image" />
            </div>
          </div>

          <div className="result-details">
            <span className="product-label">Detalle del teclado</span>
            <h1>{product.title}</h1>
            <h1>${product.price.toFixed(2)}</h1>

            <div className="meta-row">
              <span className="meta-pill">Color: {product.color}</span>
              <span className="meta-pill">Switch: {product.tipo_switch}</span>
            </div>

            <p className="result-description">{product.description}</p>

            <ul className="feature-list">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="action-row">
              <button className="primary-action" type="button" onClick={onBuy}>
                Comprar ahora
              </button>
              <button className="secondary-action" onClick={onBack} type="button">
                Explorar mas
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
