/************Afficher les trois coureurs en tête *****************/
/*********** HTML : Section tetesDeCourse ***********/

var listeChampion=null;
var courreursEnTete = document.getElementById("courreursEnTete");

(function () {
    recupererLesDonneesCoureurs();
  })();

function recupererLesDonneesCoureurs () {
        fetch("https://polenumerique.re/dl/dwwm2021/ws/m1s4/?q=top3")
            .then((reponse) => reponse.json())
            .then((donnees) => listeChampion = donnees)
            .then (() => publierLesDonneesCoureurs ())
            .then (() => initialiserCarteCoureurs())
            .then (() => initialiserLesMarqueursCoureurs ())
            .then (()=> console.log(listeChampion))
            .catch( error => alert("Oups ! Il y a une erreur, repassez plus tard"));            
};

/***************Affichage des noms et numéros de dossards des courreurs ***********/
    function publierLesDonneesCoureurs () {
        for (var i=0;i<listeChampion.length;i++){
            creerUnEmplacementCoureur ();
            majDesTableauxDelementsCoureur ();
            insererLesDonneesCoureur (i);
        };
    };

        function creerUnEmplacementCoureur () {
                    /******Création des éléments à insérer ******/
                    /**Une div par champion**/
                    var nouveauChampion = document.createElement("div");
                    nouveauChampion.className = ("card col-12 col-sm nouveauChampion");

        /***Un titre , une photo et un paragraphe par courreur *****/
                var nomChampion = document.createElement("h3");
                    nomChampion.className = ("nomChampion");    
                var photoChampion = document.createElement("img");
                    photoChampion.className=("photoChampion");   
                var nouveauDossard = document.createElement("p");
                    nouveauDossard.className= ("paraDossard");

        /*****Enboîtement des éléments à insérer, puis insertion dans une div déjà préparée dans le HTML de départ****/
                    nouveauChampion.appendChild(photoChampion);            
                    nouveauChampion.appendChild(nomChampion);
                    nouveauChampion.appendChild(nouveauDossard); 
                    courreursEnTete.appendChild(nouveauChampion);
            };
        function majDesTableauxDelementsCoureur () {
            /******On récupère les nouvelles sections dans un tableau pour pouvoir y insérer du contenu****/
            nouveauChampion = document.getElementById("nouveauChampion");
            nouveauDossard = document.querySelectorAll(".paraDossard");
            nomChampion = document.querySelectorAll (".nomChampion");
            photoChampion = document.querySelectorAll (".photoChampion");
        };

        function insererLesDonneesCoureur (i) {
            nomChampion[i].textContent=("Numéro "+(i+1)+" : "+listeChampion[i].nom +" "+listeChampion[i].prenom); 
            nouveauDossard[i].innerHTML=("Numéro de dossard : " + listeChampion[i].dossard);
           /***********Insertion de la photo grace au numéro de dossard**************/
            var urlPhoto=("https://polenumerique.re/dl/dwwm2021/ws/m1s4/photos/photo_"+(listeChampion[i].dossard)+".png");
            var altPhoto=("Photo de "+listeChampion[i].nom +" "+listeChampion[i].prenom);
            photoChampion[i].setAttribute("src", urlPhoto);
            photoChampion[i].setAttribute("alt", altPhoto);
        };

/************Gestion de la carte*****************/

var emplacementCarteCoureurs = document.getElementById("emplacementCarteCoureurs");

    function initialiserCarteCoureurs () { 

        /*******************Initialisation de la carte ******************/
        carteCoureurs = L.map('emplacementCarteCoureurs').setView([listeChampion[0].lat, listeChampion[0].lat], 14);
        L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
    /*On appelle Leafletn on lui demande d'appliquer la méthode tileLayer, qui me sers à ajouter une couche "image" sur ma carte. 
    on lui donne une adresse vers un serveur.  Attribution : infos sur qui fournit la carte*/
    attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 13,
            maxZoom: 25,
        }).addTo(carteCoureurs);   
    };

    function initialiserLesMarqueursCoureurs () {
        /*************** Définition de l'icone qui marque les  coureurs *******/
        var iconeSport =L.icon({
                    iconUrl:"assets/img/favicons/sportive.png",
                    iconSize: [50,50],
                    iconAnchor: [25, 50],//On fait un décalage parce qu'il va encore mettre ça en haut à gauche comme d'hab. on met a 25px du bord gauche et à 50px du bord sup
                    popupAnchor: [0,-45]
                })
        /**************** Mettre cette icone sur leur emplacement ************/

       for (var i=(listeChampion.length-1); i>-1;i--) {
            var marqueurControl= L.marker([listeChampion[i].lat, listeChampion[i].lon],{icon: iconeSport}).addTo(carteCoureurs);
                    /*On ajoute aussi une pop-up qui reçoit les nom et prénom du coureur*/
            marqueurControl.bindPopup("<p>"+listeChampion[i].nom+ " "+ listeChampion[i].prenom+"</p>").openPopup();;        
        };
    };