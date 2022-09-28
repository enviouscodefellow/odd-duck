'use strict';

console.log('Its alive!!!');

//********GLOBAL VARIABLES********/

// TODO As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
// By default, the user should be presented with 25 rounds of voting before ending the session.
// Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.

let votesTimer = 25;
let productNameArray = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
];

let productImageArray = [
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
  'png',
  'jpg',
  'jpg',
  'jpg',
  'jpg',
];

let productDisplayArray = [];

// As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

//********DOM MANIPULATION/REFERENCES********/
let imgContainer = document.getElementById('img-container');
let imgOneElem = document.getElementById('img-one');
let imgTwoElem = document.getElementById('img-two');
let imgThreeElem = document.getElementById('img-three');

let resultsBtn = document.getElementById('results-button');
let resultsList = document.getElementById('results-list');


// TODO Create a constructor function that creates an object associated with each product, and has the following properties:

//********CONTRUCTORS********/
function UniqueProduct(name, fileExt = 'jpg') {
  // Name of the product
  this.name = name;
  // File path of image
  this.img = `img/${name}.${fileExt}`;
  // Times the image has been shown
  this.renders = 0;
  // In the constructor function define a property to hold the number of times a product has been clicked.
  this.clicks = 0;

  // Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered.
  productDisplayArray.push(this);
}

// TODO Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

function randomIndex() {
  return Math.floor(Math.random() * productDisplayArray.length);
}

let previousProductRenders = [];
console.log(previousProductRenders);

function renderImages() {
  let imgOne = randomIndex();
  let imgTwo = randomIndex();
  let imgThree = randomIndex();

  while (imgOne === imgTwo || imgOne === imgThree || imgTwo === imgThree) {
    imgOne = randomIndex();
    imgTwo = randomIndex();
    imgThree = randomIndex();
  }

  for (let i=0; i<previousProductRenders; i++){
    if(imgOne === previousProductRenders[i] || imgTwo === previousProductRenders[i] || imgThree === previousProductRenders[i]){
      renderImages();
    } else {
    }
  }
  previousProductRenders.splice(0,1,imgOne);
  previousProductRenders.splice(1,1,imgTwo);
  previousProductRenders.splice(2,1,imgThree);
  
    console.log(previousProductRenders);
  
    imgOneElem.src = productDisplayArray[imgOne].img;
    imgTwoElem.src = productDisplayArray[imgTwo].img;
    imgThreeElem.src = productDisplayArray[imgThree].img;
  
    // TODO For each of the three images, increment its property of times it has been shown by one.
    productDisplayArray[imgOne].renders++;
    productDisplayArray[imgTwo].renders++;
    productDisplayArray[imgThree].renders++;
  
    imgOneElem.alt = productDisplayArray[imgOne].name;
    imgTwoElem.alt = productDisplayArray[imgTwo].name;
    imgTwoElem.alt = productDisplayArray[imgThree].name;

}


// TODO As a user, I would like to track the selections made by viewers so that I can determine which products to begin production on.
// After every selection by the viewer, update the newly added property to reflect if it was clicked.
function handleClick(event) {
  console.dir(event.target);
  let imgClicked = event.target.alt;

  console.log('img clicked >>', imgClicked);

  for (let i = 0; i < productDisplayArray.length; i++) {
    if (productDisplayArray[i].name === imgClicked) {
      productDisplayArray[i].clicks++;
    }
  }

  // TODO: decrement the vote count
  votesTimer--;
  
  // TODO Once the users ‘clicks’ a product, generate three new products for the user to pick from.
  renderImages();

  // After voting rounds have been completed, remove the event listeners on the product.
  if (votesTimer === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }
}


// TODO As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.

function handleShowResults(){
  if(votesTimer === 0){
    for(let i = 0; i < productDisplayArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${productDisplayArray[i].name} had ${productDisplayArray[i].clicks} votes and was seen ${productDisplayArray[i].renders} times.`;
      resultsList.appendChild(liElem);
    }
    console.log(productDisplayArray);
    imgContainer.removeEventListener('click', handleShowResults);
  }
}

// Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.

//********EXECUTABLE CODE********/

for (let i =0; i<productNameArray.length; i++){
  new UniqueProduct(productNameArray[i],productImageArray[i]);
}
console.log(productDisplayArray);
renderImages();

// TODO Attach an event listener to the section of the HTML page where the images are going to be displayed.

imgContainer.addEventListener('click', handleClick);
imgContainer.addEventListener('click', handleShowResults);

