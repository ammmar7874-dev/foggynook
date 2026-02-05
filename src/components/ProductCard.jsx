import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaShoppingCart, FaEye, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageHelper';

const ProductCard = ({ product }) => {
    const { addToCart, cart, checkoutWhatsApp } = useCart();
    const { name, sellingPrice, imageUrl, stockQuantity, description } = product;
    const displayImage = getImageUrl(imageUrl);
    const isOutOfStock = stockQuantity <= 0;

    const handleBuyNow = () => {
        if (isOutOfStock) return;

        // 1. Add to cart (persist state)
        addToCart(product);

        // 2. Predict next state for immediate checkout (avoiding async wait)
        const existingItem = cart.find(item => item.id === product.id);
        let nextCart;
        if (existingItem) {
            nextCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
            nextCart = [...cart, { ...product, quantity: 1 }];
        }

        // 3. Checkout immediately
        checkoutWhatsApp(nextCart);
    };

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ rotateX, rotateY, z: 100 }}
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="group relative bg-[var(--color-card-dark)] rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--color-primary)] transition-all duration-500 perspective-1000 transform-style-3d shadow-xl hover:shadow-[0_0_30px_rgba(224,145,50,0.15)]"
        >
            {/* Image Container */}
            <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />

                <motion.img
                    src={displayImage}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Status Badges */}
                <div className="absolute top-3 right-3 z-20">
                    {isOutOfStock ? (
                        <span className="bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-sm backdrop-blur-md uppercase tracking-wider shadow-lg">
                            Sold Out
                        </span>
                    ) : (
                        <span className="bg-[var(--color-primary)] text-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider shadow-[0_0_10px_rgba(224,145,50,0.5)]">
                            In Stock
                        </span>
                    )}
                </div>
            </div>

            {/* Content & Action Layer */}
            <div className="p-5 relative z-20">
                <Link to="#" className="block group-hover:text-[var(--color-primary)] transition-colors"> {/* TODO: Add Product Detail Link */}
                    <h3 className="text-xl font-bold font-cinzel text-white mb-2 truncate">{name}</h3>
                </Link>

                <p className="text-gray-400 text-xs mb-4 line-clamp-2 min-h-[2.5em] font-light">
                    {description || 'Premium quality vaping gear selected for the connoisseur.'}
                </p>

                <div className="flex items-center justify-between mt-2 border-t border-white/5 pt-4">
                    <span className="text-[var(--color-primary)] text-2xl font-black font-cinzel drop-shadow-sm">
                        <span className="text-xs align-top opacity-70 font-sans mr-1">PKR</span>
                        {sellingPrice?.toLocaleString()}
                    </span>

                    <div className="flex gap-2">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            disabled={isOutOfStock}
                            onClick={handleBuyNow}
                            className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 ${isOutOfStock
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-[var(--color-primary)] text-black hover:bg-white hover:shadow-[0_0_15px_rgba(224,145,50,0.6)]'
                                }`}
                        >
                            <FaWhatsapp className="text-lg" /> Buy Now
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            disabled={isOutOfStock}
                            onClick={() => addToCart(product)}
                            className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${isOutOfStock
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-[var(--color-primary)] hover:shadow-[0_0_15px_rgba(224,145,50,0.6)]'
                                }`}
                        >
                            <FaShoppingCart className="text-lg" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
