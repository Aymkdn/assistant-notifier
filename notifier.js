var Client = require('castv2-client').Client;
var DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
var GoogleTTS = require('google-tts-api');
var AssistantNotifier = function(configuration) {
  this.host = configuration.host;
}
AssistantNotifier.prototype.init = function(plugins) {
  this.plugins = plugins;
  if (!this.host) return Promise.reject("[assistant-notifier] Erreur : vous devez configurer ce plugin !");
  return Promise.resolve(this);
};

/**
 * Fonction appelée par le système central
 *
 * @param {String} text Le texte à lire (par exemple: "bonjour et bienvenue")
 */
AssistantNotifier.prototype.action = function(text) {
  var _this=this;
  return new Promise(function(prom_res) {
    // si 'text' commence par '{' alors ça veut dire qu'on veut envoyer à un Google Home bien précis
    text = text.trim();
    var gh=[], names = "tous les Google Home";
    if (text.startsWith('{')) {
      // on envoie à quelques Google Home
      names = text.split('}')[0].slice(1);
      gh = names.split(',').map(function(name) {  // on peut en spécifier plusieurs en les séparant par une virgule
        return _this.host[name.trim()]
      });
      text = text.split('}')[1].trim();
    } else {
      // on envoie à tous les Google Hom
      if (typeof _this.host === 'string') gh = [ _this.host ];
      else { // si pas un 'string', alors c'est un objet
        names = [];
        for (var h in _this.host) {
          names.push(h);
          gh.push(_this.host[h]);
        }
        names = names.join(',');
      }
    }

    console.log("[assistant-notifier] ("+names+") Lecture du message : "+text);
    // on génère le texte
    GoogleTTS(text, "fr-FR", 1)
    .then(function(url) {
      // pour chaque Google Home
      gh.forEach(function(host) {
        var client = new Client();
        client.connect(host, function() {
          client.launch(DefaultMediaReceiver, function(err, player) {
            var media = {
              contentId: url,
              contentType: 'audio/mp3',
              streamType: 'BUFFERED'
            };
            player.load(media, {
              autoplay: true
            }, function(err, status) {
              player.on('status', function(status) {
                if (status.playerState == "IDLE") {
                  player.stop();
                  client.close();
                  prom_res();
                }
              });
            });
          })
        })
      })
    })
  })
};

/**
 * Initialisation du plugin
 *
 * @param  {Object} configuration La configuration
 * @param  {Object} plugins Un objet qui contient tous les plugins chargés
 * @return {Promise} resolve(this)
 */
exports.init=function(configuration, plugins) {
  return new AssistantNotifier(configuration).init(plugins)
  .then(function(resource) {
    console.log("[assistant-notifier] Plugin chargé et prêt.");
    return resource;
  })
}

