flowchart TD
    A([🟢 START: Kasir Membuka Aplikasi POS]) --> B[Kasir Memilih / Scan Produk]
    B --> C[Antigravity Menerima ID Produk]
    C --> D{Cek Stok di Supabase}

    D -- ❌ Tidak Tersedia --> E[Tampilkan Pesan Error di UI\n'Stok Habis']
    E --> B

    D -- ✅ Tersedia --> F{AI Agent: Validasi Syariah}
    F -- ❌ Produk Haram /\nMelanggar Akad --> G[Tampilkan Peringatan di UI\n'Produk Tidak Sesuai Syariah']
    G --> B

    F -- ✅ Produk Halal &\nAkad Valid --> H[Tambahkan Produk ke Keranjang]
    H --> I{Kasir Tambah\nProduk Lain?}
    I -- Ya --> B
    I -- Tidak --> J[Hitung Subtotal + PPN]

    J --> K[Tampilkan Total di UI]
    K --> L[Kasir Konfirmasi Pembayaran]
    L --> M{Metode Pembayaran}

    M -- Tunai --> N[Input Nominal Uang]
    M -- Non-Tunai --> O[Proses Payment Gateway]

    N --> P[Hitung Kembalian]
    O --> P
    P --> Q[Simpan Transaksi ke Tabel sales di Supabase]
    Q --> R[AI Agent: Generate Audit Result]
    R --> S[Cetak / Tampilkan Struk Invoice]
    S --> T[Update Laporan Kas Real-Time]
    T --> U([🔴 END: Transaksi Selesai])
