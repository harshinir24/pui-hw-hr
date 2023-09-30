// Sources:
// https://www.w3schools.com/jsref/met_select_add.asp
// https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
// https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
// https://www.w3schools.com/jsref/prop_select_selectedindex.asp


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
        glaze: "Double Chocolate",
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

const cart = [];

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

const rollHeader = document.getElementById("title-roll-name");
const rollImage = document.getElementById("prod-det-img");
const rollBasePrice = document.getElementById("prod-detail-price");

console.log(queryString);
console.log(params);
console.log(rollType);
console.log(rollImage.src);

for (const element in rolls) {
    if (element === rollType) {
        let newHead = rollType + " " + "cinnamon roll";
        rollHeader.innerHTML = "<p class='large-head'>" + newHead + "<p>";
        rollImage.src = "../assets/products/" + rolls[element]["imageFile"];
        rollBasePrice.innerHTML = "$" + rolls[element]["basePrice"];
        console.log(rolls[element]);
    }

}



//Grabbing dropdown menus from the DOM
let glazeSelection = document.getElementById("dropdown1");
let packSizeSelection = document.getElementById("dropdown2");

//Changing image in product detail
let prodDetailImage = document.getElementById("prod-img-container");

//Populate glazing options in dropdown menu
for (let i = 0; i < glazingOptions.length; i++) {
    let option = document.createElement("option");
    option.text = glazingOptions[i].glaze;
    glazeSelection.appendChild(option);

}
//Populate pack size options in dropdown menu
for (let i = 0; i < packSizeOptions.length; i++) {
    let option = document.createElement("option");
    option.text = packSizeOptions[i].packSize;
    packSizeSelection.appendChild(option);

}

//Change price based on selected options in dropdown menus 
function changePrice() {
    let basePrice = rolls[rollType]["basePrice"];
    let price = 0;
    let glazingPrice = 0;
    let packPrice = 0;

    //Grab corresponding price adaption from list of objects for glazing options
    glazingPrice = glazingOptions[glazeSelection.selectedIndex].price;

    //Grab corresponding price adaption from list of objects for pack size options
    packPrice = packSizeOptions[packSizeSelection.selectedIndex].multiply;

    //Grab total price text element from DOM of product detail page
    totalPrice = document.getElementById("prod-detail-price");

    //Calculate total price based on user selections
    price = (basePrice + glazingPrice) * packPrice;
    price = (Math.round(price * 100) / 100).toFixed(2);

    //Change content of total price text 
    totalPrice.textContent = "$" + price;

}

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}


function addToCart () {
    let newRoll = new Roll(rollType, glazeSelection.value, packSizeSelection.value, rolls[rollType]["basePrice"]);
    cart.push(newRoll);
    console.log(cart);
}



