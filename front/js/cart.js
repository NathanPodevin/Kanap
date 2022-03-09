let infoCartLinea = localStorage.getItem("obj");
let infoCart = JSON.parse(infoCartLinea);
console.log(infoCart)

let dataCart = document.querySelector(".cart__item__content__description p");
let itemQuantity = document.querySelector(".cart__item__content__settings__quantity");
let productImgCart = document.querySelector(".cart__item__img");
let productName = document.querySelector(".cart__item__content__description h2");
let productCartInfo = document.querySelectorAll(".cart__item__content__description p");
let productPrice = productCartInfo[1];
let totalPrice = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");

/* Je récupère les produits de mon Api avec Get*/
function getApi() {
    fetch(`http://localhost:3000/api/products/${infoCart.id}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) { 
            displayInfo(data);
        })
        .catch(function(err) {
            console.log("une erreur est survenue", err);
            // Une erreur est survenue
        });
}
getApi();

function displayInfo(product) {
    /*Récupération de la couleur stockée dans le localStrorage*/
    dataCart.innerHTML = `<p>${(infoCart.color)}</p>`;
    /*Récupération de la quantité stockée dans le localStrorage*/
    itemQuantity.innerHTML = `<p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${(infoCart.quantity)}">`;
    /*Récupération de l'image et du texte alternatif correspondant au produit*/
    productImgCart.innerHTML = `<img src="${product.imageUrl}" alt="${product.description}">`;
    /*Récupération du titre correspondant au produit*/
    productName.innerText = product.name;
    /*Récupération du prix correspondant au produit*/
    productPrice.innerHTML = `<p>${product.price} €</p>`;
    /*Affichage du prix total*/
    totalPrice.textContent =  `${product.price}` * `${infoCart.quantity}`;
    /*Affichage du nombre total d'articles*/
    totalQuantity.textContent =  infoCart.quantity;
    itemQuantity.addEventListener('change', (event) => {
        totalPrice.textContent =  (`${product.price}` * `${event.target.value}`);
        totalQuantity.textContent = event.target.value;
    });
}
