import React, { useState } from 'react';

const POSInput = () => {
    const [cart, setCart] = useState([]);
    const products = [
        { id: 1, name: 'Premium Dates', price: 50 },
        { id: 2, name: 'Prayer Mat', price: 120 },
        { id: 3, name: 'Organic Honey', price: 85 },
    ];

    const addToCart = (product) => setCart([...cart, product]);
    const subtotal = cart.reduce((acc, curr) => acc + curr.price, 0);
    const suggestedSadaqah = subtotal * 0.025; // 2.5% suggestion

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-100">
            {/* Product Selection */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Product Catalog</h2>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                        SHARIA COMPLIANT
                    </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(p => (
                        <button key={p.id} onClick={() => addToCart(p)} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-transparent hover:border-emerald-500 transition text-left">
                            <p className="font-semibold text-slate-700">{p.name}</p>
                            <p className="text-emerald-600 font-bold">${p.price}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Transaction Summary */}
            <div className="w-full md:w-96 bg-white border-l border-slate-200 p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-6">Current Order</h2>
                <div className="flex-1 space-y-3 overflow-y-auto">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span className="font-semibold">${item.price}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 text-sm italic">
                        <span>Suggested Sadaqah (2.5%)</span>
                        <span>+${suggestedSadaqah.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t">
                        <span>Total</span>
                        <span>${(subtotal + suggestedSadaqah).toFixed(2)}</span>
                    </div>
                </div>

                <button className="w-full mt-6 py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition">
                    Complete Transaction
                </button>
            </div>
        </div>
    );
};

export default POSInput;