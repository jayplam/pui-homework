// I got some help from a classmate in terms of figuring out how I wanted to fit everything together, though the code was written by me.
// All the arrays I need to call. Honestly, I could have done a library with key-value pairs, but I ran out of time to look into it more.
glazeVal = ['original', 's_milk', 'v_milk', 'choco'];
glazePrc = [0, 0, 0.50, 1.50];
glazeText = ['Keep original', 'Sugar milk', 'Vanilla milk', 'Double chocolate'];
packVal = [1, 3, 6, 12];
packMult = [1, 3, 5, 10];

// call the dropdowns from the HTML
const glazeDrop = document.querySelector('#glaze_drop');
const packDrop = document.querySelector('#pack_drop');

// two for loops to populate the dropdowns with the array information
for (let i = 0; i < glazeVal.length; i++) {
  const glazeOption = document.createElement('option');
  glazeOption.text = glazeText[i];
  glazeOption.value = glazeVal[i];
  glazeDrop.add(glazeOption);
}

for (let i = 0; i < packVal.length; i++) {
  let packOption = document.createElement('option');
  packOption.text = packVal[i];
  packOption.value = packVal[i];
  packDrop.add(packOption);
}

// function to calculate the total price based on the selected glaze and pack size
function calcTotalPrice() {
  // call the array values of the current glaze and pack dropdown items
  const selectedGlaze = glazeDrop.value;
  const selectedPack = packDrop.value;

  // find the indices of the glaze and pack items in their arrays. 
  // The packVal array has integers while my output returns string, 
  // so I have to change it back since indexOf uses strict comparison.
  const glazeIndex = glazeVal.indexOf(selectedGlaze);
  const packIndex = packVal.indexOf(parseInt(selectedPack));

  // verification for me in the console to see if it actually works. Can be removed without issue.
  console.log('Glaze index: ' + glazeIndex);
  console.log('Pack index: ' + packIndex);

  // calculation/formula calling the price and pack multiplier based on the index taken from above.
  const total = (2.49 + glazePrc[glazeIndex]) * packMult[packIndex];
  return total;
}

// function to change the price of the span in the #pd_price p element in the HTML.
// example from puinote-lab04 was used to create this.
function displayPrice(total) {
  let price = document.querySelector('#pd_price span');
  price.innerText = total.toFixed(2);
}

// actionable function that is called when any changes are made to the selections
// of the dropdowns. first, gets the price and calls the function to change the HTML price. 
// The console write was taken from puinote-lab04 example to serve as verification/testing.
// Aside from that, I'm not sure what the instructions wanted from the const priceChange variable.
function onSelectChange() {
  const total = calcTotalPrice();
  console.log('You selected ' + this.value);
  displayPrice(total);
}

// Calling the functions using event listeners. Both can call the same function.
// Though the instructions wanted me to call from HTML, I'm used to writing event
// listeners in JS for to maintain semantic codebases.
glazeDrop.addEventListener('change', onSelectChange);
packDrop.addEventListener('change', onSelectChange);