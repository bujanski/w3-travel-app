

const discountCodes = ['adventure50', 'travel50', 'vacation50'];
const airPrice = 199.99;
const hotelPrice = 124.74;
const adventurePrice = 79.99;
const taxRate = 0.06;
let hasDiscountCode = false;

// check discount code validity


function processPurchase () {

    let airTix = Number(document.getElementById("airTix").value);
    let hotelNights = Number(document.getElementById("hotelNights").value);
    let adventureTix = Number(document.getElementById("adventureTix").value);
    let airTotal;
    let hotelTotal;
    let adventureTotal;
    let customerName = document.getElementById("customerName").value;
    let div = document.getElementById("the-bill");

    // check for valid discount code
    for (const element of discountCodes) {
        if (document.getElementById("discountCode").value == element) {
            hasDiscountCode = true;
        }
    }

    if (hasDiscountCode) {
        airTotal = discSubtotal (airTix, airPrice);
        hotelTotal = discSubtotal (hotelNights, hotelPrice);
        adventureTotal = discSubtotal (adventureTix, adventurePrice);
    }
    else {
        airTotal = airTix * airPrice;
        hotelTotal = hotelNights * hotelPrice;
        adventureTotal = adventureTix * adventurePrice;
    }

    let total = airTotal + hotelTotal + adventureTotal;

    //round to nearest cent
    total = Math.round(total * 100) / 100;

    // calculate and add tax to total
    let taxes =  Math.round((total * taxRate) * 100) / 100;
    let grandTotal = Math.round((total + taxes) * 100) / 100;total + taxes;

    //reset the discount code status to false in case changes are made by user
    hasDiscountCode = false;
    //clear any contents in the bill and display new totals
    div.innerHTML ="";
    div.innerHTML = "Thank you " + customerName + ". Here are your totals:" +
        '<br> &nbsp; &nbsp;' + "Total airfare: " + airTotal +
        '<br> &nbsp; &nbsp;' + "Total for hotel stay: " + hotelTotal +
        '<br> &nbsp; &nbsp;' + "Total for adverntures: " + adventureTotal +
        '<br> &nbsp; &nbsp;' + "Total before taxes: " + total +
        '<br> &nbsp; &nbsp;' + "Taxes: " + taxes +
        '<br> &nbsp; &nbsp;' + "Grand total: " + grandTotal;
}


// Calculates total price for all items purchased in the category. Applies 50% discount to items in groups of 3. e.g. if customer purchases 8 items, discount will be applied to six and the remaining 2 will be full price: ((3 * .5) + (3 * .5) + (2 * 1))

function discSubtotal (purchase, price) {
    let subTotal = 0;
    while (purchase > 0) {
        if (purchase / 3 >= 1){
            subTotal += 3 * price * 0.5;
            purchase -= 3;
        }
        else {
            subTotal += purchase * price;
            purchase = 0;
        }
    }
    return Math.round(subTotal * 100) / 100;   
    
}