import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[var(--color-card-dark)] border-t border-white/10 mt-auto pt-12 pb-8">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="text-3xl font-cinzel font-bold text-[var(--color-primary)] mb-2">Foggy Nook</span>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            Premium Vapes, Mods & Accessories. <br />
                            Experience luxury in every cloud.
                        </p>
                    </div>

                    {/* Locations Section */}
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-white font-cinzel font-bold text-lg mb-4">Visit Our Lounges</h3>
                        <div className="space-y-4">
                            <a
                                href="https://share.google/i6762iYNemal6usqk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center hover:bg-white/5 p-3 rounded-lg transition-all"
                            >
                                <div className="flex items-center gap-2 text-[var(--color-primary)] mb-1">
                                    <FaMapMarkerAlt /> <span className="font-bold">Lahore Branch</span>
                                </div>
                                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">Get Directions</span>
                            </a>

                            <a
                                href="https://maps.app.goo.gl/bKkgF4SGWJBs9cwq6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center hover:bg-white/5 p-3 rounded-lg transition-all"
                            >
                                <div className="flex items-center gap-2 text-[var(--color-primary)] mb-1">
                                    <FaMapMarkerAlt /> <span className="font-bold">Vehari Branch</span>
                                </div>
                                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">Get Directions</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact & Socials */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <h3 className="text-white font-cinzel font-bold text-lg mb-4">Connect With Us</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--color-primary)] transition-all transform hover:-translate-y-1"><FaInstagram size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--color-primary)] transition-all transform hover:-translate-y-1"><FaFacebook size={20} /></a>
                        </div>
                        <a href="https://wa.me/923202465052" className="flex items-center gap-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                            <FaPhone className="text-[var(--color-primary)]" /> +92 320 2465052
                        </a>
                    </div>
                </div>

                <hr className="my-8 border-white/10" />

                <div className="text-center text-sm text-gray-600 font-light">
                    © {new Date().getFullYear()} Foggy Nook. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
