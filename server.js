import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint de Registro
app.post('/api/registro', async (req, res) => {
  const { nombre = '', email = '', password = '' } = req.body || {};

  const cleanNombre = String(nombre).trim();
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPassword = String(password);

  if (!cleanNombre || !cleanEmail || !cleanPassword) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email: cleanEmail } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(cleanPassword, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: cleanNombre,
        email: cleanEmail,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      mensaje: 'Usuario registrado con éxito',
      usuario: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email }
    });
  } catch (error) {
    console.error('ERROR EN REGISTRO:', error);
    return res.status(500).json({ error: error.message || 'Error al registrar el usuario' });
  }
});

// Endpoint de Login
app.post('/api/login', async (req, res) => {
  const { email = '', password = '' } = req.body || {};

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPassword = String(password);

  if (!cleanEmail || !cleanPassword) {
    return res.status(400).json({ error: 'Por favor ingresa correo y contraseña' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email: cleanEmail } });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordValida = await bcrypt.compare(cleanPassword, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    return res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    console.error('ERROR EN LOGIN:', error);
    return res.status(500).json({ error: error.message || 'Error al iniciar sesión' });
  }
});

// Endpoint para obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return res.json(productos);
  } catch (error) {
    console.error('ERROR AL OBTENER PRODUCTOS:', error);
    return res.status(500).json({
      error: error.message || 'Error al obtener los productos',
    });
  }
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});