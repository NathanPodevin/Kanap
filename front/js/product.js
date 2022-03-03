/* On récupère l'id du produit dans l'url pour savoir quelle page produit afficher */
let productUrl = (new URL(window.location)).searchParams;
let productId = productUrl.get('id');
console.log(productId);