---
description: Quelques notions de base sur l'authentification dans un contexte web
---

# Principes généraux d'authentification

L'authentification est un sujet complexe qui dépasse très largement le scope de ce tutoriel.

Néanmoins, il y a quelques notions liées à l'authentification que nous pouvons aborder afin de les
mettre en pratique dans notre application.

## Cookies

Commençons par un rapide rappel : un "cookie" est de la donnée stockée sur votre navigateur pour un
nom de domaine particulier. Une des particularités des cookies est qu'ils sont systématiquement
envoyés au serveur avec n'importe quelle requête qu'un navigateur fait vers le domaine associé. En
général, les cookies possèdent une durée de vie.

Les serveurs sont capables de demander aux navigateurs de stocker des cookies, ce qui fait que c'est
un outil adapté pour authentifier automatiquement un utilisateur, sans que celui-ci doive se
re-connecter.

> Les cookies servent à bien d'autres choses que l'authentification. Ils sont notamment utilisés
> pour le tracker les habitudes des gens.

Dans le cadre d'une authentification, un cookie est simplement un _token_ – c'est-à-dire une chaîne
de caractères uniques – agissant à la fois comme un login et un mot de passe : la présence de ce
cookie suffit à authentifier une personne.

Pour simplifier, voici ce qu'il se passe la plupart du temps lors d'un processus de connexion
impliquant des cookies :

<!-- TODO: schema -->

- quelqu'un visite un site
- cette personne s'identifie via un formulaire de connexion, entrant son e-mail et son mot de passe
- le serveur reçoit les informations de connexion et vérifie qu'elles sont valides
- le serveur crée un cookie unique permettant d'identifier la personne sans mot de passe
- le serveur envoie une réponse contenant les informations personnelles de la personne, en incluant
  un header `Set-Cookie` avec le cookie créé
- le navigateur reçoit la réponse, puis stocke le cookie comme demandé
- la personne quitte le site
- la personne revient sur le site
- lors de la requête du navigateur, le cookie est envoyé au serveur
- le serveur reçoit le cookie avec la requête, vérifie s'il est valide et à quelle personne il
  correspond, puis renvoie la réponse avec les informations de connexion de la personne
- le navigateur reçoit la réponse : la personne est authentifiée sans avoir eu besoin de se
  connecter

> Un processus plus solide d'authentification via cookies impliquerait ce qu'on appelle un `token`
> et un `refreshToken`.

## Authentification vs Autorisation

Il est important de bien distinguer _Authentification_ et _Autorisation_.

Les deux concepts sont liés mais ne font pas du tout la même chose.

L'**authentification** consiste à déterminer l'identité de la personne visitant une ressource, afin
de lui afficher des informations personnalisées.

L'**autorisation** consiste à déterminer si une personne a le droit ou non d'accéder à une
ressource, de la modifier ou de la supprimer.

Nous allons mettre en pratique ces deux notions de manière simplifiée dans les chapitres à venir.
