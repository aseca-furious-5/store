import './App.css';
import {useEffect, useState} from "react";
import {getAllItems, postOrder} from "./service";

function App() {

    // State to hold the products in the store
    const [products, setProducts] = useState([]);

    const fetchItems = async () => {
        getAllItems().then(items => setProducts(items));
    }

    useEffect(() => {
        fetchItems();
    }, []);

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
    const makeOrder = async () => {
        // For demonstration, just logging the order details to the console
        const order = await postOrder({items: cart});
        // Clearing the cart after placing the order
        setOrder(order)
        setCart([]);
    };

    return (
        <div>
            <h1>Online Store</h1>
            <h2>Products</h2>
            <ul>
                {products.length > 0 && products.map((product) => (
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
                    <p>Order Status: {order.status}</p>
                </div>
            )}
        </div>
    );
}

export default App;
