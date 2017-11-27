# Notifier

Ce plugin de [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/) permet de faire parler son Google Home.

## Installation

  1. Installer [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/) si ce n'est pas déjà fait
  2. Pour Windows, télécharger [`install_notifier.bat`](https://github-proxy.kodono.info/?q=https://raw.githubusercontent.com/Aymkdn/assistant-notifier/master/install_notifier.bat&download=install_notifier.bat) dans le répertoire `assistant-plugins`, puis l'exécuter en double-cliquant dessus.  
  Pour Linux/MacOS, ouvrir une console dans le répertoire `assistant-plugins` et taper : `npm install assistant-notifier`  

## Configuration

Éditer le fichier `configuration.json` et y indiquer l'adresse IP de votre Google Home.

Cette information se trouve sur l'application Google Home de votre téléphone :

  1) Ouvrir l'application Google Home
  2) Cliquer sur l'icône en haut à droite (*un téléviseur avec une enceinte*)
  3) Votre appareil Google Home devrait apparaitre
  4) Cliquer sur les *trois points* de votre appareil et choisir **Paramètres**
  5) Descendre tout en bas jusqu'à la section **Informations**
  6) Utiliser l'adresse IP qui est donnée (tout en bas normalement)

## Utilisation

Son intérêt est surtout d'être appelé par les autres plugins (par exemple dans le plugin `assistant-tam`) grâce à : `this.plugins.notifier("message à faire dire")`

Sinon, depuis IFTTT, voici un exemple de comment procéder :

  0) Suivre la procédure principale pour vérifier que `assistant-plugins` est bien lancé
  1) Créer une nouvelle *applet* dans IFTTT : [https://ifttt.com/create](https://ifttt.com/create)
  2) Cliquer sur **this** puis choisir **Google Assistant**
  3) Choisir la carte **Say a phrase with a text ingredient**
  4) Dans *« What do you want to say? »* mettre une phrase, par exemple : `répète la phrase $`
     Le symbôle `$` sera remplacé par Google
  5) Remplir les autres champs de la carte
  6) Maintenant, cliquer sur **that** puis choisir **Pushbullet**
  7) Choisir la carte **Push a Note**
  8) Dans le champs *« Title »*, mettre `Assistant`
  9) Dans le champs *« Message »*, mettre `notifier_{{TextField}}`
  10) Enregistrer puis cliquer sur **Finish**
  11) Dites : « OK Google, répète la phrase voilà une belle journée »
  12) Google Home va dire : « voilà une belle journée »
