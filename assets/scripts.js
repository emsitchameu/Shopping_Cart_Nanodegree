const products = [
  { id: 1, name: "Smart Wi-Fi Light Bulbs", price: 20 },
  { id: 2, name: "Organic Facial Serums", price: 35 },
  { id: 3, name: "Adjustable Dumbbell Set", price: 50 },
  { id: 4, name: "Air Fryer Oven", price: 80 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
  const product = cart.find((item) => item.id === id);
  if (product) {
    product.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart`);
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    cartItems.innerHTML += `
            <div>
                ${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
  });
  totalPrice.innerText = total.toFixed(2);
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  window.location.href = "checkout.html";
}

function displayCheckoutTotal() {
  const totalCheckoutPrice = document.getElementById("total-checkout-price");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalCheckoutPrice.innerText = total.toFixed(2);
}

function completeCheckout() {
  const cashReceived = parseFloat(
    document.getElementById("cash-received").value
  );
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cashReceived >= total) {
    const change = cashReceived - total;
    alert(`Transaction complete. Change: $${change.toFixed(2)}`);
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "thankyou.html";
  } else {
    alert(
      `Insufficient cash. Amount still owed: $${(total - cashReceived).toFixed(
        2
      )}`
    );
  }
}

// Initialize cart display on cart and checkout pages
if (window.location.pathname.includes("cart.html")) {
  displayCart();
} else if (window.location.pathname.includes("checkout.html")) {
  displayCheckoutTotal();
}
