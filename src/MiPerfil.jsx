import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';
import './Perfil.css';
import perfil from './assets/perfil.jpg';

export default function MiPerfil() {
  const navigate = useNavigate();

  // Estado donde se guardarán los pedidos
  const [orders, setOrders] = useState([]);

  // Obtener los pedidos guardados
  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem('orders')
    ) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <main className="profile-page">

      {/* HEADER */}
      <header className="header-glass">

        <div className="logo">
          Peri-Soft
        </div>

        <button
          type="button"
          className="profile-back-button"
          onClick={() => navigate('/')}
        >
          Volver
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
              Zito_os
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
                          {order.products}
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
                          {order.products}
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
            onClick={() => navigate('/')}
          >
            Cerrar sesión
          </button>

        </div>

      </section>

    </main>
  );
}