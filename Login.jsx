import React from 'react';

const Login = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">Sharia POS</h1>
                        <p className="text-slate-500">Manage your business with Barakah</p>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Email Address</label>
                            <input type="email" className="mt-1 block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" placeholder="name@business.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Password</label>
                            <input type="password" className="mt-1 block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" placeholder="••••••••" />
                        </div>
                        <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
                            Sign In
                        </button>
                    </form>
                </div>

                <div className="bg-emerald-50 p-6 border-t border-emerald-100 text-center">
                    <p className="text-emerald-800 italic text-sm">
                        "Give the worker his wages before his sweat dries."
                        <span className="block font-bold mt-1">— Prophetic Ethics</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;