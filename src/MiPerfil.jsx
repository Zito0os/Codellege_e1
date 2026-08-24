import { useNavigate } from 'react-router-dom';
import './App.css';

const orders = [
  {
    id: 'PS-1001',
    date: '20 de agosto de 2026',
    status: 'Entregado',
    total: '$899.00',
  },
  {
    id: 'PS-1002',
    date: '22 de agosto de 2026',
    status: 'En preparación',
    total: '$1,899.00',
  },
];

export default function MiPerfil() {
  const navigate = useNavigate();

  return (
    <main className="profile-page">
      <header className="header-glass">
        <button
          type="button"
          className="logo"
          onClick={() => navigate('/')}
        >
          Peri-Soft
        </button>

        <button
          type="button"
          className="profile-back-button"
          onClick={() => navigate('/')}
        >
          Volver al catálogo
        </button>
      </header>

      <section className="profile-container">
        <div className="profile-card">
          <h1>Mi perfil</h1>

          <div className="profile-user-info">
            <h2>Nombre de usuario</h2>
            <p>Admon</p>
          </div>
        </div>

        <div className="orders-card">
          <h2>Mis pedidos</h2>

          {orders.length === 0 ? (
            <p>Aún no tienes pedidos.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <article className="order-item" key={order.id}>
                  <div>
                    <h3>Pedido #{order.id}</h3>
                    <p>Fecha: {order.date}</p>
                  </div>

                  <div>
                    <p className="order-status">{order.status}</p>
                    <strong>{order.total}</strong>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}