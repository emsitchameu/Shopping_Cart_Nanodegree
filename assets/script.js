// Create an array named products which you will use to add all of your product object literals that you create in the next step.
const products = [
  // Create 3 or more product objects using object literal notation
  // Each product should include five properties
  {
    name: "Carton of Cherry",
    price: 1.99,
    quantity: 0,
    productId: 1,
    image: "images/cherry.jpg",
  },
  {
    name: "Carton of Orange",
    price: 0.99,
    quantity: 0,
    productId: 2,
    image: "images/orange.jpg",
  },
  {
    name: "Carton of Strawberry",
    price: 2.99,
    quantity: 0,
    productId: 3,
    image: "images/strawberry.jpg",
  },
];

// Declare an empty array named cart to hold the items in the cart
let cart = [];

// Currency settings
let currentCurrency = "USD";
const currencyRates = {
  USD: 1,
  EUR: 0.85,
  YEN: 110,
};
const currencySymbols = {
  USD: "$",
  EUR: "€",
  YEN: "¥",
};

// Function to format price based on currency
function formatPrice(price) {
  const convertedPrice = price * currencyRates[currentCurrency];
  return `${currencySymbols[currentCurrency]}${convertedPrice.toFixed(2)}`;
}

// Create a function named addProductToCart that takes in the product productId as an argument
function addProductToCart(productId) {
  // get the correct product based on the productId
  const product = products.find((p) => p.productId === productId);

  // if the product is not already in the cart, add it to the cart
  if (!cart.find((item) => item.productId === productId)) {
    cart.push({ ...product, quantity: 1 });
  } else {
    // if product is already in the cart, increase the product's quantity
    cart = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
}

// Create a function named increaseQuantity that takes in the productId as an argument
function increaseQuantity(productId) {
  // get the correct product based on the productId
  cart = cart.map((item) =>
    item.productId === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
}

// Create a function named decreaseQuantity that takes in the productId as an argument
function decreaseQuantity(productId) {
  // get the correct product based on the productId
  cart = cart
    .map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);
}

// Create a function named removeProductFromCart that takes in the productId as an argument
function removeProductFromCart(productId) {
  // get the correct product based on the productId and update the product quantity to 0
  cart = cart.filter((item) => item.productId !== productId);
}

// Create a function named cartTotal that has no parameters
function cartTotal() {
  // iterate through the cart to get the total cost of all products and return the total cost of the products in the cart
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Create a function called emptyCart that empties the products from the cart
function emptyCart() {
  cart = [];
}

// Create a function named pay that takes in an amount as an argument
function pay(amount) {
  // amount is the money paid by customer
  // pay will return a negative number if there is a remaining balance
  // pay will return a positive number if money should be returned to customer
  const total = cartTotal();
  return amount - total;
}

// Function to switch currency
function switchCurrency(newCurrency) {
  if (currencyRates[newCurrency]) {
    currentCurrency = newCurrency;
    renderCart();
    renderProducts();
  }
}

// Function to render products
function renderProducts() {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${formatPrice(product.price)}</p>
      <button onclick="addProductToCart(${
        product.productId
      })">Add to Cart</button>
    `;
    productsContainer.appendChild(productElement);
  });
}

// Function to render cart
function renderCart() {
  const cartContainer = document.querySelector(".cart");
  cartContainer.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <h4>${item.name}</h4>
      <p>${formatPrice(item.price)} x ${item.quantity} = ${formatPrice(
      item.price * item.quantity
    )}</p>
      <button onclick="increaseQuantity(${item.productId})">+</button>
      <button onclick="decreaseQuantity(${item.productId})">-</button>
      <button onclick="removeProductFromCart(${item.productId})">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  });

  const cartTotalContainer = document.querySelector(".cart-total");
  cartTotalContainer.innerHTML = `Total: ${formatPrice(cartTotal())}`;
}

// Event listener for currency switcher
document
  .querySelector(".currency-selector")
  .addEventListener("change", (event) => {
    switchCurrency(event.target.value);
  });

// Initial render
renderProducts();
renderCart();

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  switchCurrency,
  formatPrice,
};
