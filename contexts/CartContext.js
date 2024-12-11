import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [isAdded, setIsAdded] = useState(false);


    const findItemInCart = (productId) => {
        return cart.find((item) => item.id === productId);
    };

    const findItemByName = (name) => {
        return cart.find((item) => item.name === name);
    };

    const addToCart = (item) => {
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
    };
    
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ setCart, cart, isAdded, setIsAdded, cartCount, setCartCount, addToCart, removeFromCart, clearCart, findItemInCart, findItemByName }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);