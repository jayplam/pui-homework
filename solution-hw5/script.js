// initializes the cart array.
let cart = [];

// class for storing roll info as an object.
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
};

// calls the product description button.
const addToCartBTN = document.querySelector('#pd_button');

// Objects for populating dropdowns, removed the initial keys so to reduce the objects I need.
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
};

// copied from the homework 4 requirements. Parses the URL and stores roll type as variable.
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
console.log(rollType);

// initialize the Header
const headerElement = document.querySelector('#pd_header');
headerElement.innerText = rollType + ' cinnamon roll';

// initialize the image
const rollImage = document.querySelector('#pd_image');
rollImage.src = '../assets/products/' + rolls[rollType].imageFile;

// initialize the price
const rollPrice = document.querySelector('#pd_price');
rollPrice.innerText = '$ ' + rolls[rollType].basePrice;

// call the dropdowns from the HTML
const glazeDrop = document.querySelector('#glaze_drop');
const packDrop = document.querySelector('#pack_drop');

// two for loops to populate the dropdowns with the JS Object information
for (const option in glazeOptions) {
  const glazeOption = document.createElement('option');
  glazeOption.text = option;
  glazeOption.value = glazeOptions[option];
  glazeDrop.add(glazeOption);
  console.log(glazeOption.text, glazeOption.value);
}

for (const option in packOptions) {
  const packOption = document.createElement('option');
  packOption.text = option;
  packOption.value = packOptions[option];
  packDrop.add(packOption);
  console.log(packOption.text, packOption.value);
}

// function to calculate the total price based on the selected glaze and pack size
function calcTotalPrice() {
  // call the object values of the current glaze and pack dropdown items
  const selectedGlaze = glazeDrop.options[glazeDrop.selectedIndex].text;  // console.log('selected glaze: ' + selectedGlaze);
  const selectedPack = packDrop.options[packDrop.selectedIndex].text;  // console.log('selected pack: ' + selectedPack);

  // find the indices of the glaze and pack items in their arrays. 
  // the packVal array has integers while my output returns string, 
  // so I have to change it back since indexOf uses strict comparison.
  const glazePrice = glazeOptions[selectedGlaze];  // console.log('selected glaze price: ' + glazePrice);
  const packMultiplier = packOptions[selectedPack];  // console.log('selected pack mult: ' + packMultiplier);

  // verification for me in the console to see if it actually works. Can be removed without issue.
  console.log('Glaze index: ' + glazePrice);
  console.log('Pack index: ' + packMultiplier);

  // calculation/formula calling the price and pack multiplier based on the index taken from above.
  const basePrice = rolls[rollType].basePrice;  // console.log('base price: ' + basePrice)
  const total = (basePrice + parseFloat(glazePrice)) * packMultiplier;  // console.log('total: ' + total.toFixed(2));
  return total;

}

// function to change the price of the span in the #pd_price p element in the HTML.
// example from puinote-lab04 was used to create this.
function displayPrice(total) {
  const price = document.querySelector('#pd_price');
  price.innerText = '$ ' + total.toFixed(2);
}

// actionable function that is called when any changes are made to the selections
// of the dropdowns. first, gets the price and calls the function to change the HTML price. 
// the console write was taken from puinote-lab04 example to serve as verification/testing.
// Aside from that, I'm not sure what the instructions wanted from the const priceChange variable.
function onSelectChange() {
  const selectedGlazeOption = glazeDrop.options[glazeDrop.selectedIndex].text;
  const selectedPackOption = packDrop.options[packDrop.selectedIndex].text;
  
  console.log('Selected glaze: ' + selectedGlazeOption);
  console.log('Selected pack: ' + selectedPackOption);
  
  const total = calcTotalPrice();
  displayPrice(total);
}


// add items to the cart array. uses the Roll class to add objects to be used elsewhere. Doesn't currently store.
function addToCart() {
  let rollObject = new Roll(rollType, glazeDrop.options[glazeDrop.selectedIndex].text, packDrop.options[packDrop.selectedIndex].text, rolls[rollType].basePrice)
  cart.push(rollObject);
  console.log(cart);
}

// calling the functions using event listeners. Both can call the same function.
// though the instructions wanted me to call from HTML, I'm used to writing event
// listeners in JS for to maintain semantic code bases.
glazeDrop.addEventListener('change', onSelectChange);
packDrop.addEventListener('change', onSelectChange);
// eventListener for the add to cart button.
addToCartBTN.addEventListener('click', addToCart);