// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');



// Fetch product details using the product ID
fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        // Display product details
        document.getElementById('product-image').src = product.images[0];
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-descriptions').textContent = product.description;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('discount').textContent = product.discountPercentage;
        document.getElementById('brand').textContent = product.brand;
        document.getElementById('weight').textContent = product.weight;
        document.getElementById('width').textContent = product.dimensions.width;
        document.getElementById('height').textContent = product.dimensions.height;
        document.getElementById('depth').textContent = product.dimensions.depth;
        document.getElementById('warrantyInformation').textContent = product.warrantyInformation;
        document.getElementById('availabilityStatus').textContent = product.availabilityStatus;
         // Display rating stars
         displayStars(product.rating); // Add this line

        // Display product thumbnails
        const thumbnailsDiv = document.getElementById('thumbnails');
        product.images.forEach(image => {
            thumbnailsDiv.innerHTML += `<img src="${image}" class="img-thumbnail" style="width: 100px; margin-right: 10px;" onclick="changeMainImage('${image}')">`;
        });
    })
    .catch(error => console.error('Error fetching product details:', error));

// Change main product image on thumbnail click
function changeMainImage(imageUrl) {
    document.getElementById('product-image').src = imageUrl;
}

// Add to cart functionality
function addToCart() {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.title} has been added to your cart.`);
        })
        .catch(error => console.error('Error:', error));
}


//Display Stars 

function displayStars(rating) {
    const maxStars = 5;
    const starContainer = document.getElementById('star-rating');
    starContainer.innerHTML = ''; // Clear previous stars if any

    // Add full stars
    for (let i = 0; i < Math.floor(rating); i++) {
        const fullStar = document.createElement('span');
        fullStar.classList.add('full-star');
        starContainer.appendChild(fullStar);
    }

    // Add half star if rating has a decimal part
    if (rating % 1 !== 0) {
        const halfStar = document.createElement('span');
        halfStar.classList.add('half-star');
        starContainer.appendChild(halfStar);
    }

    // Add empty stars to make it 5 stars total
    for (let i = Math.ceil(rating); i < maxStars; i++) {
        const emptyStar = document.createElement('span');
        emptyStar.classList.add('empty-star');
        starContainer.appendChild(emptyStar);
    }
}


