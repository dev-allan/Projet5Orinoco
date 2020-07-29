let prixTotalCommande = document.getElementById('prixTotalCommande');
let ordreDeLaCommande = document.getElementById('ordreDeLaCommande');

let localStorageOrder = JSON.parse(localStorage.getItem("order"));

console.log(localStorageOrder.products[0].price/100);

let prixTotal = 0;

for (let i = 0; i < localStorageOrder.products.length; i++){
    prixTotal = prixTotal + localStorageOrder.products[i].price/100;
};

console.log(prixTotal);

prixTotalCommande.innerHTML = "Votre commande s'éléve à un total de : " + prixTotal + "€";
ordreDeLaCommande.innerHTML = "L'ordre de votre commande est : " + localStorageOrder.orderId;

let finDeCommande = document.getElementById("finDeCommande");

finDeCommande.addEventListener('click', function(event){
    event.preventDefault();
    localStorage.clear();
    window.location.href = "index.html";
});