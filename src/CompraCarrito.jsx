import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import './App.css';

const products = [
  { id: 1, title: 'Reddragon', price: 899, descuento: 10 },
  { id: 2, title: 'Corsair', price: 2499, descuento: 0 },
  { id: 3, title: 'Razer', price: 1899, descuento: 15 },
  { id: 4, title: 'Logitech', price: 1599, descuento: 0 },
  { id: 5, title: 'Epomaker', price: 1600, descuento: 0 },
  { id: 6, title: 'Razer', price: 1400, descuento: 0 },
  { id: 7, title: 'Terport', price: 1799, descuento: 0 },
  { id: 8, title: 'Logitech', price: 1399, descuento: 50 },
];

function getItemPrice(item) {
  if (item.isCustom) {
    return item.price;
  }

  const product = products.find((productItem) => productItem.id === item.id);
  if (!product) {
    return 0;
  }

  return product.price - (product.price * product.descuento) / 100;
}

export default function CompraCarrito() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const cart = location.state?.cart;

  useEffect(() => {
    if (!cart?.length || !location.key) {
      return;
    }

    const purchaseStorageKey = `cart-order-${location.key}`;
    const savedPurchase = localStorage.getItem(purchaseStorageKey);

    if (savedPurchase) {
      setOrder(JSON.parse(savedPurchase));
      return;
    }

    const purchaseDate = new Date();
    const orderItems = cart.map((item) => {
      if (item.isCustom) {
        return `${item.quantity} x ${item.title}`;
      }

      const product = products.find((productItem) => productItem.id === item.id);
      return product ? `${item.quantity} x ${product.title}` : null;
    }).filter(Boolean);

    const newOrder = {
      id: `PS-${Date.now().toString().slice(-6)}`,
      date: purchaseDate.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      time: purchaseDate.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'En preparación',
      total: `$${cart.reduce(
        (total, item) => total + getItemPrice(item) * item.quantity,
        0
      ).toFixed(2)}`,
      payment: 'Tarjeta de crédito',
      products: orderItems.join(', '),
      color: 'Varios',
      tipo_switch: 'Varios',
      image: cart[0].image || null,
    };

    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...savedOrders, newOrder]));
    localStorage.setItem(purchaseStorageKey, JSON.stringify(newOrder));
    setOrder(newOrder);
  }, [cart, location.key]);

  if (!cart?.length) {
    return <Navigate to="/" replace />;
  }

  if (!order) {
    return null;
  }

  return (
    <main className="result-page">
      <div className="result-shell">
        <button
          className="back-button"
          onClick={() => navigate('/')}
          type="button"
        >
          Volver al inicio
        </button>

        <section className="result-layout">
          <div className="result-visual">
            <div className="image-frame">
              {order.image && (
                <img src={order.image} alt="Productos comprados" className="result-image" />
              )}
            </div>
          </div>

          <div className="result-details">
            <h1>Tu compra ha sido realizada</h1>
            <p className="result-description">
              Gracias por tu compra. Hemos recibido tu pedido correctamente.
            </p>

            <div className="purchase-info">
              <h2>Información de la compra</h2>
              <p><strong>Número de pedido:</strong> {order.id}</p>
              <p><strong>Fecha:</strong> {order.date}</p>
              <p><strong>Hora:</strong> {order.time}</p>
              <p><strong>Productos:</strong> {order.products}</p>
              <p><strong>Método de pago:</strong> {order.payment}</p>
              <p><strong>Estado:</strong> <span className="order-status">{order.status}</span></p>
              <p className="purchase-total"><strong>Total pagado:</strong> {order.total}</p>
            </div>

            <div className="action-row">
              <button className="primary-action" onClick={() => navigate('/')} type="button">
                Seguir comprando
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}