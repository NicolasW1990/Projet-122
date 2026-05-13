"use strict";

// =============================================
// DONNÉES — tableau d'objets jeux vidéo
// =============================================
let data = [
  {
    id: 35,
    name: "The Witcher 3",
    category: "RPG",
    platform: "PC",
    rating: 9.5,
    year: 2015,
    image: "https://placehold.co/400x300/4a90d9/white?text=The+Witcher+3"
  },
  {
    id: 36,
    name: "Call of Duty Black Ops",
    category: "FPS",
    platform: "Xbox 360",
    rating: 8.7,
    year: 2010,
    image: "https://placehold.co/400x300/e74c3c/white?text=Call+of+Duty+Black+Ops"
  },
  {
    id: 37,
    name: "The Legend of Zelda Breath of the Wild",
    category: "Aventure",
    platform: "Nintendo Switch",
    rating: 9.2,
    year: 2017,
    image: "https://placehold.co/400x300/27ae60/white?text=Zelda+Breath+of+the+Wild"
  },
  {
    id: 38,
    name: "Starcraft II",
    category: "Stratégie",
    platform: "PC",
    rating: 8.5,
    year: 2010,
    image: "https://placehold.co/400x300/f39c12/white?text=Starcraft+II"
  },
  {
    id: 39,
    name: "Elden Ring",
    category: "RPG",
    platform: "PS5",
    rating: 9.0,
    year: 2022,
    image: "https://placehold.co/400x300/4a90d9/white?text=Elden+Ring"
  },
  {
    id: 40,
    name: "Counter Strike 2",
    category: "FPS",
    platform: "PC",
    rating: 8.9,
    year: 2023,
    image: "https://placehold.co/400x300/e74c3c/white?text=Counter+Strike+2"
  },
  {
    id: 41,
    name: "Uncharted 4",
    category: "Aventure",
    platform: "PS4",
    rating: 8.8,
    year: 2016,
    image: "https://placehold.co/400x300/27ae60/white?text=Uncharted+4"
  },
  {
    id: 42,
    name: "Civilization VI",
    category: "Stratégie",
    platform: "PC",
    rating: 8.4,
    year: 2016,
    image: "https://placehold.co/400x300/f39c12/white?text=Civilization+VI"
  },
  {
    id: 43,
    name: "Dark Souls III",
    category: "RPG",
    platform: "PS4",
    rating: 8.6,
    year: 2016,
    image: "https://placehold.co/400x300/4a90d9/white?text=Dark+Souls+III"
  },
  {
    id: 44,
    name: "Valorant",
    category: "FPS",
    platform: "PC",
    rating: 8.3,
    year: 2020,
    image: "https://placehold.co/400x300/e74c3c/white?text=Valorant"
  }
];

// =============================================
// ÉLÉMENTS DU DOM
// =============================================
const divList         = document.getElementById("list");
const inputSearch     = document.getElementById("search");
const selectCategory  = document.getElementById("filter-category");
const selectSort      = document.getElementById("sort-select");
const formAdd         = document.getElementById("form-add");
const inputName       = document.getElementById("input-name");
const inputCategory   = document.getElementById("input-category");
const inputPlatform   = document.getElementById("input-platform");
const inputRating     = document.getElementById("input-rating");
const pFeedback       = document.getElementById("feedback");
const spanNavCount    = document.getElementById("nav-count");

// =============================================
// AFFICHER UN MESSAGE DE FEEDBACK
// =============================================
/**
 * Affiche un message de confirmation pendant 3 secondes
 * @param {string} message - Le texte à afficher
 */
function showFeedback(message) {
  pFeedback.textContent = message;
  pFeedback.classList.remove("hidden");

  // Cache le message après 3 secondes
  setTimeout(function () {
    pFeedback.classList.add("hidden");
  }, 3000);
}

// =============================================
// REFRESH — filtre + tri + affichage
// =============================================
/**
 * Rafraîchit l'affichage en combinant filtre, tri et rendu DOM
 */
function refresh() {
  const query    = inputSearch.value.toLowerCase();
  const category = selectCategory.value;
  const sortVal  = selectSort.value;

  // 1. Filtrer par recherche (nom)
  let result = data.filter(function (jeu) {
    return jeu.name.toLowerCase().includes(query);
  });

  // 2. Filtrer par catégorie (bonus +1 pt)
  if (category !== "") {
    result = result.filter(function (jeu) {
      return jeu.category === category;
    });
  }

  // 3. Trier selon le critère choisi dans le select
  result = result.sort(function (a, b) {
    switch (sortVal) {
      case "rating-asc":  return a.rating - b.rating;
      case "rating-desc": return b.rating - a.rating;
      case "name-asc":    return a.name.localeCompare(b.name);
      case "name-desc":   return b.name.localeCompare(a.name);
      case "year-asc":    return a.year - b.year;
      case "year-desc":   return b.year - a.year;
      default:            return 0;
    }
  });

  // 4. Mettre à jour le compteur dans la nav
  spanNavCount.textContent = result.length + " jeu(x) affiché(s)";

  // 5. Afficher les cartes
  afficherJeux(result);
}

// =============================================
// AFFICHER LES JEUX
// =============================================
/**
 * Génère et injecte les cartes HTML dans le DOM
 * @param {Array} tabJeux - Tableau d'objets jeu à afficher
 */
function afficherJeux(tabJeux) {
  let html = "";

  tabJeux.forEach(function (jeu) {
    html += `
      <article class="card" data-id="${jeu.id}">
        <img src="${jeu.image}" alt="${jeu.name}">
        <div class="card-body">
          <h2>${jeu.name}</h2>
          <p>${jeu.category} — ${jeu.platform} — ${jeu.year}</p>
          <span class="rating">⭐ ${jeu.rating}</span>
          <button class="btn-delete">🗑 Supprimer</button>
        </div>
      </article>
    `;
  });

  divList.innerHTML = html;
}

// =============================================
// ÉVÉNEMENTS
// =============================================

// Recherche en temps réel : à chaque frappe
inputSearch.addEventListener("input", refresh);

// Filtre par catégorie
selectCategory.addEventListener("change", refresh);

// Tri par critère
selectSort.addEventListener("change", refresh);

// Formulaire : ajouter un jeu
formAdd.addEventListener("submit", function (event) {
  event.preventDefault();

  // Validation de la note
  const note = Number(inputRating.value);
  if (!note || note < 1 || note > 10) {
    alert("La note doit être comprise entre 1 et 10.");
    return;
  }

  // Créer le nouvel objet jeu
  const nouveauJeu = {
    id:       Date.now(),
    name:     inputName.value.trim(),
    category: inputCategory.value,
    platform: inputPlatform.value,
    rating:   note,
    year:     new Date().getFullYear(),
    image:    "https://placehold.co/400x300/7f8c8d/white?text=" + encodeURIComponent(inputName.value.trim())
  };

  // Ajouter au tableau de données
  data.push(nouveauJeu);

  // Rafraîchir l'affichage
  refresh();

  // Réinitialiser le formulaire
  formAdd.reset();

  // Afficher un message de confirmation
  showFeedback("✅ \"" + nouveauJeu.name + "\" a été ajouté avec succès !");
});

// Suppression : délégation d'événement sur #list
divList.addEventListener("click", function (event) {
  // Vérifier si le clic est sur un bouton supprimer
  const btnDelete = event.target.closest(".btn-delete");
  if (!btnDelete) return;

  // Récupérer l'id depuis l'article parent
  const card = btnDelete.closest(".card");
  const id   = Number(card.dataset.id);

  // Trouver le nom du jeu pour le message de confirmation
  const jeu = data.find(function (j) { return j.id === id; });

  if (!confirm("Supprimer \"" + jeu.name + "\" ?")) return;

  // Supprimer du tableau avec filter
  data = data.filter(function (j) { return j.id !== id; });

  // Rafraîchir l'affichage
  refresh();

  // Feedback
  showFeedback("🗑 \"" + jeu.name + "\" a été supprimé.");
});

// =============================================
// INITIALISATION — affichage au chargement
// =============================================
refresh();