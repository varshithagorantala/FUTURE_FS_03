/* =========================================
   VASTRA BOUTIQUE
   COMPLETE JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.textContent = "✕";
        menuToggle.setAttribute("aria-label", "Close navigation");
    } else {
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

});


/* Close mobile menu after clicking a link */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

    });

});


/* =========================================
   PRODUCT FILTERING
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";


function filterProducts() {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    let visibleProducts = 0;


    productCards.forEach(function (product) {

        const category = product.dataset.category;
        const name = product.dataset.name.toLowerCase();

        const categoryMatches =
            selectedCategory === "all" ||
            category === selectedCategory;

        const searchMatches =
            name.includes(searchText);


        if (categoryMatches && searchMatches) {

            product.style.display = "";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    if (visibleProducts === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* Category buttons */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterProducts();

    });

});


/* Search */

searchInput.addEventListener(
    "input",
    filterProducts
);


/* =========================================
   FAVORITES
========================================= */

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");


favoriteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        button.classList.toggle("favorited");

        if (button.classList.contains("favorited")) {

            button.textContent = "♥";

            showToast(
                "Added to your favorites!"
            );

        } else {

            button.textContent = "♡";

            showToast(
                "Removed from favorites."
            );

        }

    });

});


/* =========================================
   CART
========================================= */

let cart = [];


const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const cartModal =
    document.getElementById("cartModal");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");


/* Add product to cart */

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productName =
            button.dataset.product;


        cart.push(productName);


        updateCart();


        showToast(
            `${productName} added to your bag!`
        );

    });

});


/* Update cart */

function updateCart() {

    cartCount.textContent = cart.length;

    cartTotal.textContent = cart.length;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
            </p>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(function (productName, index) {

        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `
            <span class="cart-item-name">
                ${productName}
            </span>

            <button
                class="remove-cart-item"
                data-index="${index}"
            >
                Remove
            </button>
        `;


        cartItems.appendChild(item);

    });


    const removeButtons =
        document.querySelectorAll(
            ".remove-cart-item"
        );


    removeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(button.dataset.index);


                cart.splice(index, 1);


                updateCart();


                showToast(
                    "Item removed from your bag."
                );

            }
        );

    });

}


/* Open cart */

cartButton.addEventListener(
    "click",
    function () {

        cartModal.classList.add("show");

        document.body.style.overflow = "hidden";

    }
);


/* Close cart */

closeCart.addEventListener(
    "click",
    closeCartModal
);


/* Close modal by clicking outside */

cartModal.addEventListener(
    "click",
    function (event) {

        if (event.target === cartModal) {

            closeCartModal();

        }

    }
);


function closeCartModal() {

    cartModal.classList.remove("show");

    document.body.style.overflow = "";

}


/* =========================================
   TOAST MESSAGE
========================================= */

const toast =
    document.getElementById("toast");


let toastTimer;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "customerName"
            ).value.trim();


        const email =
            document.getElementById(
                "customerEmail"
            ).value.trim();


        const phone =
            document.getElementById(
                "customerPhone"
            ).value.trim();


        const message =
            document.getElementById(
                "customerMessage"
            ).value.trim();


        /* Basic validation */

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            message === ""
        ) {

            formMessage.textContent =
                "Please fill in all the fields.";

            formMessage.className =
                "form-message error";

            return;

        }


        /* Email validation */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            formMessage.className =
                "form-message error";

            return;

        }


        /* Phone validation */

        const phonePattern =
            /^[0-9+\-\s]{10,15}$/;


        if (!phonePattern.test(phone)) {

            formMessage.textContent =
                "Please enter a valid phone number.";

            formMessage.className =
                "form-message error";

            return;

        }


        /*
            This is a frontend demo form.

            It does not send data to a server yet.
            Instead, we show a successful enquiry message.
        */

        formMessage.textContent =
            `Thank you, ${name}! Your enquiry has been received. We will contact you soon.`;

        formMessage.className =
            "form-message success";


        showToast(
            "Enquiry submitted successfully!"
        );


        contactForm.reset();

    }
);


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }
);


backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   ESCAPE KEY
   Close modal / mobile menu
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCartModal();

            navLinks.classList.remove(
                "active"
            );

            menuToggle.textContent = "☰";

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

updateCart();

filterProducts();