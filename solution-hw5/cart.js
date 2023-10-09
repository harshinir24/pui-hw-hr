//Create objects for dropdown menus with corresponding price adaptations
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


class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;

        this.element = null;
    }

    totalPrice() {
        let basePrice = this.basePrice;
        let price = 0;
        let glazingPrice = 0;
        let packPrice = 0;
    
        //Grab corresponding price adaption from list of objects for glazing options
        glazingPrice = rolls[this.type]["basePrice"];
        //console.log(glazingPrice);
    
        //Grab corresponding price adaption from list of objects for pack size options
        for (let i = 0; i < packSizeOptions.length; i++) {
            if (packSizeOptions[i].packSize === this.size) {
                packPrice = packSizeOptions[i].multiply;
                //console.log(packSizeOptions[i].packSize);
            }
        }
        //packPrice = packSizeOptions[this.size].multiply;
        //console.log(packPrice);
    
        //Grab template slot name here
    
        //Calculate total price based on user selections
        price = (basePrice + glazingPrice) * packPrice;
        price = (Math.round(price * 100) / 100).toFixed(2);
        //console.log(price);
        return price;
    
        //Change content of template slot 
        
    
    }

}

function addItemToCart(newRoll) {
    //let cartCard = document.querySelector(".cart-prod");
    //let cartList = document.querySelector(".cart-list");
    //let newCartRoll = cartCard.cloneNode(true);

    //let newImg = newCartRoll.getElementsByTagName('cart-img');
    //console.log(newImg);
    
    //cartList.appendChild(newCartRoll);

    const cartTemplate = document.querySelector("#cart-template");
    const clonedRoll = cartTemplate.content.cloneNode(true);

    //console.log(clonedRoll);
    //console.log(newRoll.element);

    newRoll.element = clonedRoll.querySelector(".cart-prod");

    const rollListElement = document.querySelector('.cart-list');

    rollListElement.prepend(newRoll.element);

    updateRollElement(newRoll);

    const removeBtn = newRoll.element.querySelector('#remove-item');
    //console.log(btnDelete);
    removeBtn.addEventListener('click', () => {
    newRoll.element.remove();
    });

}

function updateRollElement(newRoll){
    // get the HTML elements that need updating
    const cartImageElement = newRoll.element.querySelector('#cart-img');
    const cartTitleElement = newRoll.element.querySelector('#roll-selection');
    const packSizeElement = newRoll.element.querySelector('#pack-selection');
    const glazingElement = newRoll.element.querySelector('#glazing-selection');
    const totalPriceElement = newRoll.element.querySelector('#roll-total-price');

    //const noteBodyElement = newRoll.element.querySelector('.note-body');
    cartImageElement.src = "../assets/products/" + rolls[newRoll.type]["imageFile"];
    cartTitleElement.innerHTML = "<p class='cart-text'>" + newRoll.type + " cinnamon roll" + "</p>";
    glazingElement.innerText = "Glazing: " + newRoll.glazing;
    packSizeElement.innerHTML = "<p class='cart-text'> Pack Size: " + newRoll.size + ""
    totalPriceElement.innerText = "$" + newRoll.totalPrice();


}


let originalRoll = new Roll ("Original", "Sugar Milk", 1, 2.49);
let walnutRoll = new Roll ("Walnut", "Vanilla Milk", 12, 3.49);
let raisinRoll = new Roll ("Raisin", "Sugar Milk", 3, 2.99);
let appleRoll = new Roll ("Apple", "Original", 3, 3.49);

let newRolls = [originalRoll, walnutRoll, raisinRoll, appleRoll];

for (const roll in newRolls) {
    //console.log(roll);
    addItemToCart(newRolls[roll]);
}

addItemToCart(appleRoll);




//iterate through new object, create a copy of the template for each one, and insert new copies into the DOM 


//let slotTest = document.getElementById("slot-test").content;
//let slot2 = slotTest.cloneNode(true);
//document.body.appendChild(slot2);

//let slot3 = slotTest.cloneNode(true);
//slot3.innerHTML = "<p>Hello</p>"
//document.body.appendChild(slot3);

//Add new roll to cart
//appleRoll.addItemToCart();

//console.log(appleRoll.totalPrice());
