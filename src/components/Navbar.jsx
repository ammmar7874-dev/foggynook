import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '../utils/imageHelper';
import { useCart } from '../context/CartContext';

// Placeholder for Logo until we copy it
import logoImg from '../assets/logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        // { name: 'About', path: '/about' },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 start-0 glass-panel border-b border-white/5">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <img src={logoImg} className="h-8 w-8 rounded-full border border-[var(--primary)]" alt="Foggy Nook Logo" />
                    <span className="self-center text-xl font-bold whitespace-nowrap text-[var(--primary)] font-cinzel">Foggy Nook</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-lg font-medium transition-colors hover:text-[var(--primary)] ${location.pathname === link.path ? 'text-[var(--primary)]' : 'text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/cart" className="relative group">
                        <FaShoppingCart className="text-xl text-white group-hover:text-[var(--primary)] transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? <FaTimes className="text-xl text-[var(--primary)]" /> : <FaBars className="text-xl text-white" />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="w-full md:hidden mt-4 overflow-hidden"
                        >
                            <div className="flex flex-col space-y-4 p-4 rounded-lg bg-black/90 border border-white/10">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`block py-2 px-3 rounded text-white hover:bg-white/10 hover:text-[var(--primary)] ${location.pathname === link.path ? 'text-[var(--primary)] bg-white/5' : ''}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link to="/cart" className="flex items-center py-2 px-3 text-white hover:text-[var(--primary)]" onClick={() => setIsOpen(false)}>
                                    <FaShoppingCart className="mr-2" /> Cart ({cartCount})
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
