import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {

  const initialProducts = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ];

  // State to hold the products in the store
  const [products, setProducts] = useState(initialProducts);

  // State to hold the items in the shopping cart
  const [cart, setCart] = useState([]);

  const [order, setOrder] = useState(undefined);

  // Function to add a product to the cart
  const addToCart = (product) => {
      for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                cart[i].quantity++;
                setCart([...cart]);
                return;
            }
      }
      product.quantity = 1;
      setCart([...cart, product]);
  };

    // Function to handle making an order
    const makeOrder = () => {
        // For demonstration, just logging the order details to the console
        console.log("Order Placed:", cart);
        // Clearing the cart after placing the order
        setOrder({
            id: 1,
            total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
            status: 'Order Placed'
        })
        setCart([]);
    };

  return (
      <div>
        <h1>Online Store</h1>
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </li>
          ))}
        </ul>
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price} - Qty: {item.quantity}
              </li>
          ))}
        </ul>
          {cart.length > 0 && (
              <button onClick={makeOrder}>Place Order</button>
          )}

            {order && (
                <div>
                    <h2>Order Details</h2>
                    <p>Order ID: {order.id}</p>
                    <p>Order Total: ${order.total}</p>
                    <p>Order Status: {order.status}</p>
                </div>
            )}
      </div>
  );
}

export default App;
