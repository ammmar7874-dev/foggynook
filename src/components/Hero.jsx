import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';

// Import shop images
import shop1 from '../assets/shop1.jpg';
import shop2 from '../assets/shop2.jpg';
import shop3 from '../assets/shop3.jpg';
import shop4 from '../assets/shop4.jpg';

const Hero = () => {
    const images = [shop1, shop2, shop3, shop4];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll slideshow
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">

            {/* Background Slideshow */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark Overlay for text readability */}
                    <img
                        src={images[currentIndex]}
                        alt="Foggy Nook Shop Interior"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                        Premium Vape Lounge
                    </span>

                    <h1 className="text-5xl md:text-8xl font-black font-cinzel text-white mb-6 leading-tight drop-shadow-2xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)]">FOGGY</span> NOOK
                    </h1>

                    <p className="text-gray-300 text-lg md:text-2xl font-poppins mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Step into luxury. Experience the finest mods, premium e-liquids, and a community like no other.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-[var(--color-primary)] text-black font-bold text-lg rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(224,145,50,0.5)] hover:shadow-[0_0_40px_rgba(224,145,50,0.7)] transition-all"
                            >
                                Shop Collection <FaArrowRight />
                            </motion.button>
                        </Link>

                        <a
                            href="https://wa.me/923202465052"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-transparent border border-white/30 text-white font-semibold text-lg rounded-full flex items-center gap-2 backdrop-blur-sm hover:border-[var(--color-primary)] transition-colors"
                            >
                                <FaWhatsapp className="text-green-500 text-xl" /> Chat with Us
                            </motion.button>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[var(--color-primary)] w-8' : 'bg-white/50 hover:bg-white'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
