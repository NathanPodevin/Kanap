let productInStorage = JSON.parse(localStorage.getItem('produit'));
console.log(productInStorage);

/* J'initialise mes variables pour récupérer les différents éléments de mon html */
let cart = document.getElementById("cart__items");
let dataCart = document.querySelector(".cart__item__content__description p");
let itemQuantity = document.querySelector(".itemQuantity");
let productImgCart = document.querySelector(".cart__item__img");
let productName = document.querySelector(".cart__item__content__description h2");
let productCartInfo = document.querySelectorAll(".cart__item__content__description p");
let productPrice = productCartInfo[1];
let totalPrice = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");
let totalQtt = 0;
let totalPrc = 0;

/* Je crée ma fonction pour afficher dans mon panier */
function displayCart() {
/* Je crée ma boucle pour chacun des produits de mon localStorage */
    for(let productStored of productInStorage) {    
        console.log(productStored);
/* Je récupère les produits de mon Api avec Get */
            fetch(`http://localhost:3000/api/products/${productStored.id}`)
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(function(data) { 
                    displayInfo(data);
                    console.log(data);
                })
                .catch(function(err) {
                    console.log("une erreur est survenue", err);
                    // Une erreur est survenue
                });
/* Je crée mon fonction pour afficher les infos de mes produits dans mon panier */        
        function displayInfo(product) {

/* Je mets en place les calculs pour trouver ma quantité et mon prix total */
          totalQtt += Number(productStored.quantity);
          totalPrc += Number(productStored.quantity) * Number(product.price);
          console.log(totalQtt);
          console.log(totalPrc);
/* Je mets en place mon calcul pour trouver le prix de mets lots de produits */
          let productPrc = product.price * productStored.quantity;
/* J'affiche dans mon html les informations en focntion de mon produit */  
          cart.innerHTML += 
            ` <article class="cart__item" data-id="${productStored.id}" data-color="${productStored.color}">
            <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="${product.description}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${productStored.color}</p>
                <p><span class="lot__price">${productPrc}</span> € (${product.price} € unité)</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productStored.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
            </article>
            </section>
            `
            totalQuantity.innerText = totalQtt;
            totalPrice.innerText = totalPrc;
        }
        const productTemplate = document.querySelector("#cart__items article"); //Supression de la carte produit de base
        productTemplate.style.display = "none";
      }
}
displayCart();