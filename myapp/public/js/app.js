// Global variables
let cart = [];
let products = [];
let doctors = [];
let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    loadFeaturedProducts();
    loadFeaturedDoctors();
    updateCartCount();
    setupEventListeners();
});

// Authentication functions
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        currentUser = JSON.parse(user);
        updateUIForLoggedInUser();
    }
}

function updateUIForLoggedInUser() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.textContent = 'Logout';
        loginBtn.href = '#';
        loginBtn.addEventListener('click', logout);
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    window.location.href = 'index.html';
}

// Product functions
async function loadFeaturedProducts() {
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        displayFeaturedProducts(products.slice(0, 6));
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function displayFeaturedProducts(productsToShow) {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image || 'https://via.placeholder.com/300x250'}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <p class="product-description">${product.description ? product.description.substring(0, 100) + '...' : ''}</p>
                <button class="add-to-cart" onclick="addToCart('${product._id}')">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Doctor functions
async function loadFeaturedDoctors() {
    try {
        const response = await fetch('/api/doctors');
        doctors = await response.json();
        displayFeaturedDoctors(doctors.slice(0, 3));
    } catch (error) {
        console.error('Error loading doctors:', error);
    }
}

function displayFeaturedDoctors(doctorsToShow) {
    const container = document.getElementById('featured-doctors');
    if (!container) return;
    
    container.innerHTML = '';
    
    doctorsToShow.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        doctorCard.innerHTML = `
            <img src="${doctor.image || 'https://via.placeholder.com/300x250'}" alt="${doctor.name}" class="doctor-image">
            <div class="doctor-info">
                <h3 class="doctor-name">${doctor.name}</h3>
                <p class="doctor-specialization">${doctor.specialization}</p>
                <p class="doctor-experience">${doctor.experience} years</p>
                <button class="book-appointment" onclick="bookAppointment('${doctor._id}')">
                    <i class="fas fa-calendar-plus"></i> Book Appointment
                </button>
            </div>
        `;
        container.appendChild(doctorCard);
    });
}

// Add to cart function
async function addToCart(productId) {
    if (!currentUser) {
        alert('Please login to add items to cart');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                userId: currentUser.id || currentUser._id,
                productId: productId,
                quantity: 1
            })
        });
        
        if (response.ok) {
            alert('Product added to cart!');
            updateCartCount();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to add product to cart');
        }
    } catch (error) {
        alert('Error adding product to cart');
        console.error(error);
    }
}

// Update cart count in UI
async function updateCartCount() {
    if (!currentUser) {
        document.querySelector('.cart-count').textContent = '0';
        return;
    }
    
    try {
        const response = await fetch(`/api/cart/${currentUser.id || currentUser._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            const cart = await response.json();
            const count = cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
            document.querySelector('.cart-count').textContent = count;
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Setup event listeners for UI interactions
function setupEventListeners() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Book appointment function (placeholder)
function bookAppointment(doctorId) {
    if (!currentUser) {
        alert('Please login to book an appointment');
        window.location.href = 'login.html';
        return;
    }
    alert(`Booking appointment with doctor ID: ${doctorId} (functionality to be implemented)`);
}
