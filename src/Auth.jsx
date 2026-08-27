import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Auth() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const endpoint = isRegister ? '/api/registro' : '/api/login';

    const payload = isRegister
      ? {
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        }
      : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        throw new Error('Respuesta no válida del servidor', { cause: parseErr });
      }

      if (!res.ok) {
        throw new Error(
          data.error || `Error ${res.status}: Ocurrió un error en el servidor`
        );
      }

      setMensaje(data.mensaje || 'Operación realizada con éxito');
      setFormData({ nombre: '', email: '', password: '' });

      if (data.usuario) {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="auth-page">
      <header className="header-glass">
        <button
          type="button"
          className="logo"
          onClick={() => navigate('/')}
        >
          Peri-Soft
        </button>
      </header>

      <section className="auth-shell">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/')}
        >
          Volver
        </button>

        <div className="auth-card">
          <h2>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>

          {mensaje && <p className="auth-msg success">{mensaje}</p>}
          {error && <p className="auth-msg error">{error}</p>}

          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <div className="auth-field">
                <label>Nombre Completo:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth-field">
              <label>Correo Electrónico:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              {isRegister ? 'Registrarse' : 'Ingresar'}
            </button>
          </form>

          <p className="auth-toggle-text">
            {isRegister ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}
            <button
              type="button"
              className="auth-toggle-btn"
              onClick={() => {
                setIsRegister(!isRegister);
                setMensaje('');
                setError('');
              }}
            >
              {isRegister ? ' Inicia sesión' : ' Regístrate'}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
