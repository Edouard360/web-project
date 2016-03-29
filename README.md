# Modal WEB: Objets Perdus

Ceci est la version finale de notre projet MODAL !

## Configuration importante !

Il y a trois étapes à la configuration du projet.

* Dans classes/Database.php, rentrez **vos propres paramètres** de BDD.

* Changer le fichier .htaccess. La directive : RewriteBase /MODAL/ doit être changé en RewriteBase /nomDeVotreFichier/, en spécifiant **le nom du fichier dans lequel vous allez déployer l'application**.

* Lors du lancement de l'application via NetBeans, le document ne possèdant pas de fichier index.php, il vous est demandé de référencer un autre fichier. Vous pouvez mettre **server.php**, par exemple (en réalité toutes les requêtes sont dirigées vers ce fichier).


## Utilisation

L'application est à l'adresse '/' quel que soit le fichier dans lequel vous êtes placé. L'application redirige les requêtes vers server.php au moyen du fichier .htaccess.

### Réalisateurs

Fait par

```
Hugo Masse
Edouard Mehlman
```