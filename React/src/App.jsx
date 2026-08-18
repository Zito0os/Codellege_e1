import { useState } from 'react';

const products = [

  {
    title: 'Reddragon',
    color: 'Rojo',
    price: 899.00,
    description: 'Teclado mecánico económico con excelente iluminación, perfecto para empezar en gaming.',
    image: REDRAGON,
    id: 1,
  },
  {
    title: 'Corsair',
    color: 'Negro/Gris',
    price: 2499.00,
    description: 'Teclado premium para jugadores exigentes con acabados y desempeño superiores.',
    image: cor,
    id: 2,
  },
  {
    title: 'Razer',
    color: 'Verde/Negro',
    price: 1899.00,
    description: 'Con switches ultrarrápidos y tecnología RGB para una experiencia competitiva.',
    image: RAZER,
    id: 3,
  },
  {
    title: 'Logitechhhhh',
    color: 'Blanco/Negros',
    price: 1599.00,
    description: 'Diseño elegante y funcional, ideal para trabajo diario con buen rendimiento.',
    image: LOGITECH,
    id: 4,
  },

];

export default function ShoppingList() {
  // Estado para guardar el producto seleccionado actualmente (null si estamos en la lista)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Si hay un producto seleccionado, mostramos su pantalla de detalle
  if (selectedProduct) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Información del Producto</h2>
        <h3>{selectedProduct.title}</h3>
        <p><strong>Color base:</strong> {selectedProduct.color}</p>
        <p><strong>Descripción:</strong> {selectedProduct.description}</p>
        <p><strong>Precio:</strong> ${selectedProduct.price} MXN</p>

        {/* Botón para regresar a la lista */}
        <button onClick={() => setSelectedProduct(null)} style={{ marginTop: '10px', padding: '8px 16px' }}>
          Volver a la lista
        </button>
      </div>
    );
  }

  // Si no hay producto seleccionado, mostramos la lista de botones
 const listItems = products.map(product => (
    <li key={product.id} style={{ marginBottom: '10px' }}>
      <button 
        onClick={() => setSelectedProduct(product)}
        style={{ padding: '8px 16px', cursor: 'pointer', width: '220px', textAlign: 'left' }}
      >
        {/* 3. Mostramos título y precio en el botón */}
        <strong>{product.title}</strong> - ${product.price}
      </button>
    </li>
  ));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Selecciona un Teclado</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {listItems}
      </ul>
    </div>
  );
}