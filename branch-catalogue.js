const branchBooksData = {
    cse: [
        { id: '1', name: 'Introduction to Algorithms', author: 'by Cormen', price: 650 },
        { id: '2', name: 'Operating System Concepts', author: 'by Silberschatz', price: 590 },
        { id: '3', name: 'Database System Concepts', author: 'by Korth', price: 520 },
        { id: '13', name: 'Computer Networks', author: 'by Tanenbaum', price: 680 }
    ],
    ece: [
        { id: '4', name: 'Electronic Devices & Circuit Theory', author: 'by Boylestad', price: 480 },
        { id: '5', name: 'Signals and Systems', author: 'by Oppenheim', price: 450 },
        { id: '6', name: 'Digital Design', author: 'by Morris Mano', price: 399 },
        { id: '14', name: 'Microelectronic Circuits', author: 'by Sedra & Smith', price: 720 }
    ],
    eee: [
        { id: '7', name: 'Fundamentals of Electric Circuits', author: 'by Alexander', price: 550 },
        { id: '8', name: 'Electrical Machines', author: 'by Nagrath & Kothari', price: 430 }
    ],
    civil: [
        { id: '10', name: 'Structural Analysis', author: 'by Hibbeler', price: 610 },
        { id: '11', name: 'Soil Mechanics & Foundations', author: 'by B.C. Punmia', price: 420 }
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
