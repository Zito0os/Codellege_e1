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

app.get('/api/favoritos/:usuarioId', async (req, res) => {
  const usuarioId = Number(req.params.usuarioId);

  if (!Number.isInteger(usuarioId)) {
    return res.status(400).json({ error: 'El usuario no es válido' });
  }

  try {
    const favoritos = await prisma.favorito.findMany({
      where: { usuarioId },
      select: { productoId: true },
      orderBy: { fechaAgregado: 'desc' },
    });

    return res.json(favoritos.map((favorito) => favorito.productoId));
  } catch (error) {
    console.error('ERROR AL OBTENER FAVORITOS:', error);
    return res.status(500).json({ error: error.message || 'Error al obtener favoritos' });
  }
});

app.post('/api/favoritos', async (req, res) => {
  const usuarioId = Number(req.body?.usuarioId);
  const productoId = Number(req.body?.productoId);

  if (!Number.isInteger(usuarioId) || !Number.isInteger(productoId)) {
    return res.status(400).json({ error: 'El usuario y el producto son obligatorios' });
  }

  try {
    await prisma.favorito.upsert({
      where: { usuarioId_productoId: { usuarioId, productoId } },
      update: {},
      create: { usuarioId, productoId },
    });

    return res.status(201).json({ productoId });
  } catch (error) {
    console.error('ERROR AL GUARDAR FAVORITO:', error);
    return res.status(500).json({ error: error.message || 'Error al guardar favorito' });
  }
});

app.delete('/api/favoritos/:usuarioId/:productoId', async (req, res) => {
  const usuarioId = Number(req.params.usuarioId);
  const productoId = Number(req.params.productoId);

  if (!Number.isInteger(usuarioId) || !Number.isInteger(productoId)) {
    return res.status(400).json({ error: 'El usuario y el producto no son válidos' });
  }

  try {
    await prisma.favorito.deleteMany({ where: { usuarioId, productoId } });
    return res.status(204).send();
  } catch (error) {
    console.error('ERROR AL ELIMINAR FAVORITO:', error);
    return res.status(500).json({ error: error.message || 'Error al eliminar favorito' });
  }
});

const serializeOrder = (pedido) => ({
  id: pedido.id,
  date: pedido.fecha,
  time: pedido.hora,
  status: pedido.estado.toLowerCase() === 'entregado' ? 'Entregado' : 'En preparación',
  total: Number(pedido.total),
  payment: pedido.metodoPago,
  products: pedido.DetallePedido.map((detalle) => ({
    name: detalle.Producto.nombre,
    quantity: detalle.cantidad,
    price: Number(detalle.precioUnitario),
    custom: detalle.Producto.esCustom,
  })),
});

app.post('/api/pedidos', async (req, res) => {
  const { usuarioId, metodoPago = 'Tarjeta de crédito', items = [] } = req.body || {};
  const parsedUsuarioId = Number(usuarioId);

  if (!Number.isInteger(parsedUsuarioId) || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'El usuario y los productos son obligatorios' });
  }

  try {
    const pedido = await prisma.$transaction(async (transaction) => {
      const usuario = await transaction.usuario.findUnique({
        where: { id: parsedUsuarioId },
      });

      if (!usuario) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
      }

      const detalles = [];

      for (const item of items) {
        const cantidad = Number(item.cantidad);
        if (!Number.isInteger(cantidad) || cantidad < 1) {
          const error = new Error('La cantidad de un producto no es válida');
          error.statusCode = 400;
          throw error;
        }

        if (item.isCustom) {
          const precio = Number(item.precio);
          if (!Number.isFinite(precio) || precio < 0) {
            const error = new Error('El precio del producto personalizado no es válido');
            error.statusCode = 400;
            throw error;
          }

          const productoCustom = await transaction.producto.create({
            data: {
              nombre: item.nombre || 'Teclado personalizado',
              descripcion: item.parts || null,
              caracteristicas: item.parts || null,
              precio,
              imagen: item.imagen || 'arco.jpg',
              esCustom: true,
            },
          });

          detalles.push({ productoId: productoCustom.id, cantidad, precioUnitario: precio });
          continue;
        }

        const producto = await transaction.producto.findUnique({
          where: { id: Number(item.productoId) },
        });

        if (!producto) {
          const error = new Error(`Producto ${item.productoId} no encontrado`);
          error.statusCode = 404;
          throw error;
        }

        const precio = Number(producto.precio);
        const descuento = Number(producto.descuento || 0);
        const precioUnitario = precio - (precio * descuento) / 100;
        detalles.push({ productoId: producto.id, cantidad, precioUnitario });
      }

      const total = detalles.reduce(
        (sum, detalle) => sum + detalle.precioUnitario * detalle.cantidad,
        0
      );
      const ahora = new Date();

      return transaction.pedido.create({
        data: {
          usuarioId: parsedUsuarioId,
          fecha: ahora,
          hora: ahora,
          metodoPago: String(metodoPago),
          total,
          DetallePedido: { create: detalles },
        },
        include: {
          DetallePedido: { include: { Producto: true } },
        },
      });
    });

    return res.status(201).json(serializeOrder(pedido));
  } catch (error) {
    console.error('ERROR AL CREAR PEDIDO:', error);
    return res.status(error.statusCode || 500).json({
      error: error.message || 'Error al crear el pedido',
    });
  }
});

app.get('/api/pedidos/:usuarioId', async (req, res) => {
  const usuarioId = Number(req.params.usuarioId);

  if (!Number.isInteger(usuarioId)) {
    return res.status(400).json({ error: 'El usuario no es válido' });
  }

  try {
    const pedidos = await prisma.pedido.findMany({
      where: { usuarioId },
      orderBy: { id: 'desc' },
      include: {
        DetallePedido: { include: { Producto: true } },
      },
    });

    return res.json(pedidos.map(serializeOrder));
  } catch (error) {
    console.error('ERROR AL OBTENER PEDIDOS:', error);
    return res.status(500).json({ error: error.message || 'Error al obtener los pedidos' });
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});