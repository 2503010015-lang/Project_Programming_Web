// DATA STATE INITIALIZATION
let currentPin = "";
const CORRECT_PIN = "1234";

let menuItems = [
  { id: 1, name: "Baso Tahu Komplit", category: "basotahu", price: 15000, hpp: 9000, icon: "🍢" },
  {
    id: 2,
    name: "Siomay Porsi (5 pcs)",
    category: "basotahu",
    price: 12000,
    hpp: 7000,
    icon: "🥟",
  },
  { id: 3, name: "Mie Yamin Baso", category: "mie", price: 18000, hpp: 10000, icon: "🍜" },
  { id: 4, name: "Mie Kuah Pedas", category: "mie", price: 15000, hpp: 8500, icon: "🌶️" },
  { id: 5, name: "Jus Alpukat", category: "jus", price: 10000, hpp: 5500, icon: "🥑" },
  { id: 6, name: "Jus Mangga", category: "jus", price: 8000, hpp: 4000, icon: "🥭" },
  { id: 7, name: "Es Teh Manis", category: "sachet", price: 4000, hpp: 1500, icon: "🍹" },
  { id: 8, name: "Kopi Hitam Sachet", category: "sachet", price: 5000, hpp: 2000, icon: "☕" },
];

let ingredients = [
  { id: 1, name: "Adonan Baso & Tahu", stock: 45, unit: "Porsi", hpp: 9000 },
  { id: 2, name: "Stok Mie & Bumbu", stock: 30, unit: "Porsi", hpp: 8500 },
  { id: 3, name: "Buah Alpukat", stock: 12, unit: "Kg", hpp: 5500 },
  { id: 4, name: "Buah Mangga", stock: 8, unit: "Kg", hpp: 4000 },
  { id: 5, name: "Sachet Kopi & Es Teh", stock: 60, unit: "Sachet", hpp: 1800 },
];

let cart = [];
let selectedPayment = "tunai";
let expenses = [{ id: 1, desc: "Belanja Es Batu 2 Plastik", amount: 10000, date: "Hari Ini" }];
let kasbonList = [
  { id: 1, name: "Pak Tejo (Warung Sebelah)", amount: 25000, status: "Belum Lunas" },
];
let salesData = {
  totalOmzet: 245000,
  totalProfit: 105000,
  transactionCount: 14,
};

let salesChart = null;

// --- PIN LOGIC ---
function pressPin(num) {
  if (currentPin.length < 4) {
    currentPin += num;
    updatePinDots();
  }
}

function deletePin() {
  currentPin = currentPin.slice(0, -1);
  updatePinDots();
}

function clearPin() {
  currentPin = "";
  updatePinDots();
}

function updatePinDots() {
  const dots = document.querySelectorAll(".pin-dot");
  dots.forEach((dot, idx) => {
    if (idx < currentPin.length) {
      dot.classList.add("bg-brand-green", "border-brand-green");
      dot.classList.remove("bg-transparent", "border-slate-600");
    } else {
      dot.classList.remove("bg-brand-green", "border-brand-green");
      dot.classList.add("bg-transparent", "border-slate-600");
    }
  });
}

function loginSubmit() {
  if (currentPin === CORRECT_PIN) {
    document.getElementById("page-login").classList.add("hidden");
    document.getElementById("main-header").classList.remove("hidden");
    document.getElementById("main-header").classList.add("flex");
    document.getElementById("main-content").classList.remove("hidden");
    document.getElementById("main-nav").classList.remove("hidden");

    renderPOSMenu("semua");
    renderManagementMenu();
    renderStock();
    renderExpenses();
    renderKasbon();
    updateReports();
    showToast("Selamat datang di Kasir UMKM!");
  } else {
    showToast("PIN salah. PIN demo: 1234", true);
    clearPin();
  }
}

function logout() {
  currentPin = "";
  updatePinDots();
  document.getElementById("page-login").classList.remove("hidden");
  document.getElementById("main-header").classList.add("hidden");
  document.getElementById("main-content").classList.add("hidden");
  document.getElementById("main-nav").classList.add("hidden");
  document.getElementById("floating-cart-bar").classList.add("hidden");
}

// --- NAVIGATION LOGIC ---
function switchPage(pageId) {
  document.querySelectorAll(".page-view").forEach((el) => el.classList.add("hidden"));
  document.getElementById("page-" + pageId).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("text-brand-green");
    btn.classList.add("text-slate-400");
  });
  document.getElementById("nav-" + pageId).classList.remove("text-slate-400");
  document.getElementById("nav-" + pageId).classList.add("text-brand-green");

  // Toggle floating cart bar
  if (pageId === "pos" && cart.length > 0) {
    document.getElementById("floating-cart-bar").classList.remove("hidden");
  } else {
    document.getElementById("floating-cart-bar").classList.add("hidden");
  }

  if (pageId === "reports") {
    setTimeout(initChart, 100);
  }
}

// --- POS / KASIR LOGIC ---
function renderPOSMenu(category) {
  const grid = document.getElementById("menu-grid");
  grid.innerHTML = "";

  const filtered =
    category === "semua" ? menuItems : menuItems.filter((m) => m.category === category);

  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "btn-active bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer border-l-4 border-l-brand-green";
    card.onclick = () => addToCart(item.id);
    card.innerHTML = `
                    <div class="flex justify-between items-start">
                        <span class="text-2xl">${item.icon}</span>
                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">${item.category}</span>
                    </div>
                    <div class="mt-2">
                        <h4 class="font-extrabold text-sm text-slate-800 leading-snug">${item.name}</h4>
                        <p class="text-brand-green font-extrabold text-sm mt-1">Rp ${item.price.toLocaleString("id-ID")}</p>
                    </div>
                    <button class="mt-3 w-full bg-slate-100 text-slate-700 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-brand-green hover:text-white transition">
                        <i class="fa-solid fa-plus text-[10px]"></i> Tambah
                    </button>
                `;
    grid.appendChild(card);
  });
}

function filterCategory(cat) {
  document.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.classList.remove("bg-brand-green", "text-white");
    btn.classList.add("bg-white", "text-slate-700");
  });
  event.currentTarget.classList.remove("bg-white", "text-slate-700");
  event.currentTarget.classList.add("bg-brand-green", "text-white");
  renderPOSMenu(cat);
}

function addToCart(itemId) {
  const item = menuItems.find((m) => m.id === itemId);
  const existing = cart.find((c) => c.id === itemId);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  showToast(`${item.name} ditambahkan`);
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  document.getElementById("cart-item-count").innerText = `${totalItems} Item`;
  document.getElementById("cart-total-price").innerText =
    `Rp ${totalPrice.toLocaleString("id-ID")}`;

  if (cart.length > 0) {
    document.getElementById("floating-cart-bar").classList.remove("hidden");
  } else {
    document.getElementById("floating-cart-bar").classList.add("hidden");
  }
}

function openCartModal() {
  renderCartModalItems();
  document.getElementById("modal-cart").classList.remove("hidden");
}

function closeCartModal() {
  document.getElementById("modal-cart").classList.add("hidden");
}

function renderCartModalItems() {
  const container = document.getElementById("cart-modal-items");
  container.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const row = document.createElement("div");
    row.className =
      "flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200";
    row.innerHTML = `
                    <div>
                        <p class="font-extrabold text-xs text-slate-800">${item.name}</p>
                        <p class="text-[11px] text-slate-500">Rp ${item.price.toLocaleString("id-ID")} x ${item.qty}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="changeQty(${item.id}, -1)" class="w-7 h-7 bg-white text-slate-700 border border-slate-300 font-bold rounded-lg flex items-center justify-center">-</button>
                        <span class="font-bold text-xs w-4 text-center">${item.qty}</span>
                        <button onclick="changeQty(${item.id}, 1)" class="w-7 h-7 bg-white text-slate-700 border border-slate-300 font-bold rounded-lg flex items-center justify-center">+</button>
                    </div>
                `;
    container.appendChild(row);
  });

  document.getElementById("modal-cart-total").innerText = `Rp ${total.toLocaleString("id-ID")}`;
}

function changeQty(id, delta) {
  const index = cart.findIndex((c) => c.id === id);
  if (index !== -1) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }

  if (cart.length === 0) {
    closeCartModal();
  } else {
    renderCartModalItems();
  }
  updateCartUI();
}

function selectPaymentMethod(method) {
  selectedPayment = method;
  if (method === "tunai") {
    document.getElementById("pay-btn-tunai").className =
      "btn-active border-2 border-brand-green bg-emerald-50 text-brand-green font-bold p-3 rounded-xl flex items-center justify-center gap-2";
    document.getElementById("pay-btn-qris").className =
      "btn-active border-2 border-slate-200 text-slate-600 font-bold p-3 rounded-xl flex items-center justify-center gap-2";
  } else {
    document.getElementById("pay-btn-qris").className =
      "btn-active border-2 border-brand-green bg-emerald-50 text-brand-green font-bold p-3 rounded-xl flex items-center justify-center gap-2";
    document.getElementById("pay-btn-tunai").className =
      "btn-active border-2 border-slate-200 text-slate-600 font-bold p-3 rounded-xl flex items-center justify-center gap-2";
  }
}

function processPayment() {
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const totalHpp = cart.reduce((acc, curr) => acc + curr.hpp * curr.qty, 0);

  // Update Sales Data
  salesData.totalOmzet += total;
  salesData.totalProfit += total - totalHpp;
  salesData.transactionCount += 1;

  // Render Receipt
  const receiptItems = document.getElementById("receipt-items-list");
  receiptItems.innerHTML = "";
  cart.forEach((item) => {
    receiptItems.innerHTML += `
                    <div class="flex justify-between">
                        <span>${item.name} (${item.qty})</span>
                        <span>Rp ${(item.price * item.qty).toLocaleString("id-ID")}</span>
                    </div>
                `;
  });

  document.getElementById("receipt-total").innerText = `Rp ${total.toLocaleString("id-ID")}`;
  document.getElementById("receipt-method").innerText = selectedPayment;
  document.getElementById("receipt-id").innerText =
    `#TRX-${Math.floor(1000 + Math.random() * 9000)}`;

  closeCartModal();
  document.getElementById("modal-receipt").classList.remove("hidden");

  // Reset cart
  cart = [];
  updateCartUI();
  updateReports();
}

function closeReceiptModal() {
  document.getElementById("modal-receipt").classList.add("hidden");
}

function printReceipt() {
  showToast("Mencetak Struk via Bluetooth Printer...");
  setTimeout(closeReceiptModal, 1500);
}

// --- MANAJEMEN MENU LOGIC ---
function renderManagementMenu() {
  const list = document.getElementById("management-menu-list");
  list.innerHTML = "";

  menuItems.forEach((item) => {
    const el = document.createElement("div");
    el.className =
      "bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center";
    el.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <span class="text-2xl">${item.icon}</span>
                        <div>
                            <h4 class="font-extrabold text-sm text-slate-800">${item.name}</h4>
                            <p class="text-xs text-slate-500">Harga Jual: <span class="font-bold text-brand-green">Rp ${item.price.toLocaleString("id-ID")}</span></p>
                            <p class="text-[11px] text-slate-400">HPP / Modal: Rp ${item.hpp.toLocaleString("id-ID")}</p>
                        </div>
                    </div>
                    <button onclick="deleteMenu(${item.id})" class="text-rose-500 hover:text-rose-700 p-2 font-bold text-sm">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                `;
    list.appendChild(el);
  });
}

function openMenuModal() {
  document.getElementById("modal-add-menu").classList.remove("hidden");
}

function closeMenuModal() {
  document.getElementById("modal-add-menu").classList.add("hidden");
}

function saveNewMenu() {
  const name = document.getElementById("input-menu-name").value;
  const cat = document.getElementById("input-menu-cat").value;
  const price = parseInt(document.getElementById("input-menu-price").value);
  const hpp = parseInt(document.getElementById("input-menu-hpp").value) || price * 0.6;

  if (!name || isNaN(price)) {
    showToast("Mohon lengkapi nama dan harga menu", true);
    return;
  }

  const newObj = {
    id: Date.now(),
    name: name,
    category: cat,
    price: price,
    hpp: hpp,
    icon: cat === "jus" ? "🧃" : cat === "mie" ? "🍜" : cat === "basotahu" ? "🍢" : "☕",
  };

  menuItems.push(newObj);
  renderManagementMenu();
  renderPOSMenu("semua");
  closeMenuModal();
  showToast("Menu berhasil ditambahkan");

  document.getElementById("input-menu-name").value = "";
  document.getElementById("input-menu-price").value = "";
  document.getElementById("input-menu-hpp").value = "";
}

function deleteMenu(id) {
  menuItems = menuItems.filter((m) => m.id !== id);
  renderManagementMenu();
  renderPOSMenu("semua");
  showToast("Menu dihapus");
}

// --- MANAJEMEN STOK LOGIC ---
function renderStock() {
  const container = document.getElementById("stock-list");
  container.innerHTML = "";

  ingredients.forEach((ing) => {
    const margin = (((menuItems[0]?.price - ing.hpp) / menuItems[0]?.price) * 100).toFixed(0);
    const el = document.createElement("div");
    el.className = "bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2";
    el.innerHTML = `
                    <div class="flex justify-between items-center">
                        <h4 class="font-extrabold text-sm text-slate-800">${ing.name}</h4>
                        <span class="text-xs font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">Stok: ${ing.stock} ${ing.unit}</span>
                    </div>
                    <div class="flex justify-between items-center text-xs text-slate-500 pt-1">
                        <span>Modal / Porsi (HPP): <strong class="text-slate-800">Rp ${ing.hpp.toLocaleString("id-ID")}</strong></span>
                        <span class="text-brand-green font-bold"><i class="fa-solid fa-arrow-up-right"></i> Est Margin ~50%</span>
                    </div>
                `;
    container.appendChild(el);
  });
}

// --- PENGELUARAN & KASBON LOGIC ---
function switchExpenseTab(tab) {
  if (tab === "exp") {
    document.getElementById("tab-content-exp").classList.remove("hidden");
    document.getElementById("tab-content-kasbon").classList.add("hidden");
    document.getElementById("tab-btn-exp").className =
      "flex-1 py-2 rounded-xl bg-white text-slate-800 shadow font-bold";
    document.getElementById("tab-btn-kasbon").className =
      "flex-1 py-2 rounded-xl text-slate-600 font-bold";
  } else {
    document.getElementById("tab-content-exp").classList.add("hidden");
    document.getElementById("tab-content-kasbon").classList.remove("hidden");
    document.getElementById("tab-btn-exp").className =
      "flex-1 py-2 rounded-xl text-slate-600 font-bold";
    document.getElementById("tab-btn-kasbon").className =
      "flex-1 py-2 rounded-xl bg-white text-slate-800 shadow font-bold";
  }
}

function addExpense() {
  const desc = document.getElementById("exp-desc").value;
  const amount = parseInt(document.getElementById("exp-amount").value);

  if (!desc || isNaN(amount)) {
    showToast("Isi keterangan & nominal pengeluaran", true);
    return;
  }

  expenses.unshift({ id: Date.now(), desc: desc, amount: amount, date: "Hari Ini" });
  renderExpenses();
  updateReports();

  document.getElementById("exp-desc").value = "";
  document.getElementById("exp-amount").value = "";
  showToast("Pengeluaran berhasil dicatat");
}

function renderExpenses() {
  const list = document.getElementById("expense-history-list");
  list.innerHTML = "";

  expenses.forEach((exp) => {
    const el = document.createElement("div");
    el.className =
      "bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs";
    el.innerHTML = `
                    <div>
                        <p class="font-bold text-slate-800">${exp.desc}</p>
                        <p class="text-[10px] text-slate-400">${exp.date}</p>
                    </div>
                    <span class="font-extrabold text-rose-600">- Rp ${exp.amount.toLocaleString("id-ID")}</span>
                `;
    list.appendChild(el);
  });
}

function addKasbon() {
  const name = document.getElementById("kasbon-name").value;
  const amount = parseInt(document.getElementById("kasbon-amount").value);

  if (!name || isNaN(amount)) {
    showToast("Isi nama & nominal kasbon", true);
    return;
  }

  kasbonList.unshift({ id: Date.now(), name: name, amount: amount, status: "Belum Lunas" });
  renderKasbon();

  document.getElementById("kasbon-name").value = "";
  document.getElementById("kasbon-amount").value = "";
  showToast("Kasbon pelanggan dicatat");
}

function renderKasbon() {
  const list = document.getElementById("kasbon-history-list");
  list.innerHTML = "";

  kasbonList.forEach((k) => {
    const el = document.createElement("div");
    el.className =
      "bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs";
    el.innerHTML = `
                    <div>
                        <p class="font-bold text-slate-800">${k.name}</p>
                        <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">${k.status}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="font-extrabold text-slate-800">Rp ${k.amount.toLocaleString("id-ID")}</span>
                        <button onclick="payKasbon(${k.id})" class="bg-brand-green text-white font-bold px-2.5 py-1 rounded-lg text-[10px]">Lunas</button>
                    </div>
                `;
    list.appendChild(el);
  });
}

function payKasbon(id) {
  kasbonList = kasbonList.filter((k) => k.id !== id);
  renderKasbon();
  showToast("Kasbon ditandai lunas!");
}

// --- LAPORAN & CHART LOGIC ---
function updateReports() {
  const totalExp = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  document.getElementById("report-omzet").innerText =
    `Rp ${salesData.totalOmzet.toLocaleString("id-ID")}`;
  document.getElementById("report-laba").innerText =
    `Rp ${(salesData.totalProfit - totalExp).toLocaleString("id-ID")}`;
  document.getElementById("report-expense").innerText = `Rp ${totalExp.toLocaleString("id-ID")}`;
  document.getElementById("report-tx-count").innerText = `${salesData.transactionCount} Transaksi`;
}

function initChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");

  if (salesChart) {
    salesChart.destroy();
  }

  salesChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
      datasets: [
        {
          label: "Penjualan (Rp)",
          data: [120000, 180000, 150000, 210000, 190000, 310000, salesData.totalOmzet],
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: "#10B981",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { display: false },
        x: { grid: { display: false } },
      },
    },
  });
}

// --- UTILITY TOAST ---
function showToast(msg, isError = false) {
  const toast = document.getElementById("toast");
  const icon = document.getElementById("toast-icon");
  document.getElementById("toast-msg").innerText = msg;

  if (isError) {
    icon.className = "fa-solid fa-triangle-exclamation text-rose-500 text-sm";
  } else {
    icon.className = "fa-solid fa-circle-check text-brand-green text-sm";
  }

  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}
