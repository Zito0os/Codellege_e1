import { useState } from 'react';
import cor from './assets/cor.jpg';
import RAZER from './assets/RAZER.jpg';
import REDRAGON  from './assets/REDRAGON.jpg';
import LOGITECH from './assets/LOGITECH.jpg';

const products = [
  { 
    title: 'Reddragon', 
    color: 'Rojo', 
    description: 'Teclado mecánico económico con excelente iluminación.', 
    image: REDRAGON, 
    id: 1 
  },
  { 
    title: 'Corsair', 
    color: 'Negro/Gris', 
    description: 'Teclado de gama alta para entusiastas del gaming.', 
    image: cor, 
    id: 2 
  },
  { 
    title: 'Razer', 
    color: 'Verde/Negro', 
    description: 'Con switches ultra rápidos y tecnología Chroma RGB.', 
    image: RAZER, 
    id: 3 
  },
  { 
    title: 'Logitech', 
    color: 'Blanco/Negro', 
    description: 'Diseño minimalista y conectividad inalámbrica de baja latencia.', 
    image: LOGITECH, 
    id: 4 
  },
];

export default function App()  
{
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Si hay un producto seleccionado, mostramos su pantalla de detalle centrada
  if (selectedProduct) {
    return (
      <div style={{ 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2>Información del Producto</h2>
        
        {/* Contenedor de imagen centrado */}
        <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.title} 
            style={{ width: '300px', height: 'auto', display: 'block' }} 
          />
        </div>

        <h3>{selectedProduct.title}</h3>
        <p><strong>Color base:</strong> {selectedProduct.color}</p>
        <p><strong>Descripción:</strong> {selectedProduct.description}</p>
        
        {/* Botón para regresar a la lista */}
        <button onClick={() => setSelectedProduct(null)} style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>
          Volver a la lista
        </button>
      </div>
    );
  }
   const listItems = products.map(product => (
    <li key={product.id} style={{ 
      border: '1px solid #ccc', 
      padding: '15px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '10px',
      backgroundColor: '#f9f9f9'
    }}>
      {/* La imagen ahora se posiciona arriba */}
      <img 
        src={product.image} 
        alt={product.title} 
        style={{ width: '100%', height: '120px', objectFit: 'cover' }} 
      />
      <button 
        onClick={() => setSelectedProduct(product)}
        style={{ padding: '8px 16px', cursor: 'pointer', width: '100%' }}
      >
        {product.title}
      </button>
    </li>
  ));
  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '20px', 
      textAlign: 'center' 
    }}>
      <h2>Selecciona un Teclado</h2>
      
      {/* Contenedor en cuadrícula dividido en 4 columnas estables */}
      <ul style={{ 
        listStyleType: 'none', 
        padding: 0, 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px' 
      }}>
        {listItems}
      </ul>
    </div>
  );
}

