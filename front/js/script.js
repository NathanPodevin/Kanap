/*J'initialise mon tableau produits qui récupèrera les données de mon Api*/
let products = []

/* Je récupère les produits de mon Api avec Get*/
fetch("http://localhost:3000/api/products/")
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
});