/*J'initialise mon tableau produits qui récupèrera les données de mon Api*/
let products = []

/* Je récupère les produits de mon Api avec Get*/
async function getApi() {
    await fetch("http://localhost:3000/api/products/")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) { 
                return products = data;
        })
        .catch(function(err) {
            console.log("une erreur est survenue", err)
            // Une erreur est survenue
        })
};

/* Fonction pour créer mes cartes produits sur la page d'accueil */
async function productCard() {
    await getApi();
    let items = document.getElementById("items");
    for (let i = 0; i < products.length; i++) {
        items.innerHTML +=
            `<a href="./product.html?id=${products[i]._id}">
              <article>
                <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
                <h3 class="productName">${products[i].name}</h3>
                <p class="productDescription">${products[i].description}</p>
              </article>
            </a>`;
    }
    const productTemplate = document.querySelector("#items a");
    productTemplate.style.display = "none";
}
productCard();