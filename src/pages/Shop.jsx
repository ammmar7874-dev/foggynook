import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import { FaSearch } from 'react-icons/fa';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, instock, outofstock

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setError("Failed to load products. Check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filter === 'all' ? true :
                filter === 'instock' ? product.stockQuantity > 0 :
                    product.stockQuantity <= 0;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen py-10 px-4 max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <h1 className="text-4xl font-cinzel text-[var(--primary)]">Our Collection</h1>

                {/* Search & Filter */}
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search vape, flavor..."
                            className="w-full bg-[var(--card-dark)] border border-white/10 rounded-full py-2 pl-10 pr-4 text-white focus:border-[var(--primary)] outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-[var(--card-dark)] border border-white/10 rounded-full py-2 px-4 text-white outline-none cursor-pointer"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Items</option>
                        <option value="instock">In Stock</option>
                        <option value="outofstock">Out of Stock</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-20 flex flex-col items-center">
                    <p className="text-xl mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-[var(--primary)] text-black font-bold rounded-full hover:bg-white transition-colors"
                    >
                        Retry Connection
                    </button>
                </div>
            ) : (
                <>
                    {filteredProducts.length === 0 ? (
                        <div className="text-center text-gray-500 py-20">No products found.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Shop;
