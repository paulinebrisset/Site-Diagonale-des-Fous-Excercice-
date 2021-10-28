/********************** Carte des points de contrôle *********************/

var btnControles = document.getElementById("btnControles");
var emplacementCarteControles = document.getElementById("emplacementCarteControles");

/********************CARTE DE BASE*******************/
var carteCntrl = L.map("emplacementCarteControles").setView([-21.136393, 55.474006],11);
/* L. = charge la librairie leaflet ; map = méthode utilisée par L, qui permet de créer la carte elle-même
('__') = id est l'argument dont a besoin map pour fonctionner
set view prend une latitude, longitude, 13 est la valeur du zoom par défaut */

/*****************PART 1 REMPLISSAGE DE LA CARTE DES POINTS DE CONTROLES ****************************/

(function () {
  initialiserCarteControles();
})();
/*******************Chargement et mise en place des points de controle ******************/


    function initialiserCarteControles() {
      parametrerLaCarte ();
      recupererLesPointsDeControle();
    }
    function parametrerLaCarte () {
      /*******************Chargement des tuiles = couches de peinture ******************/
      L.tileLayer("https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png", {
          /*On appelle Leafletn on lui demande d'appliquer la méthode tileLayer, qui me sers à ajouter une couche "image" sur ma carte. 
          on lui donne une adresse vers un serveur.  Attribution : infos sur qui fournit la carte*/
          attribution:'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 9,
          maxZoom: 25
      }).addTo(carteCntrl);
    }


    function recupererLesPointsDeControle() {
    //on englobe le flech dans une fonction pour pouvoir l'appeler comme on veut
    //Version contractée
    // fetch("https://polenumerique.re/dl/dwwm2021/ws/m1s4/?q=pc")
    //     .then((reponse) => reponse.json())
    //     .then((dptControlesData) => (listeControles = dptControlesData)) /*https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON*/
    //     //.then (()=> console.log(listeControles[0]))
    //     .catch((error) => alert("Erreur : " + error));
    // }
    //Version plus complète
    fetch("https://polenumerique.re/dl/dwwm2021/ws/m1s4/?q=pc")
        .then(
          function (reponse) { reponse.json()}
        )
        .then(
          function (dptControlesData) {
            (listeControles = dptControlesData)
          }
        ) /*https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON*/
        //.then (()=> console.log(listeControles[0]))
        .catch((error) => alert("Erreur : " + error));
    }


    
    /****************PART2 - DEFINITION DES ICONES ******/
    /*Icone point de controle*/
    var icone = L.icon({
      iconUrl: "assets/img/favicons/controle.png",
      iconSize: [35, 35],
      iconAnchor: [25, 25], //On fait un décalage parce qu'il va encore mettre ça en haut à gauche comme d'hab. on met a 25px du bord gauche et à 50px du bord sup
      popupAnchor: [0, -45],
  });
    /*Icone medecin*/
    var iconeMedecin = L.icon({
      iconUrl: "assets/img/favicons/medecin.png",
      iconSize: [25, 25],
      iconAnchor: [5, 5], 
  });
    /*Icone soupe*/
    var iconeSoupe = L.icon({
      iconUrl: "assets/img/favicons/soupe.png",
      iconSize: [25, 25],
      iconAnchor: [35, 35], 
  });
     /* Icone secours*/
     var iconeSecours = L.icon({
      iconUrl: "assets/img/favicons/secours.png",
      iconSize: [25, 25],
      iconAnchor: [40, 10], 
  });
  
    /****************PART3 - FONCTIONS AJOUTS D ICONES******/
    /****** Points de controle ****/
  btnControles.addEventListener("click",remplirLaCarteControles);
  /**************** Mettre cette icone sur les points de controles ************/

    function remplirLaCarteControles () {  
      for (var i=(listeControles.length-1); i>-1 ; i--) {
          var marqueurControl = L.marker([listeControles[i].lat, listeControles[i].lon],
          { icon: icone }).addTo(carteCntrl);
          marqueurControl.bindPopup("<p>" +"Altitude : " +listeControles[i].Altitude+" mètres").openPopup();
      }
    };

    
    /******Médecins ****/
/*On va chercher dans listeControles tous les postes où medecin n'est pas vide. Si il n'est pas vide, 
on ajoute une icone sur la position du poste*/
   var btnMontrerMedecins=document.getElementById("btnMontrerMedecins");
   btnMontrerMedecins.addEventListener("click", trouverLesMedecins);
  function trouverLesMedecins() {
    for (var i=0; i<listeControles.length; i++){
        if ((listeControles[i].medecin)!=("")){ 
          var marqueurMedecin = L.marker([listeControles[i].lat, listeControles[i].lon],
          { icon: iconeMedecin}).addTo(carteCntrl);;
        }
    } 
  };
      /*****Soupes ****/

      var btnMontrerSoupe=document.getElementById("btnMontrerSoupe");
      btnMontrerSoupe.addEventListener("click", trouverLesSoupes);
     function trouverLesSoupes() {
       for (var i=0; i<listeControles.length; i++){
          if ((listeControles[i].soupe)!=("")){ 
          var marqueurSoupe = L.marker([listeControles[i].lat, listeControles[i].lon],
            { icon: iconeSoupe}).addTo(carteCntrl);;
          }
       } 
     };
      /*****Secours ****/

      var btnMontrerSecours=document.getElementById("btnMontrerSecours");
      btnMontrerSecours.addEventListener("click", trouverLesSecours);
     
      function trouverLesSecours() {
       for (var i=0; i<listeControles.length; i++){
          if ((listeControles[i].Secouriste)!=("")){ 
          var marqueurSecouriste = L.marker([listeControles[i].lat, listeControles[i].lon],
            { icon: iconeSecours}).addTo(carteCntrl);;
          }
       } 
     };
/**********Nettoyer la carte ***********/
var btnViderLaCarte=document.getElementById("btnViderLaCarte");
btnViderLaCarte.addEventListener("click",viderLaCarte);
/*https://leafletjs.com/reference-1.7.1.html#map-eachlayer
https://stackoverflow.com/questions/28646317/how-to-remove-all-layers-and-features-from-map*/
  function viderLaCarte () {
    carteCntrl.eachLayer(function(layer){
      carteCntrl.removeLayer(layer); 
    });
    initialiserCarteControles();
  };