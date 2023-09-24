//Help:
// https://www.w3schools.com/jsref/met_select_add.asp
//https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places


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

let glazeSelection = document.getElementById("dropdown1");
let packSizeSelection = document.getElementById("dropdown2");

//Create glazing options
for (let i = 0; i < glazingOptions.length; i++) {
    let option = document.createElement("option");
    option.text = glazingOptions[i].glaze;
    glazeSelection.appendChild(option);

}
//Create pack size options
for (let i = 0; i < packSizeOptions.length; i++) {
    let option = document.createElement("option");
    option.text = packSizeOptions[i].packSize;
    packSizeSelection.appendChild(option);

}


function changePrice(dropOption) {
    let basePrice = 2.49;
    let price = 0;
    let glazingPrice = 0;
    let packPrice = 0;
    //console.log(dropOption);

    glazingPrice = glazingOptions[glazeSelection.selectedIndex].price;
  
    packPrice = packSizeOptions[packSizeSelection.selectedIndex].multiply;

    totalPrice = document.getElementById("prod-detail-price");

    price = (basePrice + glazingPrice) * packPrice;
    price = (Math.round(price * 100) / 100).toFixed(2);
    totalPrice.textContent = "$" + price;
    //console.log(glazingPrice);
    //console.log(packPrice);
    //console.log(price);
    //console.log(totalPrice);

}



