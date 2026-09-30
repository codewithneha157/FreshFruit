// ================= CART STORAGE =================

let cart = JSON.parse(localStorage.getItem("freshFruitCart")) || [];

console.log("Current cart:", cart);


// ================= ADD TO CART =================

const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".product-card");

        const id = productCard.getAttribute("data-id");
        const name = productCard.getAttribute("data-name");
        const price = Number(productCard.getAttribute("data-price"));
        const image = productCard.getAttribute("data-image");


        const existingProduct = cart.find(function (item) {

            return item.id == id;

        });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1

            });

        }


        console.log("Cart:", cart);


        localStorage.setItem(
            "freshFruitCart",
            JSON.stringify(cart)
        );


        alert(name + " added to cart!");


        updateCartCount();

    });

});


// ================= UPDATE CART COUNT =================

function updateCartCount() {

    const cartCountElement =
        document.getElementById("cart-count");


    if (cartCountElement) {

        let totalItems = 0;


        cart.forEach(function (item) {

            totalItems += item.quantity;

        });


        cartCountElement.textContent = totalItems;

    }

}


updateCartCount();


// ================= DISPLAY CART =================

const cartItemsElement =
    document.getElementById("cart-items");


if (cartItemsElement) {


    // ================= EMPTY CART =================

    if (cart.length === 0) {

        cartItemsElement.innerHTML = `

            <div class="text-center py-5">

                <i class="bi bi-cart-x text-success"
                   style="font-size: 60px;"></i>

                <h3 class="mt-3 fw-bold">
    Your cart is empty
</h3>

<p class="text-muted mb-4">
    Add some fresh fruits to your cart.
</p>

                <a href="index.html"
                   class="btn btn-success rounded-pill px-4">
                    Continue Shopping
                </a>

            </div>

        `;

    }


    // ================= SHOW PRODUCTS =================

    cart.forEach(function (item) {

        const cartProduct =
            document.createElement("div");


        cartProduct.className =
            "card mb-3";


        // ================= NEW CART LAYOUT =================

        cartProduct.innerHTML = `

            <div class="card-body">

                <div class="row align-items-center">


                    <!-- Product Image -->

                    <div class="col-md-2 text-center">

                        <img src="${item.image}"
                             alt="${item.name}"
                             class="img-fluid rounded"
                             style="width: 100px; height: 100px; object-fit: cover;">

                    </div>


                    <!-- Product Name -->

                    <div class="col-md-3">

                        <h5 class="fw-bold mb-1">

                            ${item.name}

                        </h5>

                        <p class="text-muted mb-0">

                            ₹${item.price}

                        </p>

                    </div>


                    <!-- Quantity -->

                    <div class="col-md-3">

                        <div class="d-flex align-items-center gap-2">

                            <button
                                class="btn btn-outline-success btn-sm decrease-quantity"
                                data-id="${item.id}">

                                −

                            </button>


                            <span class="fw-bold">

                                ${item.quantity}

                            </span>


                            <button
                                class="btn btn-outline-success btn-sm increase-quantity"
                                data-id="${item.id}">

                                +

                            </button>

                        </div>

                    </div>


                    <!-- Item Total + Remove -->

                    <div class="col-md-4 text-md-end">

                        <h5 class="fw-bold">

                            ₹${item.price * item.quantity}

                        </h5>


                        <button
                            class="btn btn-danger btn-sm mt-2 remove-product"
                            data-id="${item.id}">

                            <i class="bi bi-trash"></i>

                            Remove

                        </button>

                    </div>


                </div>

            </div>

        `;


        cartItemsElement.appendChild(cartProduct);

    });


    // ================= CART TOTAL =================

    let total = 0;


    cart.forEach(function (item) {

        total += item.price * item.quantity;

    });


    if (cart.length > 0) {

        const totalBox =
            document.createElement("div");


        totalBox.className =
            "text-end mt-4";


        totalBox.innerHTML = `

            <h4 class="fw-bold mb-3">

                Total: ₹${total}

            </h4>


           <a href="checkout.html"
   class="btn btn-success rounded-pill px-4">

    <i class="bi bi-credit-card"></i>

    Checkout

</a>

        `;


        cartItemsElement.appendChild(totalBox);

    }

}


// ================= INCREASE QUANTITY =================

const increaseButtons =
    document.querySelectorAll(".increase-quantity");


increaseButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id =
            button.getAttribute("data-id");


        const product =
            cart.find(function (item) {

                return item.id == id;

            });


        if (product) {

            product.quantity++;


            localStorage.setItem(
                "freshFruitCart",
                JSON.stringify(cart)
            );


            location.reload();

        }

    });

});


// ================= DECREASE QUANTITY =================

const decreaseButtons =
    document.querySelectorAll(".decrease-quantity");


decreaseButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id =
            button.getAttribute("data-id");


        const product =
            cart.find(function (item) {

                return item.id == id;

            });


        if (product && product.quantity > 1) {

            product.quantity--;


            localStorage.setItem(
                "freshFruitCart",
                JSON.stringify(cart)
            );


            location.reload();

        }

    });

});


// ================= REMOVE PRODUCT =================

const removeButtons =
    document.querySelectorAll(".remove-product");


removeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id =
            button.getAttribute("data-id");


        cart = cart.filter(function (item) {

            return item.id != id;

        });


        localStorage.setItem(
            "freshFruitCart",
            JSON.stringify(cart)
        );


        location.reload();

    });

});


// ================= CHECKOUT =================

const checkoutButton =
    document.getElementById("checkout-btn");


if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        alert("Thank you for your order!");

    });

}

// ================= CART PAGE COUNT =================

const cartPageCount = document.getElementById("cart-page-count");

if (cartPageCount) {

    let pageTotalItems = 0;

    cart.forEach(function(item) {
        pageTotalItems += item.quantity;
    });

    cartPageCount.textContent =
    pageTotalItems + (pageTotalItems === 1 ? " item" : " items");

}

// ================= CLEAR CART =================

const clearCartButton = document.getElementById("clear-cart-btn");

if (clearCartButton) {

    clearCartButton.addEventListener("click", function() {

        cart = [];

        localStorage.setItem(
            "freshFruitCart",
            JSON.stringify(cart)
        );

        location.reload();

    });

}

// ================= PRODUCT DETAILS =================

const viewDetailsButtons =
    document.querySelectorAll(".view-details");

const productDetailsModal =
    document.getElementById("productDetailsModal");


if (viewDetailsButtons.length > 0 && productDetailsModal) {

    const detailsImage =
        document.getElementById("details-image");

    const detailsName =
        document.getElementById("details-name");

    const detailsCategory =
        document.getElementById("details-category");

    const detailsPrice =
        document.getElementById("details-price");

    const detailsDescription =
        document.getElementById("details-description");

    const detailsAddCart =
        document.getElementById("details-add-cart");


    viewDetailsButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const productCard =
                button.closest(".product-card");


            const id =
                productCard.getAttribute("data-id");

            const name =
                productCard.getAttribute("data-name");

            const price =
                Number(productCard.getAttribute("data-price"));

            const image =
                productCard.getAttribute("data-image");

            const description =
                productCard.getAttribute("data-description");

            const category =
                productCard.getAttribute("data-category");


            detailsImage.src = image;

            detailsName.textContent = name;

            detailsCategory.textContent =
                category;

            detailsPrice.textContent =
                "₹" + price;

            detailsDescription.textContent =
                description;


            detailsAddCart.onclick = function() {

                const existingProduct =
                    cart.find(function(item) {

                        return item.id == id;

                    });


                if (existingProduct) {

                    existingProduct.quantity++;

                } else {

                    cart.push({

                        id: id,
                        name: name,
                        price: price,
                        image: image,
                        quantity: 1

                    });

                }


                localStorage.setItem(
                    "freshFruitCart",
                    JSON.stringify(cart)
                );


                updateCartCount();


                alert(name + " added to cart!");

            };


            const modal =
                new bootstrap.Modal(productDetailsModal);

            modal.show();

        });

    });

}

// ================= SEARCH & FILTER =================

const fruitSearch =
    document.getElementById("fruit-search");

const categoryFilter =
    document.getElementById("category-filter");

const productCards =
    document.querySelectorAll(".product-card");

const noResults =
    document.getElementById("no-results");


function filterProducts() {

    const searchText =
        fruitSearch ? fruitSearch.value.toLowerCase().trim() : "";

    const selectedCategory =
        categoryFilter
            ? categoryFilter.value.toLowerCase()
            : "all";


    let visibleProducts = 0;


    productCards.forEach(function(card) {

        const productName =
            card.getAttribute("data-name").toLowerCase();

        const productCategory =
            card.getAttribute("data-category").toLowerCase();


        const matchesSearch =
            productName.includes(searchText);


        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;


        const productColumn =
            card.closest(".col-sm-6");


        if (matchesSearch && matchesCategory) {

            productColumn.style.display = "";

            visibleProducts++;

        } else {

            productColumn.style.display = "none";

        }

    });


    if (noResults) {

        if (visibleProducts === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }

}


if (fruitSearch) {

    fruitSearch.addEventListener(
        "input",
        filterProducts
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}

// ================= FAVORITES / WISHLIST =================

let favorites =
    JSON.parse(localStorage.getItem("freshFruitFavorites")) || [];


// ================= UPDATE FAVORITE COUNT =================

function updateFavoriteCount() {

    const favoriteCount =
        document.getElementById("favorite-count");

    if (favoriteCount) {

        favoriteCount.textContent =
            favorites.length;

    }

}


// ================= UPDATE FAVORITE BUTTONS =================

function updateFavoriteButtons() {

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");


    favoriteButtons.forEach(function(button) {

        const id =
            button.getAttribute("data-id");

        const icon =
            button.querySelector("i");


        if (favorites.includes(id)) {

            icon.className = "bi bi-heart-fill";

            button.classList.remove(
                "btn-outline-danger"
            );

            button.classList.add(
                "btn-danger"
            );

            button.setAttribute(
                "title",
                "Remove from Favorites"
            );

        } else {

            icon.className = "bi bi-heart";

            button.classList.remove(
                "btn-danger"
            );

            button.classList.add(
                "btn-outline-danger"
            );

            button.setAttribute(
                "title",
                "Add to Favorites"
            );

        }

    });

}


// ================= FAVORITE BUTTON CLICK =================

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");


favoriteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const id =
            button.getAttribute("data-id");


        if (favorites.includes(id)) {

            favorites =
                favorites.filter(function(item) {

                    return item !== id;

                });

        } else {

            favorites.push(id);

        }


        localStorage.setItem(
            "freshFruitFavorites",
            JSON.stringify(favorites)
        );


        updateFavoriteCount();

        updateFavoriteButtons();

    });

});


updateFavoriteCount();

updateFavoriteButtons();


// ================= FAVORITES PAGE =================

const favoriteItemsElement =
    document.getElementById("favorite-items");


if (favoriteItemsElement) {

    // ================= EMPTY FAVORITES =================

    if (favorites.length === 0) {

        favoriteItemsElement.innerHTML = `

            <div class="col-12">

                <div class="text-center py-5">

                    <i class="bi bi-heart text-danger"
                       style="font-size: 60px;"></i>

                    <h3 class="mt-3 fw-bold">

                        No Favorite Fruits

                    </h3>

                    <p class="text-muted mb-4">

                        You have not added any fruits to your favorites yet.

                    </p>

                    <a href="index.html"
                       class="btn btn-success rounded-pill px-4">

                        <i class="bi bi-shop"></i>

                        Browse Fruits

                    </a>

                </div>

            </div>

        `;

    }


    // ================= SHOW FAVORITES =================

    else {

        const favoriteProducts = {

            "1": {
                id: "1",
                name: "Fresh Apple",
                price: 120,
                image: "images/apple.png"
            },

            "2": {
                id: "2",
                name: "Fresh Banana",
                price: 60,
                image: "images/banana.png"
            },

            "3": {
                id: "3",
                name: "Alphonso Mango",
                price: 180,
                image: "images/mango.png"
            },

            "4": {
                id: "4",
                name: "Fresh Orange",
                price: 100,
                image: "images/orange.png"
            },

            "5": {
                id: "5",
                name: "Strawberry",
                price: 250,
                image: "images/strawberry.png"
            },

            "6": {
                id: "6",
                name: "Watermelon",
                price: 50,
                image: "images/watermelon.png"
            }

        };


        favorites.forEach(function(id) {

            const product =
                favoriteProducts[id];


            if (!product) {
                return;
            }


            // Create card

            const favoriteCard =
                document.createElement("div");


            favoriteCard.className =
                "col-md-6 col-lg-4";


            favoriteCard.innerHTML = `

                <div class="card favorite-product-card h-100 border-0">

                    <img src="${product.image}"
                         class="card-img-top favorite-image"
                         alt="${product.name}">


                    <div class="card-body text-center">

                        <h5 class="fw-bold">

                            ${product.name}

                        </h5>


                        <h5 class="text-success fw-bold mb-3">

                            ₹${product.price}

                        </h5>


                        <div class="d-flex justify-content-center gap-2">

                            <button
                                class="btn btn-success rounded-pill add-favorite-cart"
                                data-id="${product.id}">

                                <i class="bi bi-cart-plus"></i>

                                Add to Cart

                            </button>


                            <button
                                class="btn btn-outline-danger rounded-circle remove-favorite"
                                data-id="${product.id}"
                                title="Remove from Favorites">

                                <i class="bi bi-heart-fill"></i>

                            </button>

                        </div>

                    </div>

                </div>

            `;


            favoriteItemsElement.appendChild(
                favoriteCard
            );

        });


        // ================= ADD TO CART =================

        const favoriteCartButtons =
            document.querySelectorAll(
                ".add-favorite-cart"
            );


        favoriteCartButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        button.getAttribute("data-id");


                    const product =
                        favoriteProducts[id];


                    if (!product) {
                        return;
                    }


                    const existingProduct =
                        cart.find(function(item) {

                            return item.id == id;

                        });


                    if (existingProduct) {

                        existingProduct.quantity++;

                    } else {

                        cart.push({

                            id: product.id,

                            name: product.name,

                            price: product.price,

                            image: product.image,

                            quantity: 1

                        });

                    }


                    localStorage.setItem(
                        "freshFruitCart",
                        JSON.stringify(cart)
                    );


                    updateCartCount();


                    alert(
                        product.name +
                        " added to cart!"
                    );

                }
            );

        });


        // ================= REMOVE FAVORITE =================

        const removeFavoriteButtons =
            document.querySelectorAll(
                ".remove-favorite"
            );


        removeFavoriteButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        button.getAttribute("data-id");


                    favorites =
                        favorites.filter(
                            function(item) {

                                return item !== id;

                            }
                        );


                    localStorage.setItem(
                        "freshFruitFavorites",
                        JSON.stringify(favorites)
                    );


                    location.reload();

                }
            );

        });

    }

}


// ================= FAVORITES PAGE COUNT =================

const favoritePageCount =
    document.getElementById(
        "favorite-page-count"
    );


if (favoritePageCount) {

    favoritePageCount.textContent =
        favorites.length;

}


// ================= CLEAR ALL FAVORITES =================

const clearFavoritesButton =
    document.getElementById("clear-favorites");

if (clearFavoritesButton) {

    clearFavoritesButton.addEventListener("click", function () {

        favorites = [];

        localStorage.setItem(
            "freshFruitFavorites",
            JSON.stringify(favorites)
        );

        location.reload();

    });

}

// ================= CHECKOUT PAGE =================

const checkoutItemsElement =
    document.getElementById("checkout-items");

if (checkoutItemsElement) {

    if (cart.length === 0) {

        checkoutItemsElement.innerHTML = `

            <div class="text-center py-4">

                <i class="bi bi-cart-x text-muted"
                   style="font-size: 45px;"></i>

                <p class="text-muted mt-3 mb-0">

                    Your cart is empty.

                </p>

                <a href="index.html"
                   class="btn btn-success rounded-pill mt-3">

                    Browse Fruits

                </a>

            </div>

        `;

    } else {

        let subtotal = 0;

        cart.forEach(function(item) {

            const itemTotal =
                item.price * item.quantity;

            subtotal += itemTotal;

            const checkoutItem =
                document.createElement("div");

            checkoutItem.className =
                "checkout-item d-flex justify-content-between align-items-center mb-3";

            checkoutItem.innerHTML = `

                <div class="d-flex align-items-center">

                    <img src="${item.image}"
                         alt="${item.name}"
                         class="checkout-item-image">

                    <div class="ms-3">

                        <h6 class="fw-bold mb-1">

                            ${item.name}

                        </h6>

                        <small class="text-muted">

                            ₹${item.price} × ${item.quantity}

                        </small>

                    </div>

                </div>

                <strong>

                    ₹${itemTotal}

                </strong>

            `;

            checkoutItemsElement.appendChild(
                checkoutItem
            );

        });

        document.getElementById(
            "checkout-subtotal"
        ).textContent = subtotal;

        document.getElementById(
            "checkout-total"
        ).textContent = subtotal;

    }
}


// ================= PLACE ORDER =================

const checkoutForm =
    document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;
            }

            const customerName =
                document.getElementById(
                    "customer-name"
                ).value;

            const paymentMethod =
                document.getElementById(
                    "payment-method"
                ).value;


            // ================= SAVE ORDER =================

            const customerMobile =
                document.getElementById(
                    "customer-mobile"
                ).value;

            const customerAddress =
                document.getElementById(
                    "customer-address"
                ).value;

            const customerCity =
                document.getElementById(
                    "customer-city"
                ).value;


            let orderTotal = 0;

            cart.forEach(function(item) {

                orderTotal +=
                    item.price * item.quantity;

            });


            const newOrder = {

                orderId:
                    "FF" +
                    Date.now(),

                date:
                    new Date().toLocaleString(),

                    status: "Order Placed",

                customerName:
                    customerName,

                mobile:
                    customerMobile,

                address:
                    customerAddress,

                city:
                    customerCity,

                paymentMethod:
                    paymentMethod,

                items:
                    cart,

                total:
                    orderTotal

            };


            let orders =
                JSON.parse(
                    localStorage.getItem(
                        "freshFruitOrders"
                    )
                ) || [];


            orders.unshift(newOrder);


            localStorage.setItem(
                "freshFruitOrders",
                JSON.stringify(orders)
            );


            alert(
                "Order placed successfully!\n\n" +
                "Order ID: " +
                newOrder.orderId
            );


            window.location.href =
                "orders.html";

        }
    );

}

// ================= ORDER HISTORY =================

let orders =
    JSON.parse(
        localStorage.getItem(
            "freshFruitOrders"
        )
    ) || [];


const ordersList =
    document.getElementById(
        "orders-list"
    );


if (ordersList) {

    // ================= EMPTY ORDERS =================

    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="text-center py-5">

                <i class="bi bi-receipt text-muted"
                   style="font-size: 60px;"></i>

                <h3 class="mt-3 fw-bold">

                    No Orders Yet

                </h3>

                <p class="text-muted mb-4">

                    You have not placed any orders yet.

                </p>

                <a href="index.html"
                   class="btn btn-success rounded-pill px-4">

                    <i class="bi bi-shop"></i>

                    Start Shopping

                </a>

            </div>

        `;

    } else {

        // ================= DISPLAY ORDERS =================

        orders.forEach(function(order) {

            const orderCard =
                document.createElement("div");

            orderCard.className =
                "card order-card border-0 mb-4";

            let itemsHTML = "";

            order.items.forEach(
                function(item) {

                    itemsHTML += `

                        <div class="d-flex
                                    justify-content-between
                                    align-items-center
                                    mb-3">

                            <div class="d-flex
                                        align-items-center">

                                <img
                                    src="${item.image}"
                                    alt="${item.name}"
                                    class="order-item-image">

                                <div class="ms-3">

                                    <h6 class="fw-bold mb-1">

                                        ${item.name}

                                    </h6>

                                    <small class="text-muted">

                                        ₹${item.price}
                                        ×
                                        ${item.quantity}

                                    </small>

                                </div>

                            </div>

                            <strong>

                                ₹${item.price * item.quantity}

                            </strong>

                        </div>

                    `;
                }
            );


            orderCard.innerHTML = `

                <div class="card-body p-4">

                    <div class="d-flex
                                justify-content-between
                                align-items-start
                                mb-3">

                        <div>

                            <h5 class="fw-bold mb-1">

                                Order #${order.orderId}

                            </h5>

                            <small class="text-muted">

                                ${order.date}

                            </small>

                        </div>

                      <div class="text-end">

    <span class="badge bg-success mb-2">

        ${order.status || "Order Placed"}

    </span>

    <br>

    <select class="form-select form-select-sm order-status-select"
            data-order-id="${order.orderId}"
            style="width: 180px; display: inline-block;">

        <option value="Order Placed"
            ${order.status === "Order Placed" ? "selected" : ""}>
            Order Placed
        </option>

        <option value="Processing"
            ${order.status === "Processing" ? "selected" : ""}>
            Processing
        </option>

        <option value="Out for Delivery"
            ${order.status === "Out for Delivery" ? "selected" : ""}>
            Out for Delivery
        </option>

        <option value="Delivered"
            ${order.status === "Delivered" ? "selected" : ""}>
            Delivered
        </option>

    </select>

</div>

                    </div>

                    <!-- ================= ORDER TRACKING ================= -->

<div class="order-tracking mb-4">

    <div class="tracking-step active">

        <div class="tracking-icon">

            <i class="bi bi-check-circle-fill"></i>

        </div>

        <div class="tracking-text">

            <strong>Order Placed</strong>

            <small>
                Your order has been placed.
            </small>

        </div>

    </div>


    <div class="tracking-line"></div>


    <div class="tracking-step">

        <div class="tracking-icon">

            <i class="bi bi-box-seam"></i>

        </div>

        <div class="tracking-text">

            <strong>Processing</strong>

            <small>
                Your order is being prepared.
            </small>

        </div>

    </div>


    <div class="tracking-line"></div>


    <div class="tracking-step">

        <div class="tracking-icon">

            <i class="bi bi-truck"></i>

        </div>

        <div class="tracking-text">

            <strong>Out for Delivery</strong>

            <small>
                Your order is on the way.
            </small>

        </div>

    </div>


    <div class="tracking-line"></div>


    <div class="tracking-step">

        <div class="tracking-icon">

            <i class="bi bi-house-check"></i>

        </div>

        <div class="tracking-text">

            <strong>Delivered</strong>

            <small>
                Your order has been delivered.
            </small>

        </div>

    </div>

</div>

                    <hr>


                    <h6 class="fw-bold mb-3">

                        Ordered Items

                    </h6>


                    ${itemsHTML}


                    <hr>


                    <div class="row">

                        <div class="col-md-7">

                            <h6 class="fw-bold">

                                Delivery Details

                            </h6>

                            <p class="mb-1">

                                ${order.customerName}

                            </p>

                            <p class="mb-1 text-muted">

                                ${order.mobile}

                            </p>

                            <p class="mb-1 text-muted">

                                ${order.address},
                                ${order.city}

                            </p>

                            <p class="mb-0">

                                <strong>
                                    Payment:
                                </strong>

                                ${order.paymentMethod}

                            </p>

                        </div>


                        <div class="col-md-5 text-md-end mt-3 mt-md-0">

                            <p class="mb-1 text-muted">

                                Total Amount

                            </p>

                            <h4 class="fw-bold text-success">

                                ₹${order.total}

                            </h4>

                        </div>

                    </div>

                </div>

            `;


            ordersList.appendChild(
                orderCard
            );

        });

    }
}


// ================= CLEAR ORDER HISTORY =================

const clearOrdersButton =
    document.getElementById(
        "clear-orders-btn"
    );


if (clearOrdersButton) {

    clearOrdersButton.addEventListener(
        "click",
        function() {

            if (orders.length === 0) {

                return;

            }


            const confirmClear =
                confirm(
                    "Are you sure you want to clear your order history?"
                );


            if (!confirmClear) {

                return;

            }


            orders = [];


            localStorage.setItem(
                "freshFruitOrders",
                JSON.stringify(orders)
            );


            location.reload();

        }
    );

}

// ================= CHANGE ORDER STATUS =================

const statusSelects =
    document.querySelectorAll(
        ".order-status-select"
    );

statusSelects.forEach(function(select) {

    select.addEventListener(
        "change",
        function() {

            const orderId =
                select.getAttribute(
                    "data-order-id"
                );

            const newStatus =
                select.value;


            let savedOrders =
                JSON.parse(
                    localStorage.getItem(
                        "freshFruitOrders"
                    )
                ) || [];


            savedOrders.forEach(
                function(order) {

                    if (
                        order.orderId === orderId
                    ) {

                        order.status =
                            newStatus;

                    }

                }
            );


            localStorage.setItem(
                "freshFruitOrders",
                JSON.stringify(
                    savedOrders
                )
            );


            location.reload();

        }
    );

});