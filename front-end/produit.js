const detailDuProduit = document.getElementById('descriptionCamera');
const img = document.querySelector('img');

let params = new URLSearchParams(document.location.search);
let id = params.get('id');

let Request = new XMLHttpRequest();

Request.open('GET', "http://localhost:5500/api/cameras/"+id, true)
Request.onload = function() {
  let theData = JSON.parse(Request.responseText);
  renderHTML(theData);
};
  
Request.send();

let indexCamera = [];

function renderHTML(data) {

    detailDuProduit.innerHTML += `<div class="cards__item__thumb">
      <img src = "${data.imageUrl}" alt = "image d'un appareil photo ancien" style="heigth:500px; width:500px;"/>
      </div>
      <div class="cards__item__body">
        <h3 class="cards__item__body--title"><input type="hidden" name="Nom du produit" value="${data.name}" id="${data.name}">${data.name}</h3>
        <p class="cards__item__body--name"><strong>Marque : </strong>${data.name}</p>
        <p class="cards__item__body--lenses"><strong>Lentilles : </strong>${data.lenses}</p>
        <p class="cards__item__body--description"><strong>Description : </strong>${data.description}...</p>
        <p class="cards__item__body--price"><input type="hidden" name="Prix" value="${data.price/100}" id="${data.price/100}"><strong><strong>Prix : </strong>${data.price/100}€</p>
        <div class="cards__item--button">
        </a>
      </div>
      </div>`;

    for (let i = 0; i < data.lenses.length; i++) {
      detailDuProduit.innerHTML +=  `<input type="radio" name="lentille" id="lentilleChecked" value="${data.lenses[i]}" id="${data.lenses[i]}" /> <label for="${data.lenses[i]}">${data.lenses[i]}</label><br />`
    };

    detailDuProduit.innerHTML += `<button type="submit" id="button">Ajouter au panier</button>`;

    let button = document.getElementById('button');

    button.addEventListener("click", function(event){
      event.preventDefault();

      let lentille = document.querySelector('input[name=lentille]:checked');

      if (lentille == null){
        alert("Vous devez chosir une lentille avant d'ajouter votre produit au panier");
        console.log(lentille.checked);
      };

      let camera = {
        id : id,
        nom : data.name,
        description : data.description,
        prix : data.price/100,
        lentille : lentille.value,
      };
      
      if (localStorage.getItem("bucket")) {
        let parse = JSON.parse(localStorage.getItem("bucket"));
        parse.push(camera);
        localStorage.bucket = JSON.stringify(parse);
        alert("Votre produit a été ajouté au panier");
      } else {
        indexCamera.push(camera);
        localStorage.setItem("bucket", JSON.stringify(indexCamera));
        alert("Votre produit a été ajouté au panier");
      }
    });
};

/////