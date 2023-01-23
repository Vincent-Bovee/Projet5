


const urlBase = 'http://localhost:3000/api/products';
const url = window.location.href;
const urlTab = url.split("id=");

const urlApiProduct = urlBase + "/" + urlTab[1];

fetch(urlApiProduct, {method: 'GET'})
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(productsList) {
        displayProduct(productsList);
        
    })
    .catch(function(err) {
    // Une erreur est survenue
    });



    function displayProduct(product) {
        const divImg = document.querySelector(".item__img");
        const image = document.createElement("img");
        image.src = product['imageUrl'];
        divImg.appendChild(image);

        const name = document.getElementById('title');
        name.textContent = product['name']

        const prix = document.getElementById('price');
        prix.textContent = product['price']

        const description = document.getElementById('description');
        description.textContent = product['description']

        const colors = document.getElementById('colors');
        for (let color of product['colors']) {
            const option = document.createElement("option");
            option.text = color;
            option.value = color;
            colors.appendChild(option);
        }
    }

    const button_addToCart = document.getElementById('addToCart')
    button_addToCart.addEventListener('click', function()
    {
        let id = urlTab[1];
        let colors = document.getElementById('colors').options[document.getElementById('colors').selectedIndex].value;
        let quantity = document.getElementById('quantity').value;
        let article = {
            'id' : id, 
            'color' : colors, 
            'qty' : Number(quantity)
        };
        if (article.color == "")
        {
            alert("choisissez une couleur")
        }
        else if (article.qty == 0) {
            alert("choisissez un nombre d'article(s)")
        }
        else{
            // Créer un objet "article" avec l'ID, la couleur et la quantité dedans

            let cart = JSON.parse(localStorage.getItem('panier'));
            if (cart != null) {
                const cartValeurs = cart.findIndex(cart => cart.id == article.id && cart.color == article.color);
                if (cartValeurs == -1) {
                    cart.push(article);
                    localStorage.setItem('panier', JSON.stringify(cart));  
                }
                else{
                    if (cart[cartValeurs].qty + article.qty > 100) {
                        cart[cartValeurs].qty = 100;
                        localStorage.setItem('panier', JSON.stringify(cart));  
                        alert("Maximum 100 article");
                    }
                    else {
                        cart[cartValeurs].qty = cart[cartValeurs].qty + article.qty;
                        localStorage.setItem('panier', JSON.stringify(cart));  
                    }            
                }
            }
            else{
                if (article.qty > 100) {
                    article.qty = 100;
                    alert("Maximum 100 article");
                }
                localStorage.setItem('panier', JSON.stringify([article]));
            }
        }
    });



            // Créer un localStorage "panier" et l'ajoute dans la variable "cart"
        // let cart = JSON.parse(localStorage.getItem('panier'));
        // let update = 0;
        
        // if (cart != null) {
        //     for (let index in cart) {
        //         if (cart[index].id == article.id) {
        //             if (cart[index].color == article.color) {
        //                 if (cart[index].qty + article.qty > 100) {
        //                     cart.qty = 100;
        //                     //alert
        //                 }
        //                 else {
        //                     cart[index].qty = cart[index].qty + article.qty;
        //                 }
        //                 update=1;
        //             }                   
        //         }
        //     }
        //     if (update == 0) {
        //         cart.push(article);
        //     }
        //     localStorage.setItem('panier', JSON.stringify(cart));    
        // }
        // else {
        //     localStorage.setItem('panier', JSON.stringify([article]));
        // }
        
        // for (let index in cart) {
        //     console.log(cart);
        // }
        // console.log(cart);