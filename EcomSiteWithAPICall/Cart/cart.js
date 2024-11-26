document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartDiv = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');
    cartDiv.innerHTML = ''; // Clear previous cart items

    let total = 0;

    cartItems.forEach(item => {
        total += item.price;

        cartDiv.innerHTML += `
        <div class="col-12 col-md-6 mb-4">
            <div class="card">
                <img src="${item.images[0]}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">Price: $${item.price}</p>
                    <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>`;
    });

    cartTotal.innerText = total.toFixed(2);
}

function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart(); // Refresh the cart display
}
