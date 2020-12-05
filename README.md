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

### Paramètre `volume` (optionnel)

Il est possible de définir le volume du message qui sera lu par le Google Home. Il doit s'agir d'un nombre entre 0 et 100 (représentant le pourcentage du volume). Si ce paramètre n'est pas spécifié, alors le message est lu avec le volume courant du Google Home.

Par exemple, pour que le message soit lu à 80% du volume : 
```javascript
"plugins": {
  "notifier": {
    "host": "192.168.0.13",
    "volume": 80
  }
}
```

### Paramètre `voice` (optionnel)

Par défaut, `notifier` utilise la voix produite par le site https://translate.google.fr. Il est aussi possible d'utiliser d'autres voix.

#### IBM

On peut utiliser la voix d'IBM que l'on peut [tester/écouter ici](https://text-to-speech-demo.ng.bluemix.net/).

Pour utiliser cette voix, il faut s'inscrire et obtenir une clé :
  1. Se rendre sur https://www.ibm.com/watson/services/text-to-speech/
  2. Cliquer sur **"Get Started for Free"**
  3. S'inscrire puis valider son email
  4. On utilisera le plan gratuit qui permet la synthèse de 10 000 lettres par mois ([voir les tarifs](https://www.ibm.com/cloud/watson-text-to-speech/pricing))
  5. Une fois connecté au site, choisir **Francfort** pour *"Sélectionnez une région/un emplacement où effectuer le déploiement"* (**ATTENTION** si le mauvais serveur est sélectionné, votre clé ne fonctionnera pas)
  6. Une fois Francfort choisi pour le serveur, il faut cliquer sur le bouton "Créer" en bas à droite
  7. Vous devriez tomber sur une page qui indique **"Clé API"** et qu'il est possible de copier en cliquant sur l'icone à droite
  8. Dans votre fichier `configuration.json` on va alors inscrire la `source` (à savoir *"IBM@fr-FR_ReneeVoice"*) et la `key` :

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

#### Google text-to-speech

Google fournit plusieurs voix différentes. Elles sont [listées sur cette page](https://cloud.google.com/text-to-speech/docs/voices?hl=fr).

Pour utiliser une des voix de Google, il faut :
  1. Aller sur https://console.cloud.google.com/projectselector2/home/dashboard?hl=fr et créer un projet
  2. S'assurer que votre compte Google Cloud a la facturation activée via https://cloud.google.com/billing/docs/how-to/modify-project?hl=fr – jusqu'à 4 millions de caractères gratuits par mois ([voir les tarifs](https://cloud.google.com/text-to-speech/pricing?hl=fr))
  3. Activer l'API Cloud Text-to-Speech via https://console.cloud.google.com/flows/enableapi?apiid=texttospeech.googleapis.com&hl=fr
  4. Créer une clé API via https://console.developers.google.com/apis/credentials
  5. Dans votre fichier `configuration.json` on va alors inscrire la `source` (à savoir *"google-cloud/text-to-speech@nom-de-la-voix"*) et la `key` créée à l'étape 4 :

Par exemple, si on veut utiliser la voix *fr-FR-Wavenet-B* listée sur [la page des voix](https://cloud.google.com/text-to-speech/docs/voices?hl=fr) :
```javascript
"plugins": {
  "notifier": {
    "host": "192.168.0.13",
    "voice":{
      "source":"google-cloud/text-to-speech@fr-FR-Wavenet-B",
      "key":"la clé API"
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

### Options

Il existe différentes façons d'utiliser `notifier_` dans la notification Pushbullet : 

#### Lecture d'un texte

Par défaut, vous pouvez simplement passer du texte ; celui-ci sera converti en un MP3 qui sera ensuite lu par l'appareil.

Exemple :
```
notifier_Ceci est le texte qui sera lu
```

#### Lecture d'un MP3 via une URL

Il est également possible de fournir une URL (qui doit commencer par _http_) vers un fichier MP3. Dans ce cas, le MP3 sera directement lu par l'appareil.

Exemple :
```
notifier_https://mon.site.com/public/mon_son.mp3
```

#### Lecture d'un autre type de média

Pour lire un autre type de média, par exemple une image sur votre appareil qui possède un écran, vous devrez indiquer le type de média entre crochets.

Exemple :
```
notifier_[image/jpeg]https://mon.site.com/public/mon_image.jpeg
```

#### Cibler un appareil en particulier

Si vous possédez plusieurs appareils, mais ne souhaitez qu'enclencher la lecture sur l'un d'eux, vous devez utiliser les accolades.

Exemple :
```
notifier_{salon} Message qui sera lu
notifier_{cuisine}[image/jpeg]https://mon.site.com/public/image_recette.jpeg
```

## Lancer en ligne de commande

Il est possible de lancer `assistant-notifier` depuis [une ligne de commande](https://github.com/Aymkdn/assistant-plugins/wiki/Utiliser-le-programme-en-ligne-de-commande).
