import React from 'react';
import Hero from '../components/Hero';

const Home = () => {
    return (
        <div className="flex flex-col">
            <Hero />
            {/* Featured Preview (Placeholder) */}
            <section className="py-20 px-4 bg-[var(--color-card-dark)]">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-cinzel text-[var(--color-primary)] mb-8">Latest Arrivals</h2>
                    <p className="text-gray-500">Connecting to live inventory...</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
