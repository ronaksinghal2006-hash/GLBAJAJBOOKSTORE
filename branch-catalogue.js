const branchBooksData = {
    cse: [
        { id: '1', name: 'Introduction to Algorithms', author: 'by Cormen', price: 650, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&auto=format&fit=crop' },
        { id: '2', name: 'Operating System Concepts', author: 'by Silberschatz', price: 590, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop' },
        { id: '3', name: 'Database System Concepts', author: 'by Korth', price: 520, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&auto=format&fit=crop' },
        { id: '13', name: 'Computer Networks', author: 'by Tanenbaum', price: 680, image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&auto=format&fit=crop' }
    ],
    ece: [
        { id: '4', name: 'Electronic Devices & Circuit Theory', author: 'by Boylestad', price: 480, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&auto=format&fit=crop' },
        { id: '5', name: 'Signals and Systems', author: 'by Oppenheim', price: 450, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&auto=format&fit=crop' },
        { id: '6', name: 'Digital Design', author: 'by Morris Mano', price: 399, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&auto=format&fit=crop' },
        { id: '14', name: 'Microelectronic Circuits', author: 'by Sedra & Smith', price: 720, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&auto=format&fit=crop' }
    ],
    eee: [
        { id: '7', name: 'Fundamentals of Electric Circuits', author: 'by Alexander', price: 550, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&auto=format&fit=crop' },
        { id: '8', name: 'Electrical Machines', author: 'by Nagrath & Kothari', price: 430, image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&auto=format&fit=crop' },
        { id: '9', name: 'Power System Analysis', author: 'by Kothari', price: 470, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&auto=format&fit=crop' }
    ],
    civil: [
        { id: '10', name: 'Structural Analysis', author: 'by Hibbeler', price: 610, image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&auto=format&fit=crop' },
        { id: '11', name: 'Soil Mechanics & Foundations', author: 'by B.C. Punmia', price: 420, image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&auto=format&fit=crop' },
        { id: '12', name: 'Surveying', author: 'by B.C. Punmia', price: 380, image: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=300&auto=format&fit=crop' }
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
    if (typeof updateCartCount === 'function') updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('bookstoreCart') || '{}');
    const totalCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) badge.innerText = totalCount;
}

window.addEventListener('DOMContentLoaded', updateCartCount);
