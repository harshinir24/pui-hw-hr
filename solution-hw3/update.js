//Help:
// https://www.w3schools.com/jsref/met_select_add.asp

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
        price: 10
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
    console.log(dropOption.selectedIndex);
    let glazingPrice = glazingOptions[dropOption.selectedIndex].price;
    let packPrice = packSizeOptions[dropOption.selectedIndex].multiply;
    let price = 0;

    totalPrice = document.getElementById("prod-detail-price");

    price = (basePrice + glazingPrice) * packPrice;
    totalPrice.text = price;
    console.log(glazingPrice);
    console.log(packPrice);
    console.log(price);

}

glazeSelection.addEventListener('select', changePrice);
packSizeSelection.addEventListener('select', changePrice);





