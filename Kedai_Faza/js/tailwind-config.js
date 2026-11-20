/* Konfigurasi warna & font Tailwind untuk halaman kasir */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#10B981", // Emerald 500
          darkgreen: "#059669",
          orange: "#F97316", // Orange 500
          darkorange: "#EA580C",
          bgLight: "#F8FAFC",
          cardBg: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
};
