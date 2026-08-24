import { useEffect, useState } from 'react';
import './App.css';

export default function CompraRealizada({ product, purchaseKey, onBack }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!product || !purchaseKey) {
      return;
    }

    const purchaseStorageKey = `order-${purchaseKey}`;
    const savedPurchase = localStorage.getItem(purchaseStorageKey);

    if (savedPurchase) {
      setOrder(JSON.parse(savedPurchase));
      return;
    }

    // Obtener la fecha y hora actual
    const purchaseDate = new Date();

    const date = purchaseDate.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const time = purchaseDate.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Generar número de pedido
    const orderId = `PS-${Date.now().toString().slice(-6)}`;

    // Crear información del pedido
    const newOrder = {
      id: orderId,
      date: date,
      time: time,
      status: 'En preparación',
      total: `$${product.price.toFixed(2)}`,
      payment: 'Tarjeta de crédito',
      products: product.title,

      // Información adicional del producto
      image: product.image,
      color: product.color,
      tipo_switch: product.tipo_switch,
    };

    // Guardar el pedido en localStorage
    const savedOrders = JSON.parse(
      localStorage.getItem('orders')
    ) || [];

    savedOrders.push(newOrder);

    localStorage.setItem(
      'orders',
      JSON.stringify(savedOrders)
    );
    localStorage.setItem(purchaseStorageKey, JSON.stringify(newOrder));

    // Mostrar el pedido en pantalla
    setOrder(newOrder);

  }, [product]);

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
                {order.date}
              </p>

              <p>
                <strong>Hora:</strong>{' '}
                {order.time}
              </p>

              <p>
                <strong>Producto:</strong>{' '}
                {order.products}
              </p>

              <p>
                <strong>Color:</strong>{' '}
                {order.color}
              </p>

              <p>
                <strong>Switch:</strong>{' '}
                {order.tipo_switch}
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
                {order.total}
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