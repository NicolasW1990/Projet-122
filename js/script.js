"use strict";

// Tableau de données — à générer avec Copilot / une IA
const data = [
  {
    id: 1,
    name: "Ultra Marines",
    category: "Impérium",
    Primarch: "Roboute Guilliman",
    "point inquisition": 9.5,
    year: 2015,
    image: "https://placehold.co/400x300/4a90d9/white?text=Ultra+Marines"
  },
  {
    id: 2,
    name: "Space Wolves",
    category: "Impérium",
    Primarch: "Leman Russ",
    "point inquisition": 8.8,
    year: 2012,
    image: "https://placehold.co/400x300/6b7c99/white?text=Space+Wolves"
  },
  {
    id: 3,
    name: "Black Legion",
    category: "Chaos",
    Primarch: "Abaddon the Despoiler",
    "point inquisition": 7.2,
    year: 2018,
    image: "https://placehold.co/400x300/2c2c2c/white?text=Black+Legion"
  },
  {
    id: 4,
    name: "Thousand Sons",
    category: "Chaos",
    Primarch: "Magnus the Red",
    "point inquisition": 8.1,
    year: 2017,
    image: "https://placehold.co/400x300/d4af37/white?text=Thousand+Sons"
  },
  {
    id: 5,
    name: "Craftworld Iyanden",
    category: "Eldar",
    Primarch: "Prince Yriel",
    "point inquisition": 7.9,
    year: 2014,
    image: "https://placehold.co/400x300/2d5016/white?text=Craftworld+Iyanden"
  },
  {
    id: 6,
    name: "Necron Dynasty",
    category: "Xenos",
    Primarch: "Overlord Zahndrekh",
    "point inquisition": 8.4,
    year: 2011,
    image: "https://placehold.co/400x300/c0c0c0/white?text=Necron+Dynasty"
  },
  {
    id: 7,
    name: "Ork Waaagh",
    category: "Xenos",
    Primarch: "Warboss Ghazhkull",
    "point inquisition": 6.7,
    year: 2019,
    image: "https://placehold.co/400x300/558B2F/white?text=Ork+Waaagh"
  },
  {
    id: 8,
    name: "Imperial Guard 88th",
    category: "Astra Militarum",
    Primarch: "Colonel Cadia",
    "point inquisition": 6.3,
    year: 2013,
    image: "https://placehold.co/400x300/8b4513/white?text=Imperial+Guard+88th"
  },
  {
    id: 9,
    name: "Blood Angels",
    category: "Impérium",
    Primarch: "Dante",
    "point inquisition": 9.1,
    year: 2016,
    image: "https://placehold.co/400x300/8b0000/white?text=Blood+Angels"
  },
  {
    id: 10,
    name: "Tau Ethereals",
    category: "Xenos",
    Primarch: "Ethereal Supreme",
    "point inquisition": 7.6,
    year: 2020,
    image: "https://placehold.co/400x300/4169e1/white?text=Tau+Ethereals"
  }
];


//Récupère la liste #List
const ullist= document.getElementById("List");

//parcours la liste et créer un li par jeu
data.forEach(faction => {
    ullist.innerHTML += '<li>${faction.category}</li>';
})