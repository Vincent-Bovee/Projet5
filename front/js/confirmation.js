

const urlBase = 'http://localhost:3000/api/products';
const url = window.location.href;
const urlTab = url.split("orderid=");

const orderId = document.getElementById("orderId");
orderId.innerText = urlTab[1];

//console.log(result);