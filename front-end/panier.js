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

  let products = [];

  for(let i = 0; i < camera.length; i++){
    products.push(camera[i].id)
  }

  console.log(products);

//Affiche le prix total du panier
prixTotal.innerHTML = somme;

//Création d'une variable afin de récupérer l'id des caméras
let btnForm = document.getElementById("envoieDuFormulaire");

function Verification (){

  //données de l'utilisateur
  let firstName = document.getElementById("nom").value;
  let lastName =  document.getElementById("prénom").value;
  let address = document.getElementById("adresse").value;
  let city = document.getElementById("ville").value;
  let email = document.getElementById("email").value;

  // RegExp
  let regExpMail = /.+@.+\..+/;
  let regExpString = /^[A-Z]{1}[a-z]/;
  let regExpAdress = /^[^@&"()!_$*€£`%+=\/;?#]+$/;

  //Test des données de l'utilisateur
  if (regExpString.test(firstName) == false) {
    alert("Votre nom doit commencer par une majuscule suivis de minuscules");
    return false;
  } else if (regExpString.test(lastName) == false) {
    alert("Votre prénom doit commencer par une majuscule suivis de minuscules");
    return false;
  } else if (regExpMail.test(email) == false) {
    alert("Votre email doit être au format exemple@mail.com");
    return false;
  } else if (regExpAdress.test(address) == false) {
    alert(
      `Votre adresse contient un ou plusieurs des caractères interdits suivants : ` +
        '[^@&"()!_$*€£`%+=/;?#]' +
        " ou n'est pas renseignée."
    );
    return false;
  } else if (regExpString.test(city) == false) {
    alert(
      "Le nom de votre ville doit commencer par une majuscule suivis de minuscules"
    );
    return false;
  } else {
    return true;
  }
};

// Au clic, envoie les éléments du formulaire et du panier au serveur
btnForm.addEventListener("click", function (event) {
    event.preventDefault();

    if (Verification() == true && localStorage.getItem('bucket').length > 2){
      // Création de l'objet contact contenant les coordonnées de l'utilisateur
      const contact = {
        "firstName": document.getElementById("nom").value,
        "lastName": document.getElementById("prénom").value,
        "address": document.getElementById("adresse").value,
        "city": document.getElementById("ville").value,
        "email": document.getElementById("email").value,
      };

      const order = {
        contact,
        products
      };
      
      console.log(order);

      // Envoi de l'objet
      let request = new XMLHttpRequest();
      request.open("POST", "http://localhost:5500/api/cameras/order");

      // récupération des données envoyés au serveur
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          console.log(this.responseText);
          localStorage.setItem("order", this.responseText);
          console.log(localStorage.getItem('order'));
          window.location.href = "confirmation.html";
        } else {
          localStorage.setItem('order', "KO");
        }
      };
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(order));
    }
});

 