// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
    /* Notification Styles */
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient-secondary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-md);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    }

    .notification.fade-out {
        animation: fadeOut 0.5s ease-out forwards;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    .order-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-color);
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const orderModal = document.getElementById('orderModal');
    if (e.target === orderModal) {
        orderModal.style.display = 'none';
    }
});

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const rollNo = document.getElementById('rollNo').value.trim();
    const phone = document.getElementById('phone').value.trim();

    let isValid = true;
    let errorMessage = '';

    if (!name) {
        errorMessage = 'Please enter your name';
        isValid = false;
    } else if (!rollNo) {
        errorMessage = 'Please enter your roll number';
        isValid = false;
    } else if (!phone) {
        errorMessage = 'Please enter your phone number';
        isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/.test(rollNo)) {
        errorMessage = 'Roll number must be alphanumeric (letters and numbers) and 6-12 characters long';
        isValid = false;
    }
    
    if (!isValid) {
        showNotification(errorMessage);
    }

    return isValid;
}

// Handle order submission
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const orderData = {
        name: document.getElementById('name').value.trim(),
        rollNo: document.getElementById('rollNo').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        items: Object.entries(cart.items).map(([id, item]) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        total: cart.total,
        orderTime: new Date().toISOString(),
        status: 'pending'
    };

    // Store order in localStorage
    const orders = JSON.parse(localStorage.getItem('collegeCanteenOrders') || '[]');
    orders.push(orderData);
    localStorage.setItem('collegeCanteenOrders', JSON.stringify(orders));

    // Show success message and reset
    showNotification('Order placed successfully! Your order will be ready soon.');
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
    clearCart();
});

// Handle offline/online status
window.addEventListener('online', () => {
    showNotification('You are back online!');
});

window.addEventListener('offline', () => {
    showNotification('You are offline. Some features may be limited.');
});

// Order History Management
function showOrderHistory() {
    const orderHistoryModal = document.getElementById('orderHistoryModal');
    const orderHistoryContent = document.getElementById('orderHistoryContent');
    const orders = JSON.parse(localStorage.getItem('collegeCanteenOrders') || '[]');

    orderHistoryContent.innerHTML = '';

    if (orders.length === 0) {
        orderHistoryContent.innerHTML = `
            <div class="no-orders">
                <p>No orders found.</p>
            </div>
        `;
        orderHistoryModal.style.display = 'block';
        return;
    }

    orders.reverse().forEach((order, index) => {
        const orderDate = new Date(order.orderTime).toLocaleString();
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        
        const itemsList = order.items.map(item => 
            `<div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${item.total}</span>
            </div>`
        ).join('');

        orderCard.innerHTML = `
            <h3>Order #${orders.length - index}</h3>
            <div class="order-details">
                <p>Date: ${orderDate}</p>
                <p>Name: ${order.name}</p>
                <p>Roll No: ${order.rollNo}</p>
            </div>
            <div class="order-items">
                ${itemsList}
            </div>
            <div class="order-total">
                Total: ₹${order.total}
            </div>
            <span class="order-status">${order.status}</span>
        `;
        
        orderHistoryContent.appendChild(orderCard);
    });

    orderHistoryModal.style.display = 'block';
}

// Initialize app functionality
document.addEventListener('DOMContentLoaded', () => {
    // Order History Button
    const myOrdersBtn = document.getElementById('myOrdersBtn');
    const orderHistoryModal = document.getElementById('orderHistoryModal');
    const closeOrderHistory = document.getElementById('closeOrderHistory');

    myOrdersBtn.addEventListener('click', showOrderHistory);

    closeOrderHistory.addEventListener('click', () => {
        orderHistoryModal.style.display = 'none';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === orderHistoryModal) {
            orderHistoryModal.style.display = 'none';
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    showNotification('Something went wrong. Please try again.');
    
    // Log error details for debugging
    const errorDetails = {
        message: e.error.message,
        stack: e.error.stack,
        timestamp: new Date().toISOString()
    };
    
    // Store error in localStorage for later analysis
    const errors = JSON.parse(localStorage.getItem('collegeCanteenErrors') || '[]');
    errors.push(errorDetails);
    localStorage.setItem('collegeCanteenErrors', JSON.stringify(errors));
});

// Enhanced form handling and validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const rollNo = document.getElementById('rollNo').value.trim();
    const phone = document.getElementById('phone').value.trim();

    let isValid = true;
    let errorMessage = '';

    // Name validation
    if (!name) {
        errorMessage = 'Please enter your name';
        isValid = false;
    } else if (name.length < 2) {
        errorMessage = 'Name must be at least 2 characters long';
        isValid = false;
    }

    // Roll number validation
    else if (!rollNo) {
        errorMessage = 'Please enter your roll number';
        isValid = false;
    } else if (!/^\d{6,12}$/.test(rollNo)) {
        errorMessage = 'Please enter a valid roll number (6-12 digits)';
        isValid = false;
    }

    // Phone validation
    else if (!phone) {
        errorMessage = 'Please enter your phone number';
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        errorMessage = 'Please enter a valid 10-digit phone number';
        isValid = false;
    }

    if (!isValid) {
        showNotification(errorMessage);
    }

    return isValid;
}

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Handle offline/online status with enhanced notifications
window.addEventListener('online', () => {
    showNotification('You are back online! All features are now available.');
    document.body.classList.remove('offline-mode');
});

window.addEventListener('offline', () => {
    showNotification('You are offline. Some features may be limited.');
    document.body.classList.add('offline-mode');
});

// Initialize offline status check
if (!navigator.onLine) {
    document.body.classList.add('offline-mode');
}
