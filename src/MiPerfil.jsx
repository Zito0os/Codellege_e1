import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';
import './Perfil.css';
import perfil from './assets/perfil.jpg';

const formatProducts = (products) => {
  if (Array.isArray(products)) {
    return products
      .map((product) => `${product.quantity} x ${product.name}`)
      .join(', ');
  }

  return products || 'Sin productos';
};

export default function MiPerfil() {
  const navigate = useNavigate();

  // Estado donde se guardarán los pedidos
  const [orders, setOrders] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [error, setError] = useState('');

  // Obtener los pedidos guardados
  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!usuario) {
          navigate('/login', { replace: true });
          return;
        }

        setNombreUsuario(usuario.nombre || '');

        const response = await fetch(`/api/pedidos/${usuario.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudieron cargar tus pedidos');
        }

        setOrders(data);
      } catch {
        setError('No se pudieron cargar tus pedidos');
      }
    };

    cargarPedidos();
  }, [navigate]);

  if (error) {
    return <p className="auth-msg error">{error}</p>;
  }

  return (
    <main className="profile-page">

      {/* HEADER */}
      <header className="header-glass">

        <button
          type="button"
          className="logo"
          onClick={() => navigate('/')}
        >
          Peri-Soft

        </button>

        

      </header>


      <section className="profile-container">

        {/* =========================
            PERFIL
        ========================== */}

        <div className="profile-card">

          <div className="profile-image-container">

            <img
              src={perfil}
              alt="Imagen de perfil"
              className="profile-image"
            />

          </div>

          <h1>
            Mi perfil
          </h1>

          <div className="profile-user-info">

            <h2>
              {nombreUsuario}
            </h2>

          </div>

        </div>


        {/* =========================
            PEDIDOS Y COMPRAS
        ========================== */}

        <div className="orders-sections">


          {/* =========================
              MIS PEDIDOS
          ========================== */}

          <div className="orders-card">

            <h2>
              Mis pedidos
            </h2>

            <div className="orders-list">

              {orders.filter(
                (order) => order.status !== 'Entregado'
              ).length === 0 ? (

                <p className="no-orders">
                  No tienes pedidos en camino.
                </p>

              ) : (

                orders
                  .filter(
                    (order) => order.status !== 'Entregado'
                  )
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
                          <strong>
                            Fecha:
                          </strong>{' '}
                          {order.date}
                        </p>

                        <p>
                          <strong>
                            Hora:
                          </strong>{' '}
                          {order.time}
                        </p>

                        <p>
                          <strong>
                            Productos:
                          </strong>{' '}
                          {formatProducts(order.products)}
                        </p>

                        <p>
                          <strong>
                            Método de pago:
                          </strong>{' '}
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

                  ))

              )}

            </div>

          </div>


          {/* =========================
              MIS COMPRAS
          ========================== */}

          <div className="orders-card">

            <h2>
              Mis compras
            </h2>

            <div className="orders-list">

              {orders.filter(
                (order) => order.status === 'Entregado'
              ).length === 0 ? (

                <p className="no-orders">
                  Aún no tienes compras realizadas.
                </p>

              ) : (

                orders
                  .filter(
                    (order) => order.status === 'Entregado'
                  )
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
                          <strong>
                            Fecha:
                          </strong>{' '}
                          {order.date}
                        </p>

                        <p>
                          <strong>
                            Hora:
                          </strong>{' '}
                          {order.time}
                        </p>

                        <p>
                          <strong>
                            Productos:
                          </strong>{' '}
                          {formatProducts(order.products)}
                        </p>

                        <p>
                          <strong>
                            Método de pago:
                          </strong>{' '}
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

                  ))

              )}

            </div>

          </div>

        </div>


        {/* =========================
            CERRAR SESIÓN
        ========================== */}

        <div className="logout-container">

          <button
            type="button"
            className="logout-button"
            onClick={() => {
              localStorage.removeItem('usuario');
              navigate('/login', { replace: true });
            }}
          >
            Cerrar sesión
          </button>

        </div>

      </section>

    </main>
  );
}