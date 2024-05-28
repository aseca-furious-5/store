import './App.css';
import { useEffect, useState } from "react";
import { getAllItems, postOrder } from "./service";

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState(undefined);

    const fetchItems = async () => {
        getAllItems().then(items => setProducts(items));
    }

    useEffect(() => {
        fetchItems();
    }, []);

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

    const makeOrder = async () => {
        const order = await postOrder({ items: cart });
        setOrder(order);
        setCart([]);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Online Store</h1>
            </header>
            <div>
                <h2>Products</h2>
                <ul>
                    {products.length > 0 && products.map((product) => (
                        <li key={product.id}>
                            {product.name} - ${product.price}
                            <br/>
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
                    <div className="order-details">
                        <h2>Order Details</h2>
                        <p>Order ID: {order.id}</p>
                        <p>Order Status: {order.status}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
