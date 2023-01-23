const urlBase = 'http://localhost:3000/api/products';

const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');
const section = document.getElementById('cart__items');
let products = [];

let contact = {
    'firstName' : "", 
    'lastName' : "", 
    'address' : "", 
    'city' : "", 
    'email' : "", 
};

let myFirstNameInput = document.getElementById('firstName');
myFirstNameInput.addEventListener('change', function() {
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    firstNameErrorMsg.textContent = "";

    let nameRegex = /^[a-zA-Z\-]+$/;
    const validFirstNameInput = (nameRegex.test(myFirstNameInput.value));

    if (validFirstNameInput == false) {
        firstNameErrorMsg.textContent = "Le prénom n'est pas valide"
    }
    else{
        contact.firstName = myFirstNameInput.value;
    }
})

let myLastNameInput = document.getElementById('lastName');
myLastNameInput.addEventListener('change', function() {
    const lestNameErrorMsg = document.getElementById('lastNameErrorMsg');
    lestNameErrorMsg.textContent = "";

    let nameRegex = /^[a-zA-Z\-]+$/;
    const validLastNameInput = (nameRegex.test(myLastNameInput.value));

    if (validLastNameInput == false) {
        lastNameErrorMsg.textContent = "Le nom n'est pas valide"
    }
    else{
        contact.lastName = myLastNameInput.value;
    }
})

let myAddressInput = document.getElementById('address');
myAddressInput.addEventListener('change', function() {
    const addressErrorMsg = document.getElementById('addressErrorMsg');
    addressErrorMsg.textContent = "";

    let addressRegex = /^[A-zÀ-ÿ0-9\s,'-]+$/;
    const validaddressInput = (addressRegex.test(myAddressInput.value));

    if (validaddressInput == false) {
        addressErrorMsg.textContent = "L'adresse' n'est pas valide"
    }
    else{
        contact.address = myAddressInput.value;
    }
})


let myCityInput = document.getElementById('city');
myCityInput.addEventListener('change', function() {
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    cityErrorMsg.textContent = "";

    let addressRegex = /^[a-zA-Z0-9].{4,128}$/;
    const validaddressInput = (addressRegex.test(myCityInput.value));

    if (validaddressInput == false) {
        cityErrorMsg.textContent = "La ville n'est pas valide"
    }
    else{
        contact.city = myCityInput.value;
    }
})

let myEmailInput = document.getElementById('email');
myEmailInput.addEventListener('change', function() {
    const emailErrorMsg = document.getElementById('emailErrorMsg');
    emailErrorMsg.textContent = "";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validEmailInput = (emailRegex.test(myEmailInput.value));

    if (validEmailInput == false) {
        emailErrorMsg.textContent = "L'email n'est pas valide"
    }
    else{
        contact.email = myEmailInput.value;
    }
})


function readCart() {
    section.textContent = '';
    let valeurTotalQuantity = 0;
    let valeurTotalPrice = 0
    let cart = JSON.parse(localStorage.getItem('panier'));

    if (cart == null || cart.length == 0) {
        totalQuantity.textContent = valeurTotalQuantity;    
        totalPrice.textContent = valeurTotalPrice;
    }

    else{
        for (let prod of cart) {
            products.push(prod.id);
            let urlApiProduct = urlBase + "/" + prod.id;
            fetch(urlApiProduct, {method: 'GET'})
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(product) {
                    product.qty = prod.qty;
                    product.color = prod.color;
    
                    displayProduct(product); 
    
                    valeurTotalQuantity += parseInt(product.qty);
                    valeurTotalPrice += product.qty * product.price;
                    totalQuantity.textContent = valeurTotalQuantity;    
                    totalPrice.textContent = valeurTotalPrice;
                })
    
                .catch(function(err) {
                // Une erreur est survenue
                    console.log('problème avec le fetch : ' + err)
                });
        }
    }
}

function displayProduct(product) {
    // Créer article class cart__item et l'ajoute dans la section
    let cart__item = document.createElement("article");
    cart__item.className = "cart__item";
    section.appendChild(cart__item);

    // Créer div class cart__item__img et l'ajoute dans l'article
    let cart__item__img = document.createElement("div");
    cart__item__img.className = "cart__item__img";
    cart__item.appendChild(cart__item__img);

    // Créer image 
    let image = document.createElement("img");
    image.src = product['imageUrl'];
    cart__item__img.appendChild(image);

    // Créer div class cart__item__content et l'ajoute dans l'article
    let cart__item__content = document.createElement("div");
    cart__item__content.className = "cart__item__content";
    cart__item.appendChild(cart__item__content);

    // Créer div class cart__item__content__description et l'ajoute dans cart__item__content
    let cart__item__content__description = document.createElement("div");
    cart__item__content__description.className = "cart__item__content__description";
    cart__item__content.appendChild(cart__item__content__description);

    let nom = document.createElement("h2");
    cart__item__content__description.appendChild(nom);
    nom.textContent = product['name'];

    let couleur = document.createElement("p");
    cart__item__content__description.appendChild(couleur);
    couleur.textContent = product.color;

    let prix = document.createElement("p");
    cart__item__content__description.appendChild(prix);
    prix.textContent = product['price'] + " €";


    // Créer div class cart__item__content__settings et l'ajoute dans cart__item__content
    let cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.className = "cart__item__content__settings";
    cart__item__content.appendChild(cart__item__content__settings);

    // Créer div class cart__item__content__settings__quantity et l'ajoute dans cart__item__content__settings
    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.className = "cart__item__content__settings__quantity";
    cart__item__content__settings.appendChild(cart__item__content__settings__quantity);

    // Quantité
    let qty = document.createElement("p");
    cart__item__content__settings__quantity.appendChild(qty);
    qty.textContent = 'Qty : ' + product.qty;


    let form_qty = document.createElement("input");
    form_qty.type = "number";
    form_qty.name = "itemQuantity";
    form_qty.min = 1;
    form_qty.max = 100;
    form_qty.className = "itemQuantity";
    form_qty.value = product.qty;
    cart__item__content__settings__quantity.appendChild(form_qty);
    form_qty.addEventListener('change', function() {
        qty.textContent = 'Qty : ' + form_qty.value;
        updateCart(product, form_qty.value);
    })

    // Supprimer
    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.className = "cart__item__content__settings__delete";
    cart__item__content__settings.appendChild(cart__item__content__settings__delete);

    let deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    cart__item__content__settings__delete.appendChild(deleteItem);
    deleteItem.textContent = "Supprimer";
    deleteItem.addEventListener('click', function() {
        removeCart(product);
    })
}

function removeCart(product){
    let cart = JSON.parse(localStorage.getItem('panier'));
    for (let index in cart) {
        if (cart[index].id == product._id && cart[index].color == product.color) {
            let idCart = cart.indexOf(cart[index]);
            cart.splice(idCart, 1);
        }
    }
    localStorage.setItem('panier', JSON.stringify(cart));
    readCart()
}

function updateCart(product, qty) {
    let cart = JSON.parse(localStorage.getItem('panier'));
    for (let index in cart) {
        if (cart[index].id == product._id && cart[index].color == product.color) {
            cart[index].qty = qty;
        }
    }
    localStorage.setItem('panier', JSON.stringify(cart));
    readCart()
}

// Commander
const order = document.getElementById("order");
order.addEventListener('click', function() {
    console.log(JSON.stringify({contact, products}));
    fetch(urlBase + '/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact, products})
    })
    .then(function(res) {
        //console.log(res);
        if (res.ok) {
            return res.json();
        }
        else{
            console.log("erreur");
        }
    })
    .then(function(value) {
        localStorage.removeItem('panier');
        document.location.href="./confirmation.html?orderid="+value.orderId; 
    })
    .catch(function(err) {
        // Une erreur est survenue
        console.log('problème avec le fetch : ' + err)
    });

})

readCart()

