const idPanier = document.getElementById('panier');
let prixTotal = document.getElementById('prixTotal');
let camera = JSON.parse(localStorage.getItem('bucket'));
let somme = 0;

console.log(camera);

//Récapitulatif du panier
for (let i = 0; i < camera.length; i++) {
    idPanier.innerHTML +=  `<tr><td>${camera[i].nom}</td> <td>${camera[i].lentille}</td> <td>${camera[i].prix} €</td> <td><a class="remove" href="panier.html">Retirer du panier</a></td></tr>`;
    somme = somme + camera[i].prix;
};

let removeBasket = document.getElementsByClassName('remove');

//Bouton retirer du panier les éléments du localStorage
for(let i = 0; i < removeBasket.length; i++) {
    removeBasket[i].addEventListener("click", function() {
        let cameraDelete = camera[i];
        camera = camera.filter(item => item !== cameraDelete);
        console.log(camera);
        localStorage.bucket = JSON.stringify(camera);
    });
  };

//Affiche le prix total du panier
prixTotal.innerHTML = somme;

//Création d'une variable afin de récupérer l'id des caméras(sera transformer en boucle for, cette variable sert actuellement à tester l'envoie au serveur)
let products = camera[0].id;

let btnForm = document.getElementById("envoieDuFormulaire");

// Au clic, envoie les éléments du formulaire et du panier au serveur
btnForm.addEventListener("click", function (event) {
    event.preventDefault();

      // Création de l'objet contact contenant les coordonnées de l'utilisateur
      let contact = {
        firstName: document.getElementById("nom").value,
        lastName: document.getElementById("prénom").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("email").value,
      };

      // Création de l'objet à envoyer à l'API
      let objet = {
        contact,
        products,
      };

      // Conversion en JSON
      let objetRequest = JSON.stringify(objet);

      // Envoi de l'objet
      var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:3000/api/cameras/order");
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(objetRequest));

      //récupération des données envoyés au serveur
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          console.log(this.responseText);
          localStorage.setItem("order", this.responseText);
          console.log(localStorage.getItem('order'));
          
        } else {
          localStorage.setItem('order', "KO");
        }
      };
});