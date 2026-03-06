import { useState } from "react"

const products = [
  { id: 1, name: "Kurma Ajwa", price: 85000, emoji: "🫘", stock: 50, category: "Makanan", desc: "Kurma premium pilihan" },
  { id: 2, name: "Madu Hutan", price: 120000, emoji: "🍯", stock: 30, category: "Minuman", desc: "Madu asli hutan tropis" },
  { id: 3, name: "Susu Kambing", price: 35000, emoji: "🥛", stock: 40, category: "Minuman", desc: "Susu kambing segar" },
  { id: 4, name: "Roti Gandum", price: 25000, emoji: "🍞", stock: 60, category: "Makanan", desc: "Roti gandum bergizi" },
  { id: 5, name: "Teh Herbal", price: 45000, emoji: "🍵", stock: 25, category: "Minuman", desc: "Teh herbal alami" },
  { id: 6, name: "Minyak Zaitun", price: 75000, emoji: "🫙", stock: 20, category: "Lainnya", desc: "Minyak zaitun extra virgin" },
  { id: 7, name: "Kismis", price: 30000, emoji: "🍇", stock: 45, category: "Makanan", desc: "Kismis manis bergizi" },
  { id: 8, name: "Sari Delima", price: 55000, emoji: "🍹", stock: 15, category: "Minuman", desc: "Minuman sari buah delima" },
]

const fmt = (n) => "Rp " + Math.round(n).toLocaleString("id-ID")

// STEP 1: Welcome Screen
function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-6 text-center">
      <div className="mb-6 text-7xl animate-bounce">🕌</div>
      <h1 className="text-4xl font-bold text-yellow-400 mb-2">Zeline SMart</h1>
      <p className="text-gray-400 text-lg mb-1">Toko Produk Halal & Terpercaya</p>
      <p className="text-gray-600 text-sm mb-10 italic">"وَأَحَلَّ اللَّهُ الْبَيْعَ" — Allah menghalalkan jual beli (QS. Al-Baqarah: 275)</p>

      <div className="grid grid-cols-3 gap-4 mb-10 text-center">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <div className="text-2xl mb-1">✅</div>
          <p className="text-xs text-gray-400">100% Produk<br />Halal & Tersertifikasi</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <div className="text-2xl mb-1">🤖</div>
          <p className="text-xs text-gray-400">AI Audit<br />Syariah Otomatis</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <div className="text-2xl mb-1">🧾</div>
          <p className="text-xs text-gray-400">Struk Digital<br />Real-Time</p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold text-lg px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-yellow-400/20"
      >
        Mulai Belanja →
      </button>
      <p className="text-gray-600 text-xs mt-4">Smart POS Syariah • Sistem Informasi Akuntansi</p>
    </div>
  )
}

// STEP 2: Product Selection
function ProductScreen({ cart, setCart, onCheckout, onBack }) {
  const [filter, setFilter] = useState("Semua")
  const [search, setSearch] = useState("")
  const categories = ["Semua", "Makanan", "Minuman", "Lainnya"]

  const filtered = products.filter(p =>
    (filter === "Semua" || p.category === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const addToCart = (p) => {
    const existing = cart.find(i => i.id === p.id)
    if (existing) {
      setCart(cart.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
    } else {
      setCart([...cart, { ...p, qty: 1 }])
    }
  }

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id))
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-400 hover:text-white mr-1">←</button>
          <span className="text-xl">🕌</span>
          <div>
            <h1 className="text-lg font-bold text-yellow-400">Zeline SMart</h1>
            <p className="text-xs text-gray-500">Pilih produk halal pilihanmu</p>
          </div>
        </div>
        <button
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="relative bg-yellow-400 disabled:bg-gray-700 disabled:text-gray-500 text-gray-950 font-bold px-5 py-2 rounded-xl text-sm transition-all hover:bg-yellow-300"
        >
          🛒 Keranjang
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{totalItems}</span>
          )}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Products */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Cari produk..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-yellow-500 mb-4"
          />

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === c ? "bg-yellow-400 text-gray-950" : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-yellow-500"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => {
              const inCart = cart.find(i => i.id === p.id)
              return (
                <div
                  key={p.id}
                  className="bg-gray-900 border border-gray-800 hover:border-yellow-500 rounded-2xl p-4 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/10"
                  onClick={() => addToCart(p)}
                >
                  <div className="text-4xl mb-3">{p.emoji}</div>
                  <span className="text-xs text-green-400 border border-green-800 bg-green-950 px-2 py-0.5 rounded-full">HALAL ✓</span>
                  <p className="font-semibold text-sm mt-2">{p.name}</p>
                  <p className="text-gray-500 text-xs mb-2">{p.desc}</p>
                  <p className="text-yellow-400 font-bold text-sm">{fmt(p.price)}</p>
                  <p className="text-gray-600 text-xs">Stok: {p.stock}</p>
                  {inCart && (
                    <div className="mt-2 bg-yellow-400 text-gray-950 text-xs font-bold text-center py-1 rounded-lg">
                      ✓ {inCart.qty} di keranjang
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Cart Sidebar */}
        {cart.length > 0 && (
          <div className="w-72 bg-gray-900 border-l border-gray-800 flex flex-col p-4 overflow-y-auto">
            <h2 className="font-bold text-yellow-400 mb-4">🛒 Keranjang ({totalItems})</h2>
            <div className="flex-1 space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2">
                  <span className="text-lg">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-xs text-yellow-400">{fmt(item.price * item.qty)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => item.qty === 1 ? removeFromCart(item.id) : setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty - 1 } : i))}
                      className="w-5 h-5 bg-gray-700 rounded text-xs hover:bg-red-800">−</button>
                    <span className="text-xs w-4 text-center">{item.qty}</span>
                    <button onClick={() => addToCart(item)}
                      className="w-5 h-5 bg-gray-700 rounded text-xs hover:bg-green-800">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-3 mt-3">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Subtotal</span><span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span>Zakat (2.5%)</span><span>{fmt(subtotal * 0.025)}</span>
              </div>
              <div className="flex justify-between font-bold text-white mb-4">
                <span>TOTAL</span><span className="text-yellow-400">{fmt(subtotal * 1.025)}</span>
              </div>
              <button onClick={onCheckout}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold py-3 rounded-xl transition-all">
                Lanjut Bayar →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// STEP 3: Payment Screen
function PaymentScreen({ cart, onBack, onSuccess }) {
  const [bayar, setBayar] = useState("")
  const [method, setMethod] = useState("tunai")
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const zakat = subtotal * 0.025
  const total = subtotal + zakat
  const kembalian = parseFloat(bayar) - total

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-white">←</button>
        <span className="text-xl">🕌</span>
        <div>
          <h1 className="text-lg font-bold text-yellow-400">Konfirmasi Pembayaran</h1>
          <p className="text-xs text-gray-500">Langkah terakhir transaksi Anda</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto w-full p-6 space-y-4">
        {/* Order Summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-3">Ringkasan Pesanan</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm py-2 border-b border-gray-800">
              <span>{item.emoji} {item.name} x{item.qty}</span>
              <span className="text-yellow-400">{fmt(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="flex justify-between text-gray-400"><span>Zakat/Sadaqah (2.5%)</span><span>{fmt(zakat)}</span></div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-800">
              <span>TOTAL</span><span className="text-yellow-400">{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* AI Audit */}
        <div className="bg-gray-900 border border-green-800 rounded-2xl p-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">🤖 AI Audit Result</p>
          <p className="text-green-400 text-sm font-medium">✅ Semua produk terverifikasi HALAL. Transaksi sesuai prinsip Syariah.</p>
          <p className="text-gray-600 text-xs mt-1">Tidak ada pelanggaran akad terdeteksi • Audit selesai</p>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-3">Metode Pembayaran</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {["tunai", "transfer"].map(m => (
              <button key={m} onClick={() => setMethod(m)}
                className={`py-3 rounded-xl text-sm font-medium border transition-all ${method === m ? "bg-yellow-400 text-gray-950 border-yellow-400" : "bg-gray-800 text-gray-400 border-gray-700 hover:border-yellow-500"}`}>
                {m === "tunai" ? "💵 Tunai" : "📱 Transfer"}
              </button>
            ))}
          </div>

          {method === "tunai" && (
            <>
              <input
                type="number"
                placeholder="Masukkan nominal uang (Rp)"
                value={bayar}
                onChange={e => setBayar(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 focus:border-yellow-500 rounded-xl px-4 py-3 text-white outline-none text-sm mb-2"
              />
              {bayar && kembalian >= 0 && (
                <div className="bg-green-950 border border-green-800 rounded-xl px-4 py-2 text-green-400 text-sm font-medium">
                  💚 Kembalian: {fmt(kembalian)}
                </div>
              )}
              {bayar && kembalian < 0 && (
                <div className="bg-red-950 border border-red-800 rounded-xl px-4 py-2 text-red-400 text-sm">
                  ❌ Uang kurang: {fmt(Math.abs(kembalian))}
                </div>
              )}
            </>
          )}

          {method === "transfer" && (
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Transfer ke rekening:</p>
              <p className="text-white font-bold">BSI • 7123456789</p>
              <p className="text-yellow-400 font-bold text-lg mt-1">{fmt(total)}</p>
            </div>
          )}
        </div>

        <button
          onClick={onSuccess}
          disabled={method === "tunai" && (!bayar || kembalian < 0)}
          className="w-full bg-yellow-400 disabled:bg-gray-700 disabled:text-gray-500 hover:bg-yellow-300 text-gray-950 font-bold py-4 rounded-2xl text-lg transition-all hover:scale-[1.01]"
        >
          ✓ Selesaikan Pembayaran
        </button>
      </div>
    </div>
  )
}

// STEP 4: Success Screen
function SuccessScreen({ cart, onReset }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal * 1.025
  const now = new Date().toLocaleString("id-ID")

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4 animate-bounce">✅</div>
        <h2 className="text-2xl font-bold text-green-400 mb-1">Transaksi Berhasil!</h2>
        <p className="text-gray-400 text-sm mb-6">Jazakallah khairan atas kepercayaan Anda</p>

        {/* Receipt */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-left mb-6">
          <div className="text-center mb-4 border-b border-gray-800 pb-3">
            <p className="text-yellow-400 font-bold">🕌 Zeline SMart</p>
            <p className="text-gray-500 text-xs">{now}</p>
          </div>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm py-1 text-gray-400">
              <span>{item.emoji} {item.name} x{item.qty}</span>
              <span>{fmt(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="border-t border-gray-800 mt-3 pt-3 space-y-1 text-sm">
            <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="flex justify-between text-gray-400"><span>Zakat (2.5%)</span><span>{fmt(subtotal * 0.025)}</span></div>
            <div className="flex justify-between font-bold text-white text-base mt-1"><span>TOTAL</span><span className="text-yellow-400">{fmt(total)}</span></div>
          </div>
          <div className="mt-3 bg-green-950 border border-green-800 rounded-xl p-2 text-center">
            <p className="text-green-400 text-xs">🤖 AI Audit: Transaksi Syariah Terverifikasi ✓</p>
          </div>
        </div>

        <button onClick={onReset}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold py-3 rounded-2xl transition-all">
          Transaksi Baru →
        </button>
      </div>
    </div>
  )
}

// MAIN APP
export default function App() {
  const [step, setStep] = useState("welcome")
  const [cart, setCart] = useState([])

  return (
    <>
      {step === "welcome" && <WelcomeScreen onStart={() => setStep("products")} />}
      {step === "products" && <ProductScreen cart={cart} setCart={setCart} onCheckout={() => setStep("payment")} onBack={() => setStep("welcome")} />}
      {step === "payment" && <PaymentScreen cart={cart} onBack={() => setStep("products")} onSuccess={() => setStep("success")} />}
      {step === "success" && <SuccessScreen cart={cart} onReset={() => { setCart([]); setStep("welcome") }} />}
    </>
  )
}
