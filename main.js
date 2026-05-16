// ==========================
// MOBILE MENU
// ==========================

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", (e) => {

    e.preventDefault();
    e.stopPropagation();

    mobileMenu.classList.toggle("mobile-menu-active");
});

// Prevent menu click closing
mobileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Close mobile menu when clicking outside
document.addEventListener("click", () => {

    mobileMenu.classList.remove("mobile-menu-active");
});

// ==========================
// CART OPEN / CLOSE
// ==========================

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");

// Open cart
cartIcon.addEventListener("click", (e) => {

    e.preventDefault();
    e.stopPropagation();

    cartTab.classList.add("cart-tab-active");
});

// Prevent clicks inside cart from closing
cartTab.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Close cart button
closeBtn.addEventListener("click", (e) => {

    e.preventDefault();

    cartTab.classList.remove("cart-tab-active");
});

// Close cart when clicking outside
document.addEventListener("click", () => {

    cartTab.classList.remove("cart-tab-active");
});

// ==========================
// PRODUCT DATA
// ==========================

const products = [
    {
        id: 1,
        name: "Double Beef Burger",
        price: 9.67,
        image: "image/burger.png"
    },
    {
        id: 2,
        name: "Veggie Pizza",
        price: 10.99,
        image: "image/pizza.png"
    },
    {
        id: 3,
        name: "Fried Chicken",
        price: 13.45,
        image: "image/fried-chicken.png"
    },
    {
        id: 4,
        name: "Chicken Roll",
        price: 7.50,
        image: "image/chicken-roll.png"
    },
    {
        id: 5,
        name: "Sub Sandwich",
        price: 6.99,
        image: "image/sandwich.png"
    },
    {
        id: 6,
        name: "Chicken Lasagna",
        price: 16.45,
        image: "image/lasagna.png"
    },
    {
        id: 7,
        name: "Italian Spaghetti",
        price: 7.65,
        image: "image/spaghetti.png"
    },
    {
        id: 8,
        name: "Spring Roll",
        price: 9.31,
        image: "image/spring-roll.png"
    }
];

// ==========================
// CART LOGIC
// ==========================

let cart = [];

const addButtons = document.querySelectorAll(".order-card .btn");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");

// Add To Cart
addButtons.forEach((button, index) => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        const product = products[index];

        const existingItem = cart.find(
            item => item.id === product.id
        );

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();

        // Auto open cart
        cartTab.classList.add("cart-tab-active");
    });
});

// ==========================
// UPDATE CART
// ==========================

function updateCart() {

    cartList.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cart.forEach((item) => {

        total += item.price * item.quantity;

        totalItems += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.classList.add("item");

        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="item-info">
                <h4>${item.name}</h4>

                <h4 class="item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </h4>
            </div>

            <div class="flex align-center">

                <a href="#" 
                   class="quality-btn minus" 
                   data-id="${item.id}">
                    <i class="fa-solid fa-minus"></i>
                </a>

                <h4 class="quality-value">
                    ${item.quantity}
                </h4>

                <a href="#" 
                   class="quality-btn plus" 
                   data-id="${item.id}">
                    <i class="fa-solid fa-plus"></i>
                </a>

            </div>
        `;

        cartList.appendChild(cartItem);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;

    cartValue.textContent = totalItems;
}

// ==========================
// QUANTITY BUTTONS
// ==========================

cartList.addEventListener("click", (e) => {

    e.stopPropagation();

    const plusBtn = e.target.closest(".plus");
    const minusBtn = e.target.closest(".minus");

    // PLUS
    if (plusBtn) {

        e.preventDefault();

        const id = Number(plusBtn.dataset.id);

        const item = cart.find(
            product => product.id === id
        );

        if (item) {

            item.quantity++;

            updateCart();
        }
    }

    // MINUS
    if (minusBtn) {

        e.preventDefault();

        const id = Number(minusBtn.dataset.id);

        const item = cart.find(
            product => product.id === id
        );

        if (item) {

            item.quantity--;

            if (item.quantity <= 0) {

                cart = cart.filter(
                    product => product.id !== id
                );
            }

            updateCart();
        }
    }
});

// ==========================
// SWIPER
// ==========================

const swiper = new Swiper(".mySwiper", {

    loop: true,

    spaceBetween: 30,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// ==========================
// LOGIN MODAL
// ==========================

const signInBtn = document.querySelector(".signin-btn");
const loginModal = document.querySelector(".login-modal");
const closeLogin = document.querySelector(".close-login");

// Open login modal
signInBtn.addEventListener("click", (e) => {

    e.preventDefault();

    loginModal.classList.add("login-modal-active");
});

// Close button
closeLogin.addEventListener("click", (e) => {

    e.preventDefault();

    loginModal.classList.remove("login-modal-active");
});

// Close when clicking outside
loginModal.addEventListener("click", (e) => {

    if (e.target === loginModal) {

        loginModal.classList.remove("login-modal-active");
    }
});


