/* On récupère l'id du produit dans l'url pour savoir quelle page produit afficher */
let productUrl = (new URL(window.location)).searchParams;
let productId = productUrl.get("id");

/*J'initialise mes variables qui récupèreront les données de mon Api*/
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

let addCart = document.getElementById("addToCart");
/*Ajout d'un addEventListener pour quand l'utilisateur clique sur "Ajouter au panier"*/
addCart.addEventListener('click', () => {
/*On initialise notre objet avec les informations qu'on voudra récupérer dans le localStorage*/
    let infoCart = {
        id: productId,
        color: colors.value,
        quantity: quantity.value,
    }
    addStorage(infoCart);
    console.log(infoCart);
/*On crée notre fonction pour envoyer les produits dans le localStorage*/
    function addStorage(){
/*On crée notre pop up pour informer les utilisateurs qu'ils ont bien ajouté le produit au panier*/
    const popupValidation = () => {
        if(window.confirm(
`Le produit a bien été ajouté !
Voulez-vous aller au panier ?`)) {
        window.location.href = "cart.html";
        }
        else {
        }
    }

    let productInStorage = JSON.parse(localStorage.getItem('produit'));
/*Je crée mes conditions pour l'ajout dans le localStorage*/
/*Si mon localStorage est vide j'initialise un tableau qui récupèrera les infos*/
    if(productInStorage == null){
        productInStorage = [];
        productInStorage.push(infoCart); 
        localStorage.setItem('produit', JSON.stringify(productInStorage));
        popupValidation();
    }
/*Je vérifie si mon nouveau produit a la même couleur et le même ID qu'un produit déjà stocké dans le localStorage*/
    else if(productInStorage){
        let getProduct = productInStorage.find(
            (element) =>
              element.id == infoCart.id && element.color == infoCart.color);
/*Si oui j'ajoute que la nouvelle quantité*/        
        if (getProduct){
            getProduct.quantity = Number(infoCart.quantity) + Number(getProduct.quantity);
            localStorage.setItem('produit', JSON.stringify(productInStorage));
            popupValidation();
        } 
/*Sinon j'ajoute le produit*/        
        else {
            productInStorage.push(infoCart); 
            localStorage.setItem('produit', JSON.stringify(productInStorage));
            popupValidation();
            }
        }
    }
});
