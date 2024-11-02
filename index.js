const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = cartTotal + newItemPrice;
  res.send(cartTotal.toString());
});

function priceAfterDiscount(cartTotal, isMember) {
  let finalPrice = cartTotal;
  console.log(isMember);
  if (isMember === 'true') {
    console.log(isMember);
    finalPrice = cartTotal - cartTotal * 0.1;
    return finalPrice.toString();
  } else {
    return finalPrice.toString();
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(priceAfterDiscount(cartTotal, isMember));
});

// Return tax on totalAmount
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalTax = cartTotal * (taxRate / 100);
  res.send(totalTax.toString());
});

//estimated delivery time
function deliveryDaysCalculation(shippingMethod, distance) {
  let deliveryDays;
  console.log(shippingMethod);
  if (shippingMethod === 'Standard') {
    console.log('Standard');
    deliveryDays = distance / 50;
  } else {
    console.log('Express');
    deliveryDays = distance / 100;
  }
  return deliveryDays;
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliverDays = deliveryDaysCalculation(shippingMethod, distance);
  res.send(deliverDays.toString());
});

// estimated cost
function totalEstimatedCost(weight, distance) {
  return weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let estCost = totalEstimatedCost(weight, distance);
  res.send(estCost.toString());
});

//Loyalty program

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send((purchaseAmount * 2).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
