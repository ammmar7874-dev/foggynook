import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('foggy_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('foggy_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const checkoutWhatsApp = (itemsToCheckout = cart) => {
        if (!itemsToCheckout || itemsToCheckout.length === 0) return;

        const phoneNumber = "923202465052";
        let message = `*New Order from Foggy Nook Web* \n\n`;
        let total = 0;

        itemsToCheckout.forEach((item, index) => {
            const itemTotal = item.sellingPrice * item.quantity;
            message += `${index + 1}. ${item.name} x${item.quantity} - PKR ${itemTotal.toLocaleString()}\n`;
            total += itemTotal;
        });

        message += `\n*Total Amount: PKR ${total.toLocaleString()}*`;
        message += `\n\nI would like to place this order. Please confirm delivery details.`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const cartTotal = cart.reduce((total, item) => total + (item.sellingPrice * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, cartTotal, cartCount, checkoutWhatsApp }}>
            {children}
        </CartContext.Provider>
    );
};
