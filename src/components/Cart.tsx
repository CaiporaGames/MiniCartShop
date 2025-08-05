// src/components/Cart.tsx
import type { CartItem } from '../App';
export default function Cart({
  cartItems,
  onUpdate,
  onRemove,
}: {
  cartItems: CartItem[];
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const res = await fetch('/.netlify/functions/createCheckoutSession', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(cartItems),
});


    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} × 
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e => onUpdate(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: €{(total / 100).toFixed(2)}</p>
      {cartItems.length > 0 && <button onClick={handleCheckout}>Checkout</button>}
    </div>
  );
}
