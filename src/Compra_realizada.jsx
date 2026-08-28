export default function Compra({ product, onBack }) {
  if (!product) {
    return null;
  }

  // pantalla compra ok
  return (
    <main className="result-page">
      <div className="result-shell">
        <button className="back-button" onClick={onBack} type="button">
          Volver al inicio
        </button>

        <section className="result-layout">
          <div className="result-visual">
            <div className="image-frame">
              <img src={product.image} alt={product.title} className="result-image" />
            </div>
          </div>

          <div className="result-details">
            <h1>Compra realizada</h1>
            <p className="result-description">
              Gracias por tu compra de {product.title}.
            </p>
            <p className="result-description">
              Total pagado: ${product.price.toFixed(2)}
            </p>

            <div className="meta-row">
              <span className="meta-pill">Color: {product.color}</span>
              <span className="meta-pill">Switch: {product.tipo_switch}</span>
            </div>

            <div className="action-row">
              <button className="primary-action" onClick={onBack} type="button">
                Seguir comprando
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
