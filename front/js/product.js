/* On récupère l'id du produit dans l'url pour savoir quelle page produit afficher */
let productUrl = (new URL(window.location)).searchParams;
let productId = productUrl.get("id");

/*J'initialise mon tableau produits qui récupèrera les données de mon Api*/
let productImg = document.querySelector(".item__img");
let title = document.getElementById("title");
let price = document.getElementById("price");
let productDescription = document.getElementById("description");
let colors = document.getElementById("colors");
let quantity = document.getElementById("quantity");


/* Je récupère les produits de mon Api avec Get*/
function getApi() {
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) { 
            productInfo(data);
        })
        .catch(function(err) {
            console.log("une erreur est survenue", err);
            // Une erreur est survenue
        });
}
getApi();

/* Fonction pour récupérer les infos du produit et les compléter*/
function productInfo(product) {
    /*Récupération de l'image et du texte alternatif correspondant au produit*/
    productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.description}">`;
    /*Récupération du titre correspondant au produit*/
    title.innerText = product.name;
    /*Récupération du prix correspondant au produit*/
    price.innerText = product.price;
    /*Récupération des couleurs correspondant au produit avec une boucle pour créer une option de sélection en fonction du nombre de couleurs*/
    for (let i = 0; i < product.colors.length; i++) {
        colors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
    }
    /*Ajout d'un event listener qui augmente le prix du produit en fonction de la quantité sélectionnée par l'utilisateur*/
    quantity.addEventListener('change', (event) => {
        price.textContent =  (`${product.price}` * `${event.target.value}`);
      });
}
