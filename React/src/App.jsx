import { useState } from 'react';
import './Catalogo.css'
import './index.css'
import razer from './assets/razer.jpg'
import corsair from './assets/corsair.jpg'
import redragon from './assets/redragon.jpg'
import logitech from './assets/logitech.jpg'

const products = [
  { title: 'Redragon', color: 'Rojo', description: 'Teclado mecánico económico con excelente iluminación.', id: 1, imagen: redragon },
  { title: 'Corsair', color: 'Negro/Gris', description: 'Teclado de gama alta para entusiastas del gaming.', id: 2, imagen: corsair },
  { title: 'Razer', color: 'Verde/Negro', description: 'Con switches ultra rápidos y tecnología Chroma RGB.', id: 3, imagen: razer },
  { title: 'Logitech', color: 'Blanco/Negro', description: 'Diseño minimalista y conectividad inalámbrica de baja latencia.', id: 4, imagen: logitech },
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
        
        {/* Botón para regresar a la lista */}
        <button onClick={() => setSelectedProduct(null)} style={{ marginTop: '10px', padding: '8px 16px' }}>
          Volver a la lista
        </button>
      </div>
    );
  }

  // Si no hay producto seleccionado, mostramos la lista de botones
  const listItems = products.map(products => (
    <li key={products.id}>
      <button 
      
      style={{ padding: '8px 16px', cursor: 'pointer', width: '200px' }}
        onClick={() => setSelectedProduct(products)}
      
      >
        {products.title}
      </button>
    </li>
  ));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Selecciona un Teclado</h2>
       <div className="grid-products">
        {products.map((prod) => (
          <button 
            key={prod.id} 
            className="btn-products"
            onClick={() => handleSelect(prod.titulo)}
          >
            <div className="imagen-wrapper">
              <img src={prod.imagen} alt={prod.titulo} />
            </div>
            <span className="titulo-products">{prod.titulo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}