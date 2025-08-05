// src/App.tsx
import { useState } from 'react';
import { products } from './data/products';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './styles/App.css';

export type CartItem = {
  id: string;
  name: string;
  image?: string; // Optional for products without images
  price: number;
  quantity: number;
};

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="container">
      <h1>MiniCart Shop 🛒</h1>
      <div className="main-content">
        <ProductList products={products} onAdd={addToCart} />
        <Cart
          cartItems={cart}
          onUpdate={updateQuantity}
          onRemove={removeFromCart}
        />
      </div>
    </div>
  );
}

export default App;
