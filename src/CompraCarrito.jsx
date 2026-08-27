import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import './App.css';

export default function CompraCarrito() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const requestKey = useRef('');
  const cart = location.state?.cart;

  useEffect(() => {
    if (!cart?.length || !location.key) {
      return;
    }

    const purchaseStorageKey = `cart-order-${location.key}`;
    const savedPurchase = localStorage.getItem(purchaseStorageKey);

    if (savedPurchase) {
      const savedOrder = JSON.parse(savedPurchase);
      if (Number.isInteger(savedOrder.id) && Array.isArray(savedOrder.products)) {
        setOrder(savedOrder);
        return;
      }
    }

    if (requestKey.current === location.key) {
      return;
    }

    requestKey.current = location.key;

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
            items: cart.map((item) => item.isCustom
              ? {
                  isCustom: true,
                  nombre: item.title,
                  precio: item.precio,
                  parts: item.parts,
                  imagen: 'arco.jpg',
                  cantidad: item.quantity,
                }
              : { productoId: item.id, cantidad: item.quantity }),
          }),
        });
        const contentType = response.headers.get('content-type') || '';
        const data = contentType.includes('application/json')
          ? await response.json()
          : { error: `El servidor respondió con un formato inesperado (${response.status})` };

        if (!response.ok) {
          throw new Error(data.error || 'No se pudo registrar el pedido');
        }

        const savedOrder = { ...data, image: cart[0].image || null };
        localStorage.setItem(purchaseStorageKey, JSON.stringify(savedOrder));
        setOrder(savedOrder);
      } catch (requestError) {
        setError(requestError.message);
      }
    };

    crearPedido();
  }, [cart, location.key]);

  if (error) {
    return <p className="auth-msg error">{error}</p>;
  }

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
              <p><strong>Fecha:</strong> {new Date(order.date).toLocaleDateString('es-MX')}</p>
              <p><strong>Hora:</strong> {new Date(order.time).toLocaleTimeString('es-MX')}</p>
              <p><strong>Productos:</strong> {order.products.map((item) => `${item.quantity} x ${item.name}`).join(', ')}</p>
              <p><strong>Método de pago:</strong> {order.payment}</p>
              <p><strong>Estado:</strong> <span className="order-status">{order.status}</span></p>
              <p className="purchase-total"><strong>Total pagado:</strong> ${Number(order.total).toFixed(2)}</p>
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