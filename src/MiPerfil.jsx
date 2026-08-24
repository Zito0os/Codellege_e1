import { useNavigate } from 'react-router-dom';
import './App.css';
import './Perfil.css';
import perfil from './assets/perfil.jpg';

const orders = [
  {
    id: 'PS-1001',
    date: '20 de agosto de 2026',
    time: '14:35',
    status: 'Entregado',
    total: '$899.00',
    payment: 'Tarjeta de crédito',
    products: 'Teclado mecánico Redragon',
  },
  {
    id: 'PS-1002',
    date: '22 de agosto de 2026',
    time: '18:20',
    status: 'En preparación',
    total: '$1,899.00',
    payment: 'Tarjeta de débito',
    products: 'Teclado Razer + Mouse Logitech',
  },
];


export default function MiPerfil() {
  const navigate = useNavigate();

  return (
    <main className="profile-page">

      <header className="header-glass">
        <div className="logo">Peri-Soft</div>

        <button
          type="button"
          className="profile-back-button"
          onClick={() => navigate('/')}
        >
          Volver
        </button>
      </header>

      <section className="profile-container">

        {/* PERFIL */}
        <div className="profile-card">

          <div className="profile-image-container">
            <img
              src={perfil}
              alt="Imagen de perfil"
              className="profile-image"
            />
          </div>

          <h1>Mi perfil</h1>

          <div className="profile-user-info">
            <h2>Zito_os</h2>
            
          </div>

        </div>
        {/* PEDIDOS Y COMPRAS */}
        <div className="orders-sections">

          {/* MIS PEDIDOS */}
          <div className="orders-card">

            <h2>Mis pedidos</h2>

            <div className="orders-list">

              {orders
                .filter((order) => order.status !== 'Entregado')
                .map((order) => (

                  <article
                    className="order-item"
                    key={order.id}
                  >

                    <div className="order-main-info">

                      <h3>
                        Pedido #{order.id}
                      </h3>

                      <p>
                        <strong>Fecha:</strong> {order.date}
                      </p>

                      <p>
                        <strong>Hora:</strong> {order.time}
                      </p>

                      <p>
                        <strong>Productos:</strong> {order.products}
                      </p>

                      <p>
                        <strong>Método de pago:</strong>{' '}
                        {order.payment}
                      </p>

                    </div>

                    <div className="order-secondary-info">

                      <p className="order-status">
                        {order.status}
                      </p>

                      <strong className="order-total">
                        {order.total}
                      </strong>

                    </div>

                  </article>

                ))}

            </div>

          </div>


          {/* MIS COMPRAS */}
          <div className="orders-card">

            <h2>Mis compras</h2>

            <div className="orders-list">

              {orders
                .filter((order) => order.status === 'Entregado')
                .map((order) => (

                  <article
                    className="order-item"
                    key={order.id}
                  >

                    <div className="order-main-info">

                      <h3>
                        Compra #{order.id}
                      </h3>

                      <p>
                        <strong>Fecha:</strong> {order.date}
                      </p>

                      <p>
                        <strong>Hora:</strong> {order.time}
                      </p>

                      <p>
                        <strong>Productos:</strong> {order.products}
                      </p>

                      <p>
                        <strong>Método de pago:</strong>{' '}
                        {order.payment}
                      </p>

                    </div>

                    <div className="order-secondary-info">

                      <p className="order-status">
                        {order.status}
                      </p>

                      <strong className="order-total">
                        {order.total}
                      </strong>

                    </div>

                  </article>

                ))}

            </div>

          </div>

        </div>
        

        
        <div className="logout-container">
          <button
            type="button"
            className="logout-button"
            onClick={() => navigate('/')}
          >
            Cerrar sesión
          </button>
        </div>

      </section>

    </main>
  );
}