"use strict";

/*
  "use strict" active le mode strict de JavaScript.
  Concrètement, il rend JavaScript plus exigeant :
  - Il interdit d'utiliser une variable sans la déclarer avec let/const/var
  - Il signale des erreurs qui seraient silencieuses en mode normal
  C'est une bonne pratique à mettre en tout début de fichier.
*/

// =============================================
// DONNÉES — Armées de l'Impérium (Warhammer 40 000)
// =============================================
/*
  "let" permet de déclarer une variable dont la valeur peut changer.
  On utilise "let" ici (et pas "const") car on va modifier ce tableau :
  on y ajoute des armées avec push() et on en supprime avec filter().
  Si on avait utilisé "const", JavaScript nous interdirait de réassigner
  la variable (ce qu'on fait lors d'une suppression : data = data.filter(...)).
*/
let data = [
  {
    id: 1,
    name: "Ultramarines",
    category: "Space Marines",
    puissance: 9.2,
    fondation: 1987,
    image: "img/ultramarine.png"
  },
  {
    id: 2,
    name: "Imperial Fists",
    category: "Space Marines",
    puissance: 8.9,
    fondation: 1987,
    image: "img/Imperial-Fists.jpg"
  },
  {
    id: 3,
    name: "Blood Angels",
    category: "Space Marines",
    puissance: 9.0,
    fondation: 1990,
    image: "img/Blood-Angels.jpg"
  },
  {
    id: 4,
    name: "Space Wolves",
    category: "Space Marines",
    puissance: 8.7,
    fondation: 1991,
    image: "img/space_wolf.jpg"
  },
  {
    id: 5,
    name: "Cadiens",
    category: "Garde Impériale",
    puissance: 7.8,
    fondation: 1993,
    image: "img/Cadia.jpg"
  },
  {
    id: 6,
    name: "Catachans",
    category: "Garde Impériale",
    puissance: 7.5,
    fondation: 1993,
    image: "img/catachan.jpg"
  },
  {
    id: 7,
    name: "Adepta Sororitas",
    category: "Adepta Sororitas",
    puissance: 8.5,
    fondation: 1997,
    image: "img/adeptas_sororitas.jpg"
  },
  {
    id: 8,
    name: "Adeptus Custodes",
    category: "Adeptus Custodes",
    puissance: 9.5,
    fondation: 2017,
    image: "img/Custodes.jpg"
  },
  {
    id: 9,
    name: "Skitarii",
    category: "Adeptus Mechanicus",
    puissance: 8.3,
    fondation: 2015,
    image: "img/Skitariiwebp.webp"
  },
  {
    id: 10,
    name: "Chevaliers Impériaux",
    category: "Chevaliers Impériaux",
    puissance: 9.3,
    fondation: 2014,
    image: "img/Imperial-Knights.jpg"
  },
  {
    id: 11,
    name: "Dark Angels",
    category: "Space Marines",
    puissance: 8.8,
    fondation: 1988,
    image: "img/Dark-Angel.webp"
  },
  {
    id: 12,
    name: "Grey Knights",
    category: "Space Marines",
    puissance: 9.1,
    fondation: 1992,
    image: "img/grey knight.jpg"
  }
];

// =============================================
// RÉCUPÉRATION DES ÉLÉMENTS DU DOM
// =============================================
/*
  On récupère ici les éléments HTML dont on aura besoin dans le script.
  On le fait une seule fois au démarrage et on les stocke dans des constantes.
  C'est plus efficace que d'appeler getElementById() à chaque fois qu'on en a besoin.
  On utilise "const" car ces variables ne changeront jamais : elles pointent
  toujours vers le même élément HTML.
*/
const btnSort        = document.getElementById("btn-sort");
const searchInput    = document.getElementById("search");
const filterCategory = document.getElementById("filter-category");
const form           = document.getElementById("form-add");
const formTitle      = document.getElementById("form-title");
const btnSubmit      = document.getElementById("btn-submit");
const btnCancel      = document.getElementById("btn-cancel");
const inputName      = document.getElementById("input-name");
const inputCategory  = document.getElementById("input-category");
const inputRating    = document.getElementById("input-rating");

// =============================================
// FONCTION : showToast(message)
// =============================================
/*
  Affiche brièvement un message de confirmation en bas à droite.
  On ajoute la classe "visible" pour déclencher l'animation CSS,
  puis on la retire après 2 secondes pour faire disparaître le toast.
  clearTimeout évite les conflits si plusieurs toasts sont déclenchés rapidement.
*/
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2000);
}

// =============================================
// ÉTAT DU TRI
// =============================================
/*
  Cette variable mémorise dans quel sens on trie la liste.
  false = décroissant (le plus puissant en premier) — c'est l'état par défaut.
  true  = croissant (le moins puissant en premier).
  On la déclare avec "let" car elle change à chaque clic sur le bouton de tri.
*/
let sortAsc = false;

// =============================================
// ÉTAT DU MODE ÉDITION
// =============================================
/*
  Cette variable mémorise l'id de l'armée en cours de modification.
  null = on est en mode "ajout" (état par défaut).
  un nombre = on est en mode "modification" de l'armée avec cet id.
  On la déclare avec "let" car elle change quand on clique sur Modifier ou Annuler.
*/
let idEnCours = null;

// =============================================
// FONCTION PRINCIPALE : refresh()
// =============================================
/*
  Cette fonction est le cœur du programme.
  Elle est appelée à chaque fois que quelque chose change :
  une frappe dans la recherche, un clic sur trier, un ajout, une suppression.
  Elle repart toujours du tableau "data" original, filtre, trie, puis affiche.
  Cela garantit que l'affichage est toujours cohérent avec les données réelles.
*/
function refresh() {
  const query    = searchInput.value.toLowerCase();

  /*
    On récupère la valeur du select de filtrage par faction.
    Si l'option choisie est "Toutes les factions", la valeur est ""
    et on n'applique pas de filtre de catégorie.
  */
  const categorie = filterCategory.value;

  // 1. FILTRER par nom (recherche en temps réel)
  let result = data.filter(armee =>
      armee.name.toLowerCase().includes(query)
  );

  // 2. FILTRER par catégorie (si une faction est sélectionnée)
  /*
    On n'applique ce filtre que si categorie n'est pas vide.
    Le "&&" signifie "ET" : les deux conditions doivent être vraies.
    Ainsi, les deux filtres (recherche + catégorie) fonctionnent ensemble.
  */
  if (categorie !== "") {
    result = result.filter(armee => armee.category === categorie);
  }

  // 3. TRIER par puissance
  result = [...result].sort((a, b) =>
      sortAsc ? a.puissance - b.puissance : b.puissance - a.puissance
  );

  // 4. AFFICHER
  afficherArmees(result);
}

// =============================================
// ÉVÉNEMENT : clic sur le bouton de tri
// =============================================
/*
  addEventListener("click", ...) écoute le clic sur le bouton.
  À chaque clic, on inverse la valeur de sortAsc (true ↔ false)
  grâce à l'opérateur "!" qui inverse un booléen.
  Ensuite on met à jour le texte du bouton pour informer l'utilisateur,
  et on rafraîchit l'affichage.
*/
btnSort.addEventListener("click", function () {
  sortAsc = !sortAsc;
  btnSort.textContent = sortAsc ?
      "Trier par puissance ↑ " :
      "Trier par puissance ↓ ";
  refresh();
});

// =============================================
// ÉVÉNEMENT : frappe dans le champ de recherche
// =============================================
/*
  L'événement "input" se déclenche à chaque frappe clavier dans le champ.
  C'est ce qui permet la recherche "en temps réel" : pas besoin de valider,
  la liste se met à jour immédiatement à chaque lettre tapée.
  On lui passe simplement refresh comme fonction à appeler.
*/
searchInput.addEventListener("input", refresh);

// Filtrage par catégorie : à chaque changement du select, rafraîchir
/*
  L'événement "change" se déclenche quand l'utilisateur choisit
  une option différente dans le select.
  Comme pour la recherche, on appelle simplement refresh().
  Les deux filtres sont combinés automatiquement dans refresh().
*/
filterCategory.addEventListener("change", refresh);

// =============================================
// ÉVÉNEMENT : soumission du formulaire (ajout OU modification)
// =============================================
form.addEventListener("submit", function (event) {
  event.preventDefault();

  /*
    On regarde si idEnCours contient un id (mode modification)
    ou s'il vaut null (mode ajout).
    C'est le même formulaire pour les deux cas — seul idEnCours change.
  */
  if (idEnCours !== null) {

    // --- MODE MODIFICATION ---
    /*
      On cherche dans le tableau l'armée dont l'id correspond à idEnCours.
      .find() retourne le premier élément qui correspond, ou undefined si rien.
      Comme on est sûr que l'id existe (on vient de cliquer sur la carte),
      on peut utiliser directement l'objet retourné.
    */
    const armee = data.find(a => a.id === idEnCours);

    // On écrase les propriétés modifiables avec les nouvelles valeurs du formulaire
    armee.name      = inputName.value.trim();
    armee.category  = inputCategory.value;
    armee.puissance = Number(inputRating.value);

    // On remet le formulaire en mode ajout
    quitterModeEdition();
    showToast("✔ Armée modifiée !");

  } else {

    // --- MODE AJOUT ---
    const nouvelleArmee = {
      id: Date.now(),
      name: inputName.value.trim(),
      category: inputCategory.value,
      puissance: Number(inputRating.value),
      fondation: new Date().getFullYear(),
      image: "https://placehold.co/400x300/3a2a0a/white?text=" +
          encodeURIComponent(inputName.value.trim())
    };

    data.push(nouvelleArmee);
    form.reset();
    showToast("✔ Armée ajoutée !");
  }

  refresh();
});

// =============================================
// ÉVÉNEMENT : clic sur "Annuler" (mode modification)
// =============================================
/*
  Quand l'utilisateur clique sur Annuler, on remet tout à zéro :
  le formulaire se vide, le titre revient à "Ajouter une armée",
  et idEnCours repasse à null.
*/
btnCancel.addEventListener("click", quitterModeEdition);

// =============================================
// ÉVÉNEMENT : clics dans la liste (Retirer ou Modifier)
// =============================================
/*
  On utilise la technique de "délégation d'événement" :
  au lieu d'attacher un écouteur sur chaque bouton individuellement,
  on en attache UN SEUL sur le conteneur parent (#list).
  On vérifie ensuite quel bouton a été cliqué avec .closest().
*/
document.getElementById("list").addEventListener("click", function (event) {

  // --- CAS 1 : clic sur "Retirer" ---
  const btnDelete = event.target.closest(".btn-delete");
  if (btnDelete) {
    const card = btnDelete.closest(".card");
    const id   = Number(card.dataset.id);

    if (!confirm("Retirer cette armée du registre impérial ?")) return;

    data = data.filter(armee => armee.id !== id);
    refresh();
    return;
  }

  // --- CAS 2 : clic sur "Modifier" ---
  /*
    On cherche si le clic concernait un bouton .btn-edit.
    Si oui, on récupère l'id de la carte et on entre en mode édition.
  */
  const btnEdit = event.target.closest(".btn-edit");
  if (btnEdit) {
    const card = btnEdit.closest(".card");
    const id   = Number(card.dataset.id);
    entrerModeEdition(id);
  }
});

// =============================================
// FONCTION : entrerModeEdition(id)
// =============================================
/*
  Cette fonction prépare le formulaire pour modifier une armée existante.
  Elle reçoit l'id de l'armée à modifier, trouve l'objet dans le tableau,
  pré-remplit les champs du formulaire, et change le titre + bouton.
*/
function entrerModeEdition(id) {
  // On retrouve l'armée dans le tableau grâce à son id
  const armee = data.find(a => a.id === id);

  // On mémorise l'id en cours pour savoir quoi modifier lors du submit
  idEnCours = id;

  // On pré-remplit le formulaire avec les valeurs actuelles de l'armée
  inputName.value     = armee.name;
  inputCategory.value = armee.category;
  inputRating.value   = armee.puissance;

  // On change le titre et le bouton pour indiquer qu'on est en mode modification
  formTitle.textContent    = "Modifier une armée";
  btnSubmit.textContent    = "Enregistrer";
  btnCancel.style.display  = "inline-block";

  // On ajoute la classe .editing au formulaire pour changer sa couleur (CSS)
  form.classList.add("editing");

  // On fait défiler la page vers le formulaire pour que l'utilisateur le voit
  form.scrollIntoView({ behavior: "smooth" });
}

// =============================================
// FONCTION : quitterModeEdition()
// =============================================
/*
  Cette fonction remet le formulaire dans son état initial (mode ajout).
  Elle est appelée après une modification réussie ou un clic sur Annuler.
*/
function quitterModeEdition() {
  idEnCours = null;

  form.reset();
  formTitle.textContent   = "Ajouter une armée";
  btnSubmit.textContent   = "Ajouter";
  btnCancel.style.display = "none";
  form.classList.remove("editing");
}

// =============================================
// FONCTION D'AFFICHAGE : afficherArmees()
// =============================================
/**
 * Génère et affiche les cartes d'armées dans la page.
 * @param {Array} tabArmees - Tableau d'objets armée à afficher
 */
function afficherArmees(tabArmees) {
  const listEl = document.getElementById("list");

  /*
    On construit le HTML de toutes les cartes dans une seule variable "html".
    On utilise des template literals (les backticks `) pour écrire du HTML
    sur plusieurs lignes avec des variables dedans (${...}).
    C'est bien plus lisible que la concaténation avec des "+".
  */
  let html = "";

  tabArmees.forEach(armee => {
    /*
      data-id="${armee.id}" stocke l'identifiant de l'armée directement dans le HTML.
      On le récupère plus tard lors de la suppression ou modification via card.dataset.id.
      C'est le lien entre la carte affichée et l'objet dans le tableau "data".
    */
    html += `
      <article class="card" data-id="${armee.id}">
        <img src="${armee.image}" alt="${armee.name}">
        <div class="card-body">
          <h2>${armee.name}</h2>
          <p>${armee.category} — ${armee.fondation}</p>
          <span class="rating">${armee.puissance}</span>
          <button class="btn btn-edit">Modifier</button>
          <button class="btn btn-danger btn-delete">Retirer</button>
        </div>
      </article>
    `;
  });

  /*
    On injecte tout le HTML généré en une seule fois dans la page.
    C'est plus performant que d'ajouter les cartes une par une,
    car le navigateur ne redessine la page qu'une seule fois.
  */
  listEl.innerHTML = html;
}

// =============================================
// DÉMARRAGE
// =============================================
/*
  On appelle refresh() une première fois au chargement de la page
  pour afficher toutes les armées dès le début.
  Sans cet appel, la liste serait vide au démarrage.
*/
refresh();