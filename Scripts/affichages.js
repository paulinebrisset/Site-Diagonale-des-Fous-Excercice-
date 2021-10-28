/**************Gestion du changement de couleur de la barre de nav **************/
var barrenavigation = document.getElementById("barrenavigation");

window.onscroll = function () {
  if (document.documentElement.scrollTop <1) {
    //documentElement = le HTML
    barrenavigation.style.background = "rgba(0, 0, 0,  0.336)";
  }
  if (document.documentElement.scrollTop > 20) {
    //documentElement = le HTML
    barrenavigation.style.background = "rgba(0, 0, 0, 0.952)";
  }
  if (document.documentElement.scrollTop > 1200) {
    barrenavigation.style.background = "#26348B";
  }
};
/**************Gestion de l'impression de la liste des points de contrôle **************/
var btnListeEcriteControles = document.getElementById("btnListeEcriteControles");
var btnReplierListeControles = document.getElementById("btnReplierListeControles");
var listeControles = null;
var photoHauteur = document.getElementById("photoHauteur");
var bgcontroles = document.getElementById("bgcontroles");

/*******************Publication de la liste écrite des contrôles *********************/
btnListeEcriteControles.addEventListener("click", imprimerListeControles);
btnReplierListeControles.addEventListener("click", gestionBoutonsListeCachee);

function imprimerListeControles() {
  gestionBoutonListePubliee();
  recupererLesPointsDeControle();
  for (var i = 0; i < listeControles.length; i++) {
    creerUnEmplacement();
    majDesTableauxDelements();
    insererLesDonnees(i);
  }
}
function creerUnEmplacement() {
  /******Création des éléments à insérer ******/
  /***Div avec une classe Bootstrap pour le responsive. Une par point de controle***/
  var nouveauPoint = document.createElement("div");
  nouveauPoint.className = "col-12 col-sm-4 col-md-2 nouveauPoint";

  /***Titre et paragraphe du point de controle (nom et cumul km) *****/
  var nouveauTitre = document.createElement("h3");
  nouveauTitre.className = "nomPoint";
  var nouveauCumul = document.createElement("p");
  nouveauCumul.className = "paraPoint";

  /*****Enboîtement des éléments à insérer, puis insertion dans une div déjà préparée dans le HTML de départ****/
  nouveauPoint.appendChild(nouveauTitre);
  nouveauPoint.appendChild(nouveauCumul);
  listeEcriteControles.appendChild(nouveauPoint);
}

function majDesTableauxDelements() {
  nouveauPoint = document.getElementById("nouveauPoint");
  paraPoint = document.querySelectorAll(".paraPoint");
  nomPoint = document.querySelectorAll(".nomPoint");
}

function insererLesDonnees(i) {
  nomPoint[i].textContent = i + 1 + " : " + listeControles[i].poste; //chaque h2 des trois paragraphes en haut reçoit le nom du point de controle
  paraPoint[i].innerHTML =
    "Cumul de kilomètres parcourus : " + listeControles[i].CumulKM; //le paragraphe reçoitle cumul des km jusqu'à ce point
}
function gestionBoutonListePubliee() {
  /*******Gestion des boutons ********/
  bgcontroles.classList.remove("elementCache");
  btnReplierListeControles.classList.remove("elementCache");
  btnReplierListeControles.className =
    "btn btn-outline-danger bouton btn-block gras";
  btnListeEcriteControles.className = "elementCache";
  listeEcriteControles.classList.remove("elementCache");
}

function gestionBoutonsListeCachee() {

  btnListeEcriteControles.classList.remove("elementCache");
  btnListeEcriteControles.className =
    "btn btn-outline-dark bouton btn-block gras";
  btnReplierListeControles.className = "elementCache";
  bgcontroles.classList.add("elementCache");
  listeEcriteControles.innerHTML = "";
}
