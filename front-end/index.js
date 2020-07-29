const listCamera = document.getElementById('listCamera');
const img = document.querySelector('img');

let Resquest = new XMLHttpRequest();

Resquest.open('GET', 'http://localhost:5500/api/cameras')
Resquest.onload = function() {
  let theData = JSON.parse(Resquest.responseText);
  renderHTML(theData);
};
  
Resquest.send();


function renderHTML(data) {
  for (let i = 0; i < data.length; i++) {
    listCamera.innerHTML += `
    <div class="card" style="width: 25rem;">
    <img class="card-img-top" src = "${data[i].imageUrl}" alt = "image d'un appareil photo ancien"/>
    <div class="card-body">
      <h3 class="card-title">Appareil photo vintage ${data[i].name}</h3>
      <p class="cards__item__body--name"><strong>Marque : </strong>${data[i].name}</p>
      <p class="cards__item__body--lenses"><strong>Lentilles : </strong>${data[i].lenses}</p>
      <p class="card-text"><strong>Description : </strong>${data[i].description}...</p>
      <p class="cards__item__body--price"><strong>Prix : </strong>${data[i].price/100} €</p>
      <div class="cards__item--button">
      <a class="btn btn-primary" href="produit.html?id=${data[i]._id}" aria-label="Sélectionner l’appareil photo vintage ${
      data[i].name
    }">Voir les détails</a>
      </a>
    </div>
    </div>`;
  }

};

