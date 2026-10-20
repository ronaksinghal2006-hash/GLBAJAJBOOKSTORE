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
        { id: '8', name: 'Electrical Machines', author: 'by Nagrath & Kothari', branch: 'eee', price: 430, icon: '🔋' }
    ],
    civil: [
        { id: '10', name: 'Structural Analysis', author: 'by Hibbeler', branch: 'civil', price: 610, icon: '🏗️' }
    ]
};

function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('bookstoreCart') || '{}');
    if (cart[id]) {
        cart[id].quantity += 1;
    } else {
        cart[id] = { id, name, price, quantity: 1 };
    }
    localStorage.setItem('bookstoreCart', JSON.stringify(cart));
    alert(name + ' added to cart!');
}
