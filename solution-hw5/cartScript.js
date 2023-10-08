const cart = new Set(); // initializes the cart set.

// class for storing roll info as an object.
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}

// Arrays for storing item values for changing price
const glazeOptions = {
  'Keep original': 0.00,
  'Sugar milk': 0.00,
  'Vanilla milk': 0.50,
  'Double chocolate': 1.50,
}
const packOptions = {
  1: 1,
  3: 3,
  6: 5,
  12: 10,
}

// This function creates a new Roll object, and adds it to cart
function addNewRoll(rollType, rollGlazing, packSize, basePrice) {
  const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice); // Create a new roll object
  cart.add(newRoll); // Add the newRoll object to our cart Set

  // Add the new cart item to the DOM when it is created and addNewRoll is initialized
  createElement(newRoll);

  return newRoll;
}

// This function calculates the sum price of each item it is being called from, and returning the value.
function itemPriceCalculation(rollCalc) {
  const glazingPrice = glazeOptions[rollCalc.glazing] || 0.00; // Get the glazing price from glazeOptions
  const packMultiplier = packOptions[rollCalc.size] || 1; // Get the pack size multiplier from packOptions
  const totalPrice = (rollCalc.basePrice + glazingPrice) * packMultiplier;  // Calculate the total price

  return totalPrice.toFixed(2); // Return the total price rounded to 2 decimal places
}

// This function clones the template, initializes the deleteRoll event listener, adds the clone before the cartDiv HR, 
// updates the clone content, and updates the total cart value.
function createElement(newRoll) {
  // make a clone of the cart item template
  const template = document.querySelector('#cart_item_template');
  const clone = template.content.cloneNode(true);
  
  // connect this clone to our newRoll.element, from this point we only need to refer to newRoll.element
  newRoll.element = clone.querySelector('.cart_item');

  // initialize the deleteRoll event listener
  const itemRemove = newRoll.element.querySelector('.item_remove');
  itemRemove.addEventListener('click', () => {
    deleteRoll(newRoll);
  });
    
  // add the item clone to the DOM before the horizontal rule, find the item parent (#cart_div) and add our item as its child
  const cartDivElement = document.querySelector('#cart_div');
  const hrElement = cartDivElement.querySelector('#cart_hr'); // Select the horizontal rule
  cartDivElement.insertBefore(newRoll.element, hrElement); // Insert the item before the horizontal rule
  
  updateElement(newRoll);  // populate the item clone with the actual item content
  updateTotalCartValue(); // Update the total cart value
}

// This function, when called, updates the image, title, image alt, glazing, and pack size, and initializes the price calculator for the item price.
function updateElement(newRoll) {
  const imageFileName = rolls[newRoll.type].imageFile; // Get the image file name from the rolls data

  const itemImage = newRoll.element.querySelector('.img_border'); // Replace image source
  itemImage.src = `../assets/products/${imageFileName}`;

  const itemName = newRoll.element.querySelector('.item_name'); // Replace item name
  itemName.innerText = newRoll.type + ' Cinnamon Roll';

  itemImage.setAttribute('alt', itemName.innerText); // Replace image alt text

  const itemGlazing = newRoll.element.querySelector('.item_glazing'); // Replace glazing
  itemGlazing.innerText = newRoll.glazing;

  const itemPackSize = newRoll.element.querySelector('.item_pack_size'); // Replace pack size
  itemPackSize.innerText = newRoll.size;

  const itemPrice = newRoll.element.querySelector('.item_price'); // Calculate item price using the itemPriceCalculation function
  itemPrice.innerText = itemPriceCalculation(newRoll);
}

// This function, when initialized, removes the chosen item from the dom, then removes it from the cart and updates the total cart.
function deleteRoll(newRoll) {
  newRoll.element.remove();  // remove the newRoll DOM object from the UI
  cart.delete(newRoll); // remove the actual newRoll object from our cart
  updateTotalCartValue(); // Update the total cart value
}

// Function to calculate the total cart value
function calculateTotalCartValue() {
  let totalValue = 0; // counter to be filled

  // runs through the items in the cart, and adds the values to totalValue
  for (const newRoll of cart) {
    const itemPrice = parseFloat(itemPriceCalculation(newRoll)); // Parse the price as a float
    totalValue += itemPrice;
  }

  // returns the totalValue into updateTotalCartValue
  return totalValue.toFixed(2); // Return the total value rounded to 2 decimal places
}

// Function to update the displayed total cart value in the HTML, calling calculateTotalCartValue
function updateTotalCartValue() {
  const cartTotalElement = document.querySelector('.cart_total_price'); // Select the element where you want to display the total

  const totalValue = calculateTotalCartValue(); // Calculate the total cart value
  cartTotalElement.innerText = '$ ' + totalValue; // Update the displayed total value
}

// Initial update of the total cart value
updateTotalCartValue();

// All additions of the items.
addNewRoll("Original", "Sugar milk", 1, 2.49);
addNewRoll("Walnut", "Vanilla milk", 12, 3.49);
addNewRoll("Raisin", "Sugar milk", 3, 2.99);
addNewRoll("Apple", "Original", 3, 3.49);