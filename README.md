# assistant-notifier

Ce plugin de [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/) permet de faire parler son Google Home.

**Ne pas l'installer si vous ne possédez pas de Google Home !**

## Installation

Si vous n'avez pas installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), alors il faut le faire, et sélectionner **notifier** comme plugin.

Si vous avez déjà installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), et que vous souhaitez ajouter ce plugin, alors :
  - Pour Windows, télécharger [`install_notifier.bat`](https://github-proxy.kodono.info/?q=https://raw.githubusercontent.com/Aymkdn/assistant-notifier/master/install_notifier.bat&download=install_notifier.bat) dans le répertoire `assistant-plugins`, puis l'exécuter en double-cliquant dessus.  
  - Pour Linux/MacOS, ouvrir une console dans le répertoire `assistant-plugins` et taper :  
  `npm install assistant-notifier@latest --save --loglevel error && npm run-script postinstall`

## Configuration

### Paramètre `host` (obligatoire)

Éditer le fichier `configuration.json` du répertoire `assistant-plugins` et y indiquer l'adresse IP de votre Google Home.

L'adresse IP du Google Home se trouve sur l'application Google Home de votre téléphone :

  1. Ouvrir l'application Home de Google  
  2. Cliquer sur l'icône du Google Home souhaité  
  3. Cliquer sur l'icône "roue dentée" en haut à droite pour accéder aux **Paramètres**  
  5. Descendre tout en bas jusqu'à la section **Informations**  
  6. Utiliser l'adresse IP qui est donnée (tout en bas)
  
La section du fichier `configuration.json` qui nous intéresse devrait ressembler à la partie ci-dessous (ici on va dire que l'IP est 192.168.0.13) :
```javascript
  "plugins": {
    "notifier": {
      "host":"192.168.0.13"
    }
  }
```

Si **vous avez plusieurs Google Home**, il est possible de les configurer puis de les cibler. Pour ce faire, le fichier de configuration doit ressembler à ça (indiquer un nom et l'IP associée pour chaque device) :
```javascript
  "plugins": {
    "notifier": {
      "host": {
        "salon":"192.168.0.13",
        "cuisine":"192.168.0.14",
        "chambre d'alexandre":"192.168.0.10",
        "chambre des parents":"192.168.0.11"
      }
    }
  }
```

### Paramètre `voice` (optionnel)

Par défaut, `notifier` utilise la voix produite par le site https://translate.google.fr. Suite à la proposition de [jzarca01](https://github.com/jzarca01/) il est également possible d'utiliser la voix d'IBM ([qu'il est possible de tester/écouter ici](https://text-to-speech-demo.ng.bluemix.net/)).

Pour cela il faut s'inscrire et obtenir une clé :
  1. Se rendre sur https://www.ibm.com/watson/services/text-to-speech/
  2. Cliquer sur **"Get Started for Free"**
  3. S'inscrire puis valider son email
  4. On utilisera le plan gratuit qui permet la synthèse de 10 000 lettres par mois
  5. Une fois connecté au site, choisir **Francfort** pour *"Sélectionnez une région/un emplacement où effectuer le déploiement"* (**ATTENTION** si le mauvais serveur est sélectionné, votre clé ne fonctionnera pas)
  6. Une fois Francfort choisi pour le serveur, il faut cliquer sur le bouton "Créer" en bas à droite
  7. Vous devriez tomber sur une page qui indique **"Clé API"** et qu'il est possible de copier en cliquant sur l'icone à droite
  8. Dans le fichier `configuration.json` on va alors inscrire la `source` (à savoir *"IBM@fr-FR_ReneeVoice"*) et la `key` :

```javascript
"plugins": {
  "notifier": {
    "host": "192.168.0.13",
    "voice":{
      "source":"IBM@fr-FR_ReneeVoice",
      "key":"la clé API récupérée sur le site IBM"
    }
  }
}
```

## Utilisation

Son intérêt est surtout d'être appelé par les autres plugins (par exemple dans le plugin `assistant-freebox`) grâce à : `this.plugins.notifier("message à faire dire")`

Sinon, depuis IFTTT, voici un exemple de comment procéder :

  1. Suivre la procédure principale pour vérifier que `assistant-plugins` est bien lancé  
  2. Créer une nouvelle *applet* dans IFTTT : [https://ifttt.com/create](https://ifttt.com/create)  
  3. Cliquer sur **this** puis choisir **Google Assistant**  
  4. Choisir la carte **Say a phrase with a text ingredient**  
  5. Dans *« What do you want to say? »* mettre une phrase, par exemple : `répète la phrase $`  
     Le symbôle `$` sera remplacé par Google  
  6. Remplir les autres champs de la carte  
  7. Maintenant, cliquer sur **that** puis choisir **Pushbullet**  
  8. Choisir la carte **Push a Note**  
  9. Dans le champs *« Title »*, mettre `Assistant`  
  10. Dans le champs *« Message »*, mettre `notifier_\{\{TextField\}\}` (si plusieurs Google Home sont configurés, ils diffuseront tous le message)  
      Si **plusieurs Google Home** configués, pour en cibler un ou plusieurs il faudra utiliser la notation suivante : `notifier_{NOM_GH1,NOM_GH2} message à lire`...  
      Par exemple : `notifier_{salon,chambre d'alexandre} il est l'heure du dîner... à table !`  
  11. Enregistrer puis cliquer sur **Finish**  
  12. Dites : « OK Google, répète la phrase voilà une belle journée »  
  13. Google Home va dire : « voilà une belle journée »  
