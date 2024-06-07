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

// Add more fruits here

// Declare an empty array named cart to hold the items in the cart
let cart = [];

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
  /* Uncomment the following line if completing the currency converter bonus */
  // currency
};
