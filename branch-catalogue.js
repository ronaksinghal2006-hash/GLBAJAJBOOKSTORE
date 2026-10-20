const branchBooksData = {
    cse: [
        { id: '1', name: 'Introduction to Algorithms', author: 'by Cormen', branch: 'cse', price: 650, icon: '💻' },
        { id: '2', name: 'Operating System Concepts', author: 'by Silberschatz', branch: 'cse', price: 590, icon: '🖥️' },
        { id: '3', name: 'Database System Concepts', author: 'by Korth', branch: 'cse', price: 520, icon: '🗄️' },
        { id: '13', name: 'Computer Networks', author: 'by Tanenbaum', branch: 'cse', price: 680, icon: '🌐' }
    ],
    ece: [
        { id: '4', name: 'Electronic Devices & Circuit Theory', author: 'by Boylestad', branch: 'ece', price: 480, icon: '📡' },
        { id: '5', name: 'Signals and Systems', author: 'by Oppenheim', branch: 'ece', price: 450, icon: '📊' },
        { id: '6', name: 'Digital Design', author: 'by Morris Mano', branch: 'ece', price: 399, icon: '🔌' },
        { id: '14', name: 'Microelectronic Circuits', author: 'by Sedra & Smith', branch: 'ece', price: 720, icon: '⚡' }
    ],
    eee: [
        { id: '7', name: 'Fundamentals of Electric Circuits', author: 'by Alexander', branch: 'eee', price: 550, icon: '⚡' },
        { id: '8', name: 'Electrical Machines', author: 'by Nagrath & Kothari', branch: 'eee', price: 430, icon: '🔋' },
        { id: '9', name: 'Power System Analysis', author: 'by Kothari', branch: 'eee', price: 470, icon: '🏭' },
        { id: '15', name: 'Control Systems Engineering', author: 'by I.J. Nagrath', branch: 'eee', price: 600, icon: '⚙️' }
    ],
    civil: [
        { id: '10', name: 'Structural Analysis', author: 'by Hibbeler', branch: 'civil', price: 610, icon: '🏗️' },
        { id: '11', name: 'Soil Mechanics & Foundations', author: 'by B.C. Punmia', branch: 'civil', price: 420, icon: '🧱' },
        { id: '12', name: 'Surveying', author: 'by B.C. Punmia', branch: 'civil', price: 380, icon: '📐' },
        { id: '16', name: 'Design of Concrete Structures', author: 'by N. Krishna Raju', branch: 'civil', price: 540, icon: '🏛️' }
    ]
};

function renderBranchBooks(branchKey) {
    const grid = document.getElementById('branchBooksGrid');
    if (!grid) return;
    const books = branchBooksData[branchKey] || [];
    
    grid.innerHTML = books.map(book => `
        <div class="book-card">
            <div class="book-img-box">${book.icon}</div>
            <div class="book-info">
                <div class="book-title">${book.name}</div>
                <div class="book-author">${book.author}</div>
                <div style="margin-bottom: 10px;"><span class="branch-tag">${book.branch}</span></div>
                <div class="book-meta">
                    <span class="book-price">₹${book.price}</span>
                    <button class="btn-add" onclick="addToCart('${book.id}', '${book.name}', ${book.price})">Add</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('bookstoreCart') || '{}');
    if (cart[id]) {
        cart[id].quantity += 1;
    } else {
        cart[id] = { id, name, price, quantity: 1 };
    }
    localStorage.setItem('bookstoreCart', JSON.stringify(cart));
    updateGlobalCartCount();
    alert(name + ' added to cart!');
}

function updateGlobalCartCount() {
    const cart = JSON.parse(localStorage.getItem('bookstoreCart') || '{}');
    const total = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = total;
}

updateGlobalCartCount();
