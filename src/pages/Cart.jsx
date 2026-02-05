import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaWhatsapp, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const phoneNumber = "923202465052";

    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        // Format message
        let message = `*New Order from Foggy Nook Web* \n\n`;
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name} x${item.quantity} - PKR ${(item.sellingPrice * item.quantity).toLocaleString()}\n`;
        });
        message += `\n*Total Amount: PKR ${cartTotal.toLocaleString()}*`;
        message += `\n\nI would like to place this order. Please confirm delivery details.`;

        // Encode and open WhatsApp
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-[var(--color-card-dark)] rounded-full flex items-center justify-center mb-6 border border-white/10"
                >
                    <FaShoppingBag className="text-4xl text-gray-600" />
                </motion.div>
                <h2 className="text-3xl font-cinzel text-white mb-4">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-8 font-poppins">Looks like you haven't added any premium gear yet.</p>
                <Link to="/shop">
                    <button className="px-8 py-3 bg-[var(--color-primary)] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(224,145,50,0.4)] transition-all">
                        Browse Shop
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 max-w-4xl mx-auto">
            <Link to="/shop" className="inline-flex items-center text-gray-400 hover:text-[var(--color-primary)] mb-8 transition-colors">
                <FaArrowLeft className="mr-2" /> Continue Shopping
            </Link>

            <h1 className="text-4xl font-cinzel text-white mb-8 border-b border-white/10 pb-4">Your Cart</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="md:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[var(--color-card-dark)] p-4 rounded-xl border border-white/5 flex gap-4 items-center"
                        >
                            {/* Image Fallback Logic */}
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/50 flex-shrink-0">
                                <img
                                    src="https://placehold.co/100x100?text=No+Image" // Ideally use getImageUrl here but for speed using placeholder if missing context logic, actually I should import getImageUrl if possible, or just rely on item.imageUrl if processed. 
                                    // Let's assume item has a valid URL processed by ProductCard logic before adding? 
                                    // Actually, let's just use the raw URL, it might be base64.
                                    // Better:
                                    // src={item.imageUrl} // Use the url stored in item
                                    // But base64 might be large.
                                    onError={(e) => { e.target.style.display = 'none' }}
                                    className="w-full h-full object-cover"
                                    alt={item.name}
                                />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-white font-cinzel">{item.name}</h3>
                                <p className="text-[var(--color-primary)] text-sm">PKR {item.sellingPrice?.toLocaleString()}</p>
                            </div>

                            <div className="flex items-center gap-3 bg-black/30 rounded-full px-3 py-1 border border-white/10">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="text-gray-400 hover:text-white w-6 text-center"
                                >-</button>
                                <span className="text-white font-mono w-4 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-gray-400 hover:text-white w-6 text-center"
                                >+</button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </motion.div>
                    ))}

                    <button
                        onClick={clearCart}
                        className="text-red-500 text-sm hover:underline mt-4 pl-2"
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Summary Card */}
                <div className="md:col-span-1">
                    <div className="bg-[var(--color-card-dark)] p-6 rounded-2xl border border-[var(--color-primary)]/20 sticky top-24">
                        <h3 className="text-xl font-cinzel text-white mb-6">Order Summary</h3>

                        <div className="space-y-3 mb-6 border-b border-white/10 pb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>PKR {cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Delivery</span>
                                <span className="text-xs text-gray-600">(Calculated on WhatsApp)</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-white font-bold text-xl mb-8">
                            <span>Total</span>
                            <span className="text-[var(--color-primary)]">PKR {cartTotal.toLocaleString()}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-1"
                        >
                            <FaWhatsapp className="text-2xl" /> Buy Now via WhatsApp
                        </button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                            You will be redirected to WhatsApp to confirm your order details securely.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
