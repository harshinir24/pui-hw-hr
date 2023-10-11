//Resources used for assignment
// https://www.tutorialspoint.com/how-to-convert-a-string-into-integer-in-javascript#:~:text=To%20convert%20a%20string%20to,be%20returned%20as%20the%20output.
// https://stackoverflow.com/questions/46078328/change-ids-of-child-elements-in-javascript-when-cloning-an-element
// 


//Create set to hold all roll objects
const rollList = new Set();

//Create objects for storing pack size and slazing options with their corresponding price adaptations
const glazingOptions = [
    {
        glaze: "Keep Original",
        price: 0
    } , 
    {
        glaze: "Sugar milk",
        price: 0

    },
    {
        glaze: "Vanilla milk",
        price: 0.50
    },
    {
        glaze: "Double-Chocolate",
        price: 1.50
    }
]

const packSizeOptions = [
    {
        packSize: 1,
        multiply: 1
    },
    {
        packSize: 3,
        multiply: 3
    },
    {
        packSize: 6,
        multiply: 5
    },
    {
        packSize: 12,
        multiply: 10
    }
]

//Create class for roll objects to store values for glazing, type, packsize, and their respective baseprices 
class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;

        this.element = null;
    }

    rollPrice() {
        let basePrice = this.basePrice;
        let price = 0;
        let glazingPrice = 0;
        let packPrice = 0;
    
        //Grab corresponding price adaption from list of objects for glazing options
        for (let i = 0; i < glazingOptions.length; i++) {
            if (glazingOptions[i].glaze === this.glazing) {
                glazingPrice = glazingOptions[i].price;
                
            }
        }
    
        //Grab corresponding price adaption from list of objects for pack size options
        for (let i = 0; i < packSizeOptions.length; i++) {
            if (packSizeOptions[i].packSize === this.size) {
                packPrice = packSizeOptions[i].multiply;
                
            }
        }
        
    
        //Calculate total price based on user selections
        price = (basePrice + glazingPrice) * packPrice;
        price = (Math.round(price * 100) / 100).toFixed(2);
        
        return price;
    
        
        
    
    }

}

function totalPrice(){
    let total = 0;
    const rollArray = Array.from(rollList);

    //Calculate the total price of all of the rolls in the cart by adding up each roll object's total price
    for (const roll in rollArray) {
        total += parseFloat(rollArray[roll].rollPrice());
    }

    //Replace the total price in the cart with the updated price 
    const rollsTotalPrice = document.getElementById("txt-total-price");
    rollsTotalPrice.innerText = "$" + total.toFixed(2);

    return total;
}

function addItemToCart(newRoll) {

    //Grab the template from the DOM and clone it
    const cartTemplate = document.querySelector("#cart-template");
    const clonedRoll = cartTemplate.content.cloneNode(true);

    //Assign the container to the cloned element
    newRoll.element = clonedRoll.querySelector(".cart-prod");

    const rollListElement = document.querySelector('.cart-list');

    //Add the cloned roll to the DOM
    rollListElement.append(newRoll.element);

    //Populate the roll with each object's respective values
    updateRollElement(newRoll);

    //Grab the remove button from the DOM 
    const removeBtn = newRoll.element.querySelector('#remove-item');
    
    //When the user presses remove, remove the element from the DOM and from the rollList set, which will impact total price of all rolls in cart
    removeBtn.addEventListener('click', () => {
        newRoll.element.remove();
        rollList.delete(newRoll);
        totalPrice();

    });

}

function updateRollElement(newRoll){
    //Get the HTML elements from the DOM that need updating
    const cartImageElement = newRoll.element.querySelector('#cart-img');
    const cartTitleElement = newRoll.element.querySelector('#roll-selection');
    const packSizeElement = newRoll.element.querySelector('#pack-selection');
    const glazingElement = newRoll.element.querySelector('#glazing-selection');
    const totalPriceElement = newRoll.element.querySelector('#roll-total-price');
    

    //Update html elements with each object's respective values for type, glazing, image, and price
    cartImageElement.src = "../assets/products/" + rolls[newRoll.type]["imageFile"];
    cartTitleElement.innerHTML = "<p class='cart-text'>" + newRoll.type + " cinnamon roll" + "</p>";
    glazingElement.innerText = "Glazing: " + newRoll.glazing;
    packSizeElement.innerHTML = "<p class='cart-text'> Pack Size: " + newRoll.size + ""
    totalPriceElement.innerText = "$" + newRoll.rollPrice();


}


//Create roll objects with Roll constructor functions
let originalRoll = new Roll ("Original", "Sugar milk", 1, 2.49);
let walnutRoll = new Roll ("Walnut", "Vanilla milk", 12, 3.49);
let raisinRoll = new Roll ("Raisin", "Sugar milk", 3, 2.99);
let appleRoll = new Roll ("Apple", "Original", 3, 3.49);

//Store roll objects in a list to iterate over
let newRolls = [originalRoll, walnutRoll, raisinRoll, appleRoll];

//Create new roll elements for the cart and add it to the rollList set 
for (const roll in newRolls) {
    addItemToCart(newRolls[roll]);
    rollList.add(newRolls[roll]);
}

//Update the total price
totalPrice();


