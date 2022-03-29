/* Je récupère l'id de la commande dans l'url pour l'afficher sur ma page confirmation */
let orderUrl = (new URL(window.location)).searchParams;
let urlId = orderUrl.get("id");

let orderId = document.getElementById("orderId");
orderId.textContent = urlId;