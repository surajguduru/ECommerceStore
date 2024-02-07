const productParent = document.getElementById('products');
const allProducts = document.querySelectorAll('.product');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const cartIcon = document.querySelector('.cart-container');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart');
let bill = document.getElementById('cart-total');
let totalBill = 0;

// Cart functionality
let cartList = loadCartData();

function addToCart(productName) {
    const existingItem = cartList.find(item => item.name === productName);

    if (existingItem) {
        // do nothing
    } else {
        const product = allProductsArray.find(product => product.querySelector('h3').innerText === productName);
        const productImage = product.querySelector('img').src;
        const productInfo = {
            name: productName,
            productImage,
            price: parseFloat(product.querySelector('p').innerText.slice(1)),
            quantity: 1
        };
        cartList.push(productInfo);
    }

    updateCart();
    saveCartData();
}

function deleteCartItem(productName) {
    cartList = cartList.filter(item => item.name !== productName);
    updateCart();
    saveCartData();
}

function increaseQuantity(productName) {
    const item = cartList.find(item => item.name === productName);
    if (item) {
        item.quantity++;
        updateCart();
        saveCartData();
    }
}

function decreaseQuantity(productName) {
    const item = cartList.find(item => item.name === productName);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
        saveCartData();
    } else if (item.quantity === 1) {
        deleteCartItem(productName);
    }
}

function updateCart() {
    cartItems.innerHTML = '';

    cartList.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <div class="cart-item" style="display: flex; align-items: center;">
                <div style="flex: 1; margin-right: 1.5rem;">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="cart-img">
                    <img src="${item.productImage}" alt="${item.name}" style="width: 100px; height: 100px;">
                </div>
                <div class="cart-item-buttons">
                    <button class="quantity-btn" onclick="decreaseQuantity('${item.name}')">-</button>
                    <button class="quantity-btn" onclick="increaseQuantity('${item.name}')">+</button>
                    <button class="delete-btn" onclick="deleteCartItem('${item.name}')">Delete</button>
                </div>
            </div>
        `;
        totalBill = cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);

        bill.innerHTML = `${totalBill.toFixed(2)}`;
        cartItem.style.display = 'flex';
        cartItem.classList.add('cart-item');
        cartItem.style.border = '1px solid #000';
        cartItem.style.width = '23rem';
        cartItem.style.borderRadius = '1rem';
        cartItem.style.padding = '1rem';
        cartItem.style.marginBottom = '1rem';
        cartItem.style.boxShadow = '1px 2px 10px rgba(0, 0, 0, 0.1)';
        cartItems.appendChild(cartItem);
    });
}

checkoutBtn.addEventListener('click', function () {
    totalBill = cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
    alert(`Total bill: $${totalBill.toFixed(2)}`);
});

cartIcon.addEventListener('click', function () {
    if (cart.style.display === 'none') {
        cart.style.display = 'flex';
    } else {
        cart.style.display = 'none';
    }
});

closeCart.addEventListener('click', function () {
    cart.style.display = 'none';
});

// Assuming you have an array of all products for easy access
const allProductsArray = Array.from(allProducts);

// Attach event listeners to the "Add to Cart" buttons
allProductsArray.forEach(product => {
    const addToCartBtn = product.querySelector('.add-to-cart-btn');
    const productName = product.querySelector('h3').innerText;

    addToCartBtn.addEventListener('click', () => {
        addToCart(productName);
    });
});

clearCartBtn.addEventListener('click', function () {
    cartList = [];
    updateCart();
    saveCartData();
});

function loadCartData() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
}

function saveCartData() {
    localStorage.setItem('cart', JSON.stringify(cartList));
}

// On page load, load the cart data
document.addEventListener('DOMContentLoaded', function () {
    updateCart();
});
