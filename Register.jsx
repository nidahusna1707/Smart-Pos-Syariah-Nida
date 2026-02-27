import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({ businessName: '', owner: '', email: '', type: 'Retail' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registration Data:", formData);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-xl w-full bg-white p-10 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">Join Sharia POS</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-slate-600">Business Name</label>
                        <input required type="text" className="w-full mt-2 p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none" placeholder="e.g. Al-Barakah Boutique" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-600">Owner Name</label>
                        <input required type="text" className="w-full mt-2 p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-600">Business Category</label>
                        <select className="w-full mt-2 p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none">
                            <option>Retail</option>
                            <option>F&B (Halal)</option>
                            <option>Service</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-slate-600">Email Address</label>
                        <input required type="email" className="w-full mt-2 p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none" />
                    </div>
                    <button className="md:col-span-2 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition">
                        Create Merchant Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;