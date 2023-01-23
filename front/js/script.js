const urlApi = 'http://localhost:3000/api/products';

fetch(urlApi, {method: 'GET'})
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(productsList) {
    for (let oneProduct of productsList) {
      displayProduct(oneProduct);
    }
    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });



  function displayProduct(product) {
    const section = document.getElementById('items');

    // Lien
    const lien = document.createElement("a");
    lien.href = "./product.html?id=" + product['_id'];
    section.appendChild(lien);

    // Article
    const article = document.createElement("article");
    lien.appendChild(article);

    // Image
    const image = document.createElement("img");
    image.src = product['imageUrl'];
    article.appendChild(image);

    // Nom
    const name  = document.createElement("h3");
    name.textContent = product['name'];
    article.appendChild(name);

    // Description
    const description  = document.createElement("p");
    description.textContent = product['description'];
    article.appendChild(description);
  }

