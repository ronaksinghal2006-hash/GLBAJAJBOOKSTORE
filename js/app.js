/* ---------- Layout (header + footer) ---------- */
const NAV = [
  ["index.html", "Home"],
  ["login.html", "Login"],
  ["registration.html", "Register"],
  ["catalogue.html", "Catalogue"],
  ["cart.html", "Cart"]
];

function renderLayout() {
  const page = location.pathname.split("/").pop() || "index.html";
  const links = NAV.map(([href, label]) => {
    const active = page === href ? "active" : "";
    const badge = label === "Cart" ? `<span class="badge" id="cart-count">0</span>` : "";
    return `<a href="${href}" class="${active}">${label}${badge}</a>`;
  }).join("");

  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) header.innerHTML = `
    <div class="college-bar">GL BAJAJ INSTITUTE OF TECHNOLOGY AND MANAGEMENT</div>
    <div class="header">
      <a href="index.html" class="logo">
        <img src="images/logo.png" alt="GL Bajaj Logo">
        <span class="logo-text">GL <span>BAJAJ</span> BOOKSTORE</span>
      </a>
      <nav class="nav">${links}</nav>
    </div>`;

  if (footer) footer.innerHTML = `
    <div class="footer">
      <p><strong>GL BAJAJ INSTITUTE OF TECHNOLOGY AND MANAGEMENT</strong></p>
      <p>Name: Ronak &nbsp;|&nbsp; Roll No: 2501920110313</p>
      <p>GitHub: <a href="https://github.com/ronaksinghal2006-hash" target="_blank">github.com/Ronak</a></p>
    </div>`;

  updateBadge();
}

/* ---------- Sidebar (Shop by Branch) on every page ---------- */
function renderSidebar() {
  const main = document.querySelector("main");
  if (!main) return;

  const page = location.pathname.split("/").pop() || "index.html";
  const branches = [
    ["cse.html", "💻 CSE"],
    ["ece.html", "📡 ECE"],
    ["eee.html", "⚡ EEE"],
    ["civil.html", "🏗️ CIVIL"]
  ];
  const tiles = branches.map(([href, label]) =>
    `<a href="${href}" class="branch-tile ${page === href ? "active" : ""}">${label}</a>`
  ).join("");

  const wrap = document.createElement("div");
  wrap.className = "page-layout";

  const aside = document.createElement("aside");
  aside.className = "sidebar";
  aside.innerHTML = `
    <h2 class="side-title">Shop by Branch</h2>
    <div class="branches">${tiles}</div>`;

  main.parentNode.insertBefore(wrap, main);
  wrap.appendChild(aside);
  wrap.appendChild(main);
}

/* ---------- Cart ---------- */
const getCart = () => JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadge();
}

function updateBadge() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = getCart().reduce((sum, i) => sum + i.qty, 0);
}

function addToCart(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  item ? item.qty++ : cart.push({ id, qty: 1 });
  saveCart(cart);
  toast("Added to cart ✔");
}

function changeQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  saveCart(getCart().filter(i => i.id !== id));
  renderCart();
}

function toast(text) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1500);
}

/* ---------- Books display ---------- */
function bookCard(b) {
  return `
    <div class="card">
      <div class="cover">${b.icon}</div>
      <h3>${b.title}</h3>
      <p class="author">by ${b.author}</p>
      <span class="tag">${b.branch.toUpperCase()}</span>
      <div class="row">
        <span class="price">₹${b.price}</span>
        <button class="btn" onclick="addToCart(${b.id})">Add</button>
      </div>
    </div>`;
}

function renderBooks(list) {
  const grid = document.getElementById("book-grid");
  if (!grid) return;
  grid.innerHTML = list.length ? list.map(bookCard).join("") : "<p>No books found.</p>";
}

function initBookPages() {
  const grid = document.getElementById("book-grid");
  if (!grid) return;

  const branch = document.body.dataset.branch;
  if (branch) {
    renderBooks(BOOKS.filter(b => b.branch === branch));
    return;
  }

  const search = document.getElementById("search");
  const filter = document.getElementById("filter");
  const apply = () => {
    const q = search.value.toLowerCase();
    const f = filter.value;
    renderBooks(BOOKS.filter(b =>
      (f === "all" || b.branch === f) &&
      (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    ));
  };
  search.addEventListener("input", apply);
  filter.addEventListener("change", apply);
  apply();
}

/* ---------- Cart page ---------- */
function renderCart() {
  const box = document.getElementById("cart-box");
  if (!box) return;
  const cart = getCart();
  if (!cart.length) {
    box.innerHTML = "<p>Your cart is empty. <a href='catalogue.html'>Browse books</a></p>";
    return;
  }
  let total = 0;
  const rows = cart.map(item => {
    const b = BOOKS.find(x => x.id === item.id);
    const sub = b.price * item.qty;
    total += sub;
    return `
      <tr>
        <td>${b.icon} ${b.title}</td>
        <td>₹${b.price}</td>
        <td class="qty">
          <button onclick="changeQty(${b.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${b.id}, 1)">+</button>
        </td>
        <td>₹${sub}</td>
        <td><button class="btn" onclick="removeItem(${b.id})">Remove</button></td>
      </tr>`;
  }).join("");
  box.innerHTML = `
    <table>
      <tr><th>Book</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr>
      ${rows}
    </table>
    <p class="total">Total: ₹${total}</p>
    <div style="text-align:right;margin-top:15px">
      <button class="btn" onclick="checkout()">Checkout</button>
    </div>`;
}

function checkout() {
  alert("Order placed successfully! 🎉");
  saveCart([]);
  renderCart();
}

/* ---------- Login / Register (demo only, localStorage) ---------- */
function initForms() {
  const reg = document.getElementById("register-form");
  if (reg) reg.addEventListener("submit", e => {
    e.preventDefault();
    const name = reg.name.value.trim();
    const email = reg.email.value.trim().toLowerCase();
    const password = reg.password.value;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const msg = document.getElementById("msg");
    if (users.some(u => u.email === email)) {
      msg.textContent = "Email already registered.";
      msg.style.color = "red";
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    msg.textContent = "Registered! Redirecting to login...";
    msg.style.color = "green";
    setTimeout(() => location.href = "login.html", 1200);
  });

  const login = document.getElementById("login-form");
  if (login) login.addEventListener("submit", e => {
    e.preventDefault();
    const email = login.email.value.trim().toLowerCase();
    const password = login.password.value;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    const msg = document.getElementById("msg");
    if (user) {
      localStorage.setItem("currentUser", user.name);
      msg.textContent = `Welcome back, ${user.name}!`;
      msg.style.color = "green";
      setTimeout(() => location.href = "catalogue.html", 1000);
    } else {
      msg.textContent = "Invalid email or password.";
      msg.style.color = "red";
    }
  });
}

/* ---------- Start ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
  renderSidebar();
  initBookPages();
  renderCart();
  initForms();
});
