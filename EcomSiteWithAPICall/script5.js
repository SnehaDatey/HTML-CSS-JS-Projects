let ProductDiv = document.getElementsByClassName("productBoxRow")[0];
var CategoryListDiv = document.getElementsByClassName("CategoryList")[0];
let allCat = [];

// Fetch and display products
let displayProductNew = async (allCheckCat = [], searchQuery = "", selectValue = "", page = 1, limit = 6) => {
    ProductDiv.innerHTML = ""; // Clear previous products
   
    var response = await fetch('https://dummyjson.com/products');
    var data = await response.json();
    var products = data.products;

    // Clear category list to prevent duplication
    if (CategoryListDiv.innerHTML === "") {
        products.forEach(product => {
            // Populate category list
            if (!allCat.includes(product.category)) {
                CategoryListDiv.innerHTML += `
                <div class="CategoryList">
                    <input class="form-check-input" onclick='categoryFilter()' type="checkbox" value="${product.category}" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                    ${product.category}
                    </label>
                </div>`;
                allCat.push(product.category);
            }
        });
    }

    // If no categories are selected, show all categories
    if (allCheckCat.length == 0) {
        allCheckCat = allCat;
    }

    // Filter products by category and search query
    products = products.filter(product =>
        allCheckCat.includes(product.category) && product.title.toLowerCase().includes(searchQuery)
    );


    // Sort products based on the selected value
    if (selectValue === "LowToHigh") {
        products.sort((a, b) => a.price - b.price);
    } else if (selectValue === "HighToLow") {
        products.sort((a, b) => b.price - a.price);
    }


    // Implement pagination by slicing the products array
    const start = (page - 1) * limit;
    const end = page * limit;
    const paginatedProducts = products.slice(start, end);

   // Display products
   paginatedProducts.forEach(product => {
    let productId = `product-${product.id}`;

     // Check if a product with this id already exists in the DOM
    if (!document.getElementById(productId)) {


    ProductDiv.innerHTML += `
    <div id="product-${product.id}" class="col-12 product-item">
         <a href="product.html?id=${product.id}"><img src="${product.images[0]}" alt="${product.title}"></a>
        <p>Price: $${product.price}</p>
        <p class="productTitle">${product.title}</p>
        <div class="btn-container">
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    </div>`;
    }
});

     // Display pagination controls
     displayPaginationControls(products.length, page, limit);
     
}

// Initial display of products
displayProductNew();

// Category Checkbox filter handler
let categoryFilter = () => {
    let searchQuery = document.getElementById("searchBar").value.toLowerCase();
    let selectValue = document.getElementById("selectSortItem").value;

    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkData = [];
    checkInput.forEach((e) => {
        if (e.checked) {
            checkData.push(e.value);
        }
    });

    displayProductNew(checkData, searchQuery, selectValue); // Pass category, search query, and SelectValue
}

// SearchBar filter handler
document.getElementById("searchBar").addEventListener("input", () => {
    let searchQuery = document.getElementById("searchBar").value.toLowerCase();
    let selectValue = document.getElementById("selectSortItem").value;

    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkData = [];
    checkInput.forEach((e) => {
        if (e.checked) {
            checkData.push(e.value);
        }
    });
    displayProductNew(checkData, searchQuery, selectValue); // Pass category, search query, and SelectValue
});

// Select Box - Sort Item by Price
document.getElementById("selectSortItem").addEventListener("change", () => {
    let selectValue = document.getElementById("selectSortItem").value;
    let searchQuery = document.getElementById("searchBar").value.toLowerCase();

    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkData = [];
    checkInput.forEach((e) => {
        if (e.checked) {
            checkData.push(e.value);
        }
    });
    displayProductNew(checkData, searchQuery, selectValue); // Pass category, search query, and SelectValue
});


/***********ADD TO CART************** */

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.title} has been added to your cart.`);
        })
        .catch(error => console.error('Error:', error));
}


/*********Display cart items on Notification bar*************** */
document.addEventListener("DOMContentLoaded", () => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cartItems.length;
    let cartCountBadge = document.getElementById('cart-count');

    if (cartCount > 0) {
        cartCountBadge.innerText = cartCount;
        cartCountBadge.style.display = 'inline'; // Ensure the badge is visible
    } else {
        cartCountBadge.style.display = 'none'; // Hide the badge if the cart is empty
    }
});



/******************************Pagination Controls********************************** */

function displayPaginationControls(totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationDiv = document.getElementById('pagination-controls');
    
    paginationDiv.innerHTML = ""; // Clear previous controls

    for (let i = 1; i <= totalPages; i++) {
        paginationDiv.innerHTML += `
            <button class="btn btn-primary ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>
        `;
    }
}

function changePage(page) {
    let searchQuery = document.getElementById("searchBar").value.toLowerCase();
    let selectValue = document.getElementById("selectSortItem").value;

    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkData = [];
    checkInput.forEach((e) => {
        if (e.checked) {
            checkData.push(e.value);
        }
    });

    displayProductNew(checkData, searchQuery, selectValue, page);
}
