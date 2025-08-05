// src/components/ProductList.tsx
import type { CartItem } from '../App';
import '../styles/ProductList.css';

type Product = Omit<CartItem, 'quantity'>;

export default function ProductList({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (product: Product) => void;
}) {
  return (
    <div className="products">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} width={100} />
          <h3>{product.name}</h3>
          <p>€{(product.price / 100).toFixed(2)}</p>
          <button onClick={() => onAdd(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
