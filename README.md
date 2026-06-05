# Armées de l'Impérium — Warhammer 40 000

Projet JavaScript — Cours C122 (ESIG 2025-2026)

## Description

Application web pour gérer une collection d'armées de l'univers Warhammer 40 000 (factions de l'Impérium).
J'ai choisi cette ressource car je suis passionné par cet univers et je voulais mélanger le coté apprentissage JAVA, HTML 
et CSS à celui-ci trier et gérer les différentes factions impériales avec leurs caractéristiques.
Chaque armée possède un nom, une faction, une puissance de guerre (1–10), une année de fondation et une image.

## Lien GitHub Pages

[Colle ici le lien de ton site en ligne]

## Fonctionnalités

- [x] Affichage dynamique de la liste (cartes avec image, nom, faction, puissance)
- [x] Tri par puissance de guerre (ASC / DESC)
- [x] Recherche en temps réel par nom
- [x] Filtrage par faction (bonus +1 pt)
- [x] Ajout d'une armée via formulaire avec validation
- [x] Suppression avec confirmation
- [x] Modification d'une armée existante (bonus +1 pt)
- [x] Responsive (mobile + desktop)

## Captures d'écran



## Transparence IA
- Je me suis grandement inspiré de l'IA au point de Commit mon WORKTREES claude afin de voir la structure que celui-ci peut avoir
### Outils utilisés

- Claude (Anthropic) — utilisé pour générer et corriger le CSS responsive (media queries),
  déboguer des erreurs JSHint, et corriger des problèmes de structure HTML (balise `<ul>` / `<article>`)
- Mammouth IA (Mammouth) — utilisé pour la génération de la structure de base du projet (HTML/CSS/JS)

### Prompts utilisés

- "Génère le CSS responsive pour mon projet Warhammer avec (768px et 480px)"
- "Explique-moi comment créer le squelette HTML de mon projet Warhammer avec une section pour les cartes d'armées, un formulaire d'ajout, et une barre de recherche"
- "Corrige et explique-moi les avertissements JSHint W014 sur les opérateurs ? et + en début de ligne"
- "Comment je rajoute un feedback visuel (toast) après l'ajout et la modification d'une armée"
- "Corrige la structure HTML : ul contenant des article est invalide et explique-moi comment tu as fais"

### Ce que j'ai appris vs ce que l'IA a généré

- Généré par l'IA : la partie responsive (media queries `@media`), le composant toast (HTML/CSS/JS), les corrections de structure et de syntaxe JSHint
- Écrit par moi : toute la logique JavaScript (affichage, tri, recherche, filtrage, ajout, suppression, modification), la structure HTML principale, le design CSS thématique Warhammer (variables, cartes, formulaire, boutons)
- Appris grâce à l'IA : j'ai mieux compris pourquoi les opérateurs ternaires et de concaténation doivent être en fin de ligne en JavaScript strict, et pourquoi `<article>` ne peut pas être enfant direct d'un `<ul>`
### Note sur les commentaires

Le code JavaScript contient volontairement un grand nombre de commentaires détaillés.
Ce choix est personnel : les commentaires m'ont servi d'outil de compréhension et de rappel tout au long
du développement, pour m'approprier chaque concept (closures, délégation d'événements,
manipulation du DOM, etc.) et pouvoir me y référer facilement.
