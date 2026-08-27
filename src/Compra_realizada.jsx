import { useEffect, useRef, useState } from 'react';
import './App.css';

export default function CompraRealizada({ product, purchaseKey, onBack }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const requestKey = useRef('');

  useEffect(() => {
    if (!product || !purchaseKey) {
      return;
    }

    const purchaseStorageKey = `order-${purchaseKey}`;
    const savedPurchase = localStorage.getItem(purchaseStorageKey);

    if (savedPurchase) {
      const savedOrder = JSON.parse(savedPurchase);
      if (Number.isInteger(savedOrder.id) && Array.isArray(savedOrder.products)) {
        setOrder(savedOrder);
        return;
      }
    }

    if (requestKey.current === purchaseKey) {
      return;
    }

    requestKey.current = purchaseKey;

    const crearPedido = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!usuario?.id) {
          throw new Error('Debes iniciar sesión para realizar un pedido');
        }

        const response = await fetch('/api/pedidos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuarioId: usuario.id,
            metodoPago: 'Tarjeta de crédito',
            items: [{ productoId: product.id, cantidad: 1 }],
          }),
        });
        const contentType = response.headers.get('content-type') || '';
        const data = contentType.includes('application/json')
          ? await response.json()
          : { error: `El servidor respondió con un formato inesperado (${response.status})` };

        if (!response.ok) {
          throw new Error(data.error || 'No se pudo registrar el pedido');
        }

        localStorage.setItem(purchaseStorageKey, JSON.stringify(data));
        setOrder(data);
      } catch (requestError) {
        setError(requestError.message);
      }
    };

    crearPedido();

  }, [product, purchaseKey]);

  if (error) {
    return <p className="auth-msg error">{error}</p>;
  }

  if (!product || !order) {
    return null;
  }

  return (
    <main className="result-page">

      <div className="result-shell">

        {/* BOTÓN VOLVER */}
        <button
          className="back-button"
          onClick={onBack}
          type="button"
        >
          Volver al inicio
        </button>

        <section className="result-layout">

          {/* IMAGEN DEL PRODUCTO */}
          <div className="result-visual">

            <div className="image-frame">

              <img
                src={product.image}
                alt={product.title}
                className="result-image"
              />

            </div>

          </div>

          {/* INFORMACIÓN DE LA COMPRA */}
          <div className="result-details">

            <h1>Compra realizada</h1>

            <p className="result-description">
              Gracias por tu compra de{' '}
              <strong>{product.title}</strong>.
            </p>

            {/* INFORMACIÓN DEL PEDIDO */}
            <div className="purchase-info">

              <h2>Información del pedido</h2>

              <p>
                <strong>Número de pedido:</strong>{' '}
                {order.id}
              </p>

              <p>
                <strong>Fecha:</strong>{' '}
                {new Date(order.date).toLocaleDateString('es-MX')}
              </p>

              <p>
                <strong>Hora:</strong>{' '}
                {new Date(order.time).toLocaleTimeString('es-MX')}
              </p>

              <p>
                <strong>Producto:</strong>{' '}
                {order.products.map((item) => `${item.quantity} x ${item.name}`).join(', ')}
              </p>

              <p>
                <strong>Color:</strong>{' '}
                {product.color}
              </p>

              <p>
                <strong>Switch:</strong>{' '}
                {product.tipo_switch}
              </p>

              <p>
                <strong>Método de pago:</strong>{' '}
                {order.payment}
              </p>

              <p>
                <strong>Estado:</strong>{' '}
                <span className="order-status">
                  {order.status}
                </span>
              </p>

              <p className="purchase-total">
                <strong>Total pagado:</strong>{' '}
                ${Number(order.total).toFixed(2)}
              </p>

            </div>

            {/* BOTÓN SEGUIR COMPRANDO */}
            <div className="action-row">

              <button
                className="primary-action"
                onClick={onBack}
                type="button"
              >
                Seguir comprando
              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}