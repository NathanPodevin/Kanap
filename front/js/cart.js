let productInStorage = JSON.parse(localStorage.getItem('produit'));

/* J'initialise mes variables pour récupérer les différents éléments de mon html */
let cart = document.getElementById("cart__items");
let dataCart = document.querySelector(".cart__item__content__description p");
let productImgCart = document.querySelector(".cart__item__img");
let productName = document.querySelector(".cart__item__content__description h2");
let totalPrice = document.getElementById("totalPrice");
let totalQuantity = document.getElementById("totalQuantity");
let totalQtt = 0;
let totalPrc = 0;
let quantity = document.getElementById("quantity");
let cartItem = document.querySelector(".cart__item");

/* Je crée ma fonction pour afficher dans mon panier */
function displayCart() {
  if(productInStorage == null || productInStorage == []) {
    cart.innerHTML += 
      ` <section id="cart__items">
             <h2 style="text-align:center">Votre panier est actuellement vide !</h2>
             <p style="text-align:center; margin-bottom:60px">Allez voir notre<a href="./index.html"> catalogue de produit</a></p> 
      </section>`;
    totalPrice.innerText = 0;
    totalQuantity.innerText = 0;
  }
  else {
/* Je crée ma boucle pour chacun des produits de mon localStorage */
    for(let productStored of productInStorage) {    
/* Je récupère les produits de mon Api avec Get */
            fetch(`http://localhost:3000/api/products/${productStored.id}`)
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
/* Je crée mon fonction pour afficher les infos de mes produits dans mon panier */        
        function displayInfo(product) {
/* Je mets en place les calculs pour trouver ma quantité et mon prix total */
          totalQtt += Number(productStored.quantity);
          totalPrc += Number(productStored.quantity) * Number(product.price);
/* J'affiche dans mon html les informations en focntion de mon produit */  
          cart.innerHTML += 
            `<article class="cart__item" data-id="${productStored.id}" data-color="${productStored.color}">
            <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="${product.description}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${productStored.color}</p>
                <p><span id="unit__price">${product.price}</span> € unité</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id="quantity" value="${productStored.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
            </article>` 
          totalQuantity.innerText = totalQtt;
          totalPrice.innerText = totalPrc;
/* Je crée ma function pour modifier la quantité */ 
          function modifyQuantity() {
            let itemQuantity = document.querySelectorAll(".itemQuantity");
            itemQuantity.forEach((item) => {
   
              let itemCart = item.closest("article");
              let itemId = itemCart.dataset.id;
              let itemColor = itemCart.dataset.color;  
              let newQuantity = "";
/* J'ajoute un addEventListener pour répérer quand l'utilisateur change la quantité dans le panier */                  
              item.addEventListener("change", () => {
                newQuantity = Number(item.value);
/* Je crée une boucle pour retrouver le produit en question et je mets à jour la quantité */                 
                for (let i = 0; i < productInStorage.length; i++) {
                  if (itemId == productInStorage[i].id && itemColor == productInStorage[i].color){
                    productInStorage[i].quantity = newQuantity;
                    }
                  }
                localStorage.setItem("produit", JSON.stringify(productInStorage));
                recalc();
              })
            })
          }
          modifyQuantity();
/* Je crée ma function pour recalculer mes totaux */ 
          function recalc() {
            let totalQtt = 0;
            let totalPrc = 0;
            let itemQuantity = document.querySelectorAll(".itemQuantity");
            let unitPrice = document.querySelectorAll(".cart__item__content__description #unit__price");
          
            for (let i = 0; i < itemQuantity.length; i++) {
                let qtt = itemQuantity[i].valueAsNumber;
                let prc = Number(unitPrice[i].innerText);

                totalQtt += qtt;
                totalPrc += qtt * prc;
            }
            totalQuantity.innerText = totalQtt;
            totalPrice.innerText = totalPrc;
          }
          recalc();
/* Je crée ma function pour supprimer un produit de mon panier et de mon localStorage */ 
          function deleteItem() {
            let deleteBtn = document.querySelectorAll(".deleteItem");
            deleteBtn.forEach((btn) => {

              let item = btn.closest("article");
              let itemId = item.dataset.id;
              let itemColor = item.dataset.color;  
/* J'ajoute un addEventListener pour répérer quand l'utilisateur supprime l'article */
              btn.addEventListener("click", () => {
                for (let i = 0; i < productInStorage.length; i++) {
                  if (itemId == productInStorage[i].id && itemColor == productInStorage[i].color){
                    productInStorage = productInStorage.filter((productStored) => productStored.id !== itemId || productStored.color !== itemColor);
                    item.remove();
                    localStorage.setItem("produit", JSON.stringify(productInStorage));
                    recalc();
                  }
                }
              })
            })
          }
          deleteItem();
        }
      }
    }
}
displayCart();




