import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
    const [quantities, setQuantities] = useState({});

    const findItemInCart = (productId) => {
        return cart.find((item) => item.id === productId);
    };

    const findItemByName = (name) => {
        return cart.find((item) => item.name === name);
    };

    const addToCart = (item) => {
        setCartCount((prev) => prev + 1);
        setCart((prevCart) => {
            const itemInCart = prevCart.find((cartItem) => cartItem.id === item.id);
            if (itemInCart) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
        setQuantities((prev) => ({
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1, 
        }));
    };
    
    const removeFromCart = (productId) => {
        setCartCount((prev) => prev - 1);
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        setQuantities((prev) => {
            const newQuantities = { ...prev };
            delete newQuantities[productId];
            return newQuantities;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const handleQuantityChange = (productId, value) => {
        setCartCount((prev) => prev + (value - quantities[productId]));
        setQuantities((prev) => ({
            ...prev,
            [productId]: parseInt(value, 10),
        }));
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => {
            const quantity = quantities[item.id] || 1;
            return acc + item.price * quantity;
        }, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                isAdded,
                setIsAdded,
                cartCount,
                setCartCount,
                addToCart,
                removeFromCart,
                clearCart,
                findItemInCart,
                findItemByName,
                quantities,
                handleQuantityChange,
                calculateTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);