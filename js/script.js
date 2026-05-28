"use strict";

// Tableau de données — Armées de l'Impérium (Warhammer 40 000)
let data = [
  {
    id: 1,
    name: "Ultramarines",
    category: "Space Marines",
    puissance: 9.2,
    fondation: 1987,
    image: "Image/space_wolf.jpg"
  },
  {
    id: 2,
    name: "Imperial Fists",
    category: "Space Marines",
    puissance: 8.9,
    fondation: 1987,
    image: "Image/Imperial-Fists.jpg"
  },
  {
    id: 3,
    name: "Blood Angels",
    category: "Space Marines",
    puissance: 9.0,
    fondation: 1990,
    image: "Image/Blood-Angels.jpg"
  },
  {
    id: 4,
    name: "Space Wolves",
    category: "Space Marines",
    puissance: 8.7,
    fondation: 1991,
    image: "Image/space_wolf.jpg"
  },
  {
    id: 5,
    name: "Cadiens",
    category: "Garde Impériale",
    puissance: 7.8,
    fondation: 1993,
    image: "Image/Cadia.jpg"
  },
  {
    id: 6,
    name: "Catachans",
    category: "Garde Impériale",
    puissance: 7.5,
    fondation: 1993,
    image: "Image/catachan.jpg"
  },
  {
    id: 7,
    name: "Adepta Sororitas",
    category: "Adepta Sororitas",
    puissance: 8.5,
    fondation: 1997,
    image: "Image/adeptas_sororitas.jpg"
  },
  {
    id: 8,
    name: "Adeptus Custodes",
    category: "Adeptus Custodes",
    puissance: 9.5,
    fondation: 2017,
    image:"Image/Custodes.jpg",
  },
  {
    id: 9,
    name: "Skitarii",
    category: "Adeptus Mechanicus",
    puissance: 8.3,
    fondation: 2015,
    image: "Image/Skitariiwebp.webp"
  },
  {
    id: 10,
    name: "Chevaliers Impériaux",
    category: "Chevaliers Impériaux",
    puissance: 9.3,
    fondation: 2014,
    image: "Image/Imperial-Knights.jpg"
  },
  {
    id: 11,
    name: "Dark Angels",
    category: "Space Marines",
    puissance: 8.8,
    fondation: 1988,
    image: "Image/Dark-Angel.webp"
  },
  {
    id: 12,
    name: "Grey Knights",
    category: "Space Marines",
    puissance: 9.1,
    fondation: 1992,
    image: "Image/grey knight.jpg"
  }
];

// Éléments du DOM
const btnSort = document.getElementById("btn-sort");
const searchInput = document.getElementById("search");
const form = document.getElementById("form-add");
const inputName = document.getElementById("input-name");
const inputCategory = document.getElementById("input-category");
const inputRating = document.getElementById("input-rating");

// Sens du tri : false = DESC (puissance élevée en premier)
let sortAsc = false;

/**
 * Rafraîchit l'affichage en combinant filtre + tri
 */
function refresh() {
  const query = searchInput.value.toLowerCase();

  // 1. Filtrer selon le champ de recherche
  let result = data.filter(armee =>
      armee.name.toLowerCase().includes(query)
  );

  // 2. Trier selon l'état du bouton
  result = [...result].sort((a, b) =>
      sortAsc ? a.puissance - b.puissance : b.puissance - a.puissance
  );

  // 3. Afficher
  afficherArmees(result);
}

// Tri : inverser l'état, mettre à jour le bouton, rafraîchir
btnSort.addEventListener("click", function () {
  sortAsc = !sortAsc;
  btnSort.textContent = sortAsc
      ? "Trier par puissance ↑ (ASC)"
      : "Trier par puissance ↓ (DESC)";
  refresh();
});

// Recherche : à chaque frappe, rafraîchir
searchInput.addEventListener("input", refresh);

// Formulaire : ajouter une armée
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nouvelleArmee = {
    id: Date.now(),
    name: inputName.value.trim(),
    category: inputCategory.value,
    puissance: Number(inputRating.value),
    fondation: new Date().getFullYear(),
    image: "https://placehold.co/400x300/3a2a0a/white?text="
        + encodeURIComponent(inputName.value.trim())
  };

  data.push(nouvelleArmee);
  refresh();
  form.reset();
});

// Suppression : délégation sur le conteneur #list
document.getElementById("list").addEventListener("click", function (event) {
  const btn = event.target.closest(".btn-delete");
  if (!btn) return;

  const card = btn.closest(".card");
  const id = Number(card.dataset.id);

  if (!confirm("Retirer cette armée du registre impérial ?")) return;

  data = data.filter(armee => armee.id !== id);
  refresh();
});

/**
 * Affiche les armées dans la page
 * @param {Array} tabArmees - Tableau d'objets armée à afficher
 */
function afficherArmees(tabArmees) {
  const ulList = document.getElementById("list");
  let html = "";

  tabArmees.forEach(armee => {
    html += `
    <article class="card" data-id="${armee.id}">
      <img src="${armee.image}" alt="${armee.name}">
      <div class="card-body">
        <h2>${armee.name}</h2>
        <p>${armee.category} — ${armee.fondation}</p>
        <span class="rating">${armee.puissance}</span>
        <button class="btn btn-danger btn-delete">Retirer</button>
      </div>
    </article>
  `;
  });

  ulList.innerHTML = html;
}

// Affichage initial
refresh();
