const branchBooksData = {
    cse: [
        { id: '1', name: 'Introduction to Algorithms', author: 'by Cormen', price: 650, image: 'images/algo.jpg' },
        { id: '2', name: 'Operating System Concepts', author: 'by Silberschatz', price: 590, image: 'images/os.jpg' },
        { id: '3', name: 'Database System Concepts', author: 'by Korth', price: 520, image: 'images/dbms.jpg' },
        { id: '13', name: 'Computer Networks', author: 'by Tanenbaum', price: 680, image: 'images/cn.jpg' }
    ],
    ece: [
        { id: '4', name: 'Electronic Devices & Circuit Theory', author: 'by Boylestad', price: 480, image: 'images/edc.jpg' },
        { id: '5', name: 'Signals and Systems', author: 'by Oppenheim', price: 450, image: 'images/signals.jpg' },
        { id: '6', name: 'Digital Design', author: 'by Morris Mano', price: 399, image: 'images/digital.jpg' },
        { id: '14', name: 'Microelectronic Circuits', author: 'by Sedra & Smith', price: 720, image: 'images/micro.jpg' }
    ],
    eee: [
        { id: '7', name: 'Fundamentals of Electric Circuits', author: 'by Alexander', price: 550, image: 'images/circuits.jpg' },
        { id: '8', name: 'Electrical Machines', author: 'by Nagrath & Kothari', price: 430, image: 'images/machines.jpg' },
        { id: '9', name: 'Power System Analysis', author: 'by Kothari', price: 470, image: 'images/power.jpg' },
        { id: '15', name: 'Control Systems Engineering', author: 'by I.J. Nagrath', price: 600, image: 'images/control.jpg' }
    ],
    civil: [
        { id: '10', name: 'Structural Analysis', author: 'by Hibbeler', price: 610, image: 'images/structural.jpg' },
        { id: '11', name: 'Soil Mechanics & Foundations', author: 'by B.C. Punmia', price: 420, image: 'images/soil.jpg' },
        { id: '12', name: 'Surveying', author: 'by B.C. Punmia', price: 380, image: 'images/surveying.jpg' },
        { id: '16', name: 'Design of Concrete Structures', author: 'by N. Krishna Raju', price: 540, image: 'images/concrete.jpg' }
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
