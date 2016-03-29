var Docs = React.createClass({
	render:function(){
		return(
			<div className="container doc">
			<article className="markdown-body">

<h1><a id="user-content-h1" className="anchor" href="#h1" aria-hidden="true"><span className="octicon octicon-link"></span></a>Documentation</h1>
<h2><a id="user-content-h2" className="anchor" href="#h2" aria-hidden="true"><span className="octicon octicon-link"></span></a>Objectif du projet</h2>
<p>Le Site <strong>Objet perdus</strong> que nous avons réalisé a pour objectif de 
permettre aux personnes sur le <strong>plateau</strong> de déclarer un objet qu'il aurait perdu et
de <strong>spécifier le ou les endroits où ils pensent l'avoir perdu</strong>
.</p>

<h2><a id="user-content-h2" className="anchor" href="#h2" aria-hidden="true"><span className="octicon octicon-link"></span></a>Base de données</h2>

<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Table Utilisateur :</h3>
Un utilisateur a plusieurs champs : idu, nom, prenom, identifiant, mdp, et un booléan qui 
représente si l’utilisateur est admin.

<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Table Lieu:</h3>
Un lieu a plusieurs champs : idl, tag (une manière d’identifier cet objet), lat et lng (qui sont 
des entiers représentant la latitude et la longitude du lieu).

<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Table Objet : </h3>
<p>Un objet a plusieurs champs : ido, nom, description, date, lostBy (qui correspond à l’ID de la 
personne qui à perdu l’objet), foundBy (qui correspond à l’ID de la personne qui à trouvé 
l’objet).</p>
<p>
La table objet a donc 2 FOREIGN CONSTRAINTS avec la table Utilisateur, la première ne 
pouvant être NULL, puisqu’un objet a forcément été perdu par quelqu’un. D’ailleurs si cet 
utilisateur est détruit par un administateur, tous ses objets sont aussi détruits (condition ON 
DELETE CASCADE). Par contre pour un autre utilisateur ayant declaré avoir trouvé cet objet, 
s’il est détruit, l’objet reste dans la BDD (condition ON DELETE SET NULL).</p>

<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Table Enregistrementobjetlieu :</h3>
<p>Un enregistrement a plusieurs champs : idr, idl (id du lieu considéré), ido (id de l’objet 
considéré).</p>
<p>
Cette table permet de modéliser une relation n to n, entre la table Objet et la table Lieu. 
Lorsque vous perdez quelque chose, vous n’êtes pas sûr du lieu dans lequel vous avez perdu 
l’objet. Ce pourrait être au bobar, en Amphi Laguarrigue, ou au Magnan. Un Objet peut donc 
avoir été perdu possiblement dans plusieurs lieux ; similairement, dans un lieu, plusieurs 
objets peuvent avoir été perdus.</p>
<p>
La table a donc 2 FOREIGN CONSTRAINTS correspondant a l’id du lieu et l’id de l’objet.</p>

<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Table Message : </h3>
<em>
Une table de messages avait été envisagé entre les utilisateurs modélisant aussi la relation n 
to n.
</em>

<h2><a id="user-content-h2" className="anchor" href="#h2" aria-hidden="true"><span className="octicon octicon-link"></span></a>Fonction PHP</h2>
<p>Chaque table a sa classe PHP correspondante.</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Classe Database: </h3>
<p>
La classe Database permet simplement, par un appel statique a la fonction connect(), de 
retourner un objet PDO. Cet objet sera passé en argument à toute les fonctions qui agissent 
sur la BDD.
</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Classe Utilisateur : </h3>

<p>Cette classe a des fonctions statiques et dynamiques.</p>

<h5>FONCTIONS STATIQUES : </h5>
<p>
On peut créer un utilisateur, se connecter, et récupérer un utilisateur en fonction de son ID 
de session.
</p><p>
Se connecter retourne l’instance correspondante de la classe utilisateur.
</p><p>
Lors d’une inscription, on veut pouvoir être connecté immédiatement après la soumission 
du formulaire, donc la fonction créerUnUtilisateur appelle la fonction seConnecter.
</p><p>
On veut pouvoir récupérer la liste de tous les utilisateurs.
</p>
<h5>FONCTIONS DYNAMIQUES:</h5> 
<p>
Lorsqu’un utilisateur a perdu un objet et qu’il soumet le formulaire, on récupère l’instance
 correspondant à cet utilisateur via son identifiant de session.  On peut ensuite enregistrer 
l’objet perdu de manière dynamique !
</p><p>
On veut qu’un administrateur puisse supprimer un utilisateur ou le rendre administrateur. 
Lorsque l’on récupère l’instance de l’utilisateur, on vérifie donc dans un premier lieu que 
celui-ci est admin, avant de performer l’UPDATE, ou le DELETE.
</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Classe Objet: </h3>
<h5>FONCTION STATIQUE : </h5> 
<p>
On veut pouvoir récupérer la liste d’objet perdus avec toute les informations qui sont
 complémentaires (INNER JOIN sur les tables Utilisateurs et Lieux).
</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Classe Lieu: </h3>
<h5>FONCTIONS STATIQUES : </h5>
<p>
On veut pouvoir récupérer la liste des lieux, ajouter un lieu, et supprimer un lieu. 
</p>

<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Classe Helpers: </h3>
<h5>FONCTION STATIQUE : </h5>
<p>
Pour chaque formulaire, on veut pouvoir filtrer ce qui a été soumis (vérifier en particulier que chaque champ a bien été rempli). 
La fonction filter_input_array, utilisée avec INPUT_POST, et des callbacks adéquats, permet de rendre un tableau PHP avec les 
mêmes clés que POST, mais avec des valeurs qui correspondent aux messages d’erreur adaptés.
</p>
<h2><a id="user-content-h2" className="anchor" href="#h2" aria-hidden="true"><span className="octicon octicon-link"></span></a>Le fichier server.php</h2>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>.htaccess</h3>
<p>Toutes les requêtes sont redirigées vers le fichier server.php. 
La base est réécrite /MODAL/ correspondant au domaine d’adressage de l’application 
(mais vous pouvez la modifier). Les fichiers php ne sont pas accessibles en statique par l’utilisateur, 
et ne sont pas desservis en statique (comme le fait Apache si on ne lui précise aucun restriction).</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Le fichier server.php</h3>
<p>Contrairement à ce qui a été suggéré dans le TD2 du MODAL web, nous avons fait le choix 
de prendre le modèle de « contrôleur » pour le fichier central de notre application, server.php. 
Ce fichier pourrait être considéré comme un équivalent d’index.php. 
À l’aide d’un fichier .htaccess d’Apache, on redirige toutes les demandes vers 
ce server.php, qui s’occupe de les traiter, comme le ferait un contrôleur standard dans une application web.</p><p>
Nous tenons à prouver que, malgré cette décision personnelle, le projet est tout aussi bien structuré ainsi.</p><p>
Toute requête au serveur, ou plus spécialement à la base de données, se caractérise par une URL, et une 
méthode http qui la caractérise : GET, PUT, POST, DELETE – comme le veut le standard d’application en architecture REST.</p><p>
On regroupe ainsi les requêtes similaires :</p><p>
Connexion en GET, rendrait la vue correspondante, c’est à dire le formulaire de Connexion</p><p>
Connexion en POST, correspondrait à l’envoi d’un formulaire, et donnant une réponse dépendant de la vérification des paramètres du formulaires (error ou result). </p><p>
Connexion en PUT, correspondrait à une tentative de connexion à partir de l’identifiant de session, et retournerait l’objet JSON Utilisateur correspondant à l’utilisateur connecté, nom, prénom.</p><p>
Pour la page d’erreur, à défaut de parcourir un tableau et de regarder si la page demandée en est une clé, on écrit à la fin du switch sur 
les urls un default, qui retourne effectivement un page de redirection.</p><p>
C’est une pratique de routage utilisée par de nombreux frameworks, dont nous avons voulu nous inspirer. </p>
<h2><a id="user-content-h2" className="anchor" href="#h2" aria-hidden="true"><span className="octicon octicon-link"></span></a>LA VUE – JAVASCRIPT – REACTJS</h2>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>MOTIVATION :</h3>
<p>En vue de mon stage 2A d’informatique où je travaillerai en Javascript avec des outils qui m’ont déjà été spécifiés, 
je désirais m’essayer à l’un d’entre eux, React. Je vous pris de ne pas voir cette initiative d’un mauvais œil, mais plutôt 
de considérer ceci comme une tentative de prolongement du projet et de curiosité dans le domaine des applications WEB. Étant 
donné la quantité de travail supplémentaire imposée par ce défi, je vous prie d’être indulgent envers cette décision.</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Qu’est-ce que React ?</h3>
<p>React est l’API que Facebook utilise pour son application côté client. React permet de réaliser, ce que l’on appelle 
la View dans le Model MVC. Ce n’est pas un framework, dans le sens où React ne donne aucune organisation particulière au 
code. C’est simplement une librairie Javascript pour faire des interfaces utilisateurs.</p><p>
React permet une abstraction du Document Object Model (le DOM), permettant une programmation plus simple, et des performances 
accrues. Faire du Javascript sur des éléments virtuels Javascript qui représentent le DOM, est plus perfomant que de faire 
des opérations directement sur le document Object Model.</p><p>
React donne la possibilité de créer vos propres composants qui seront réutilisables plus tard et/ou peuvent être combinés. 
Définir et manipuler ses composants devient très simple.</p><p>
React utilise une syntaxe spéciale appelée JSX, proche de XML, et qui vous permet de mélanger en quelque sorte du HTML et du JavaScript. </p><p>
Ce dernier critère est, de prime abord, effrayant, ces deux sphères étant traditionnellement séparées... Si vous regardez ce code sur Netbeans, par exemple, toutes les parties non logiques et 
purement DOM virtuel seront soulignés (on n’aime pas les balises HTML en plein code Javascript).</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Dans notre projet...</h3>
<h5>Sécurité</h5>
<p>Avoir écrit toute la vue en Javascript, ne permet cependant pas à n’importe qui (en particulier quelqu’un de non connecté) d’avoir accès à nos données, ou de les modifier, car toute requête faite au serveur, 
vérifie toujours l’identité de l’utilisateur côté PHP.</p>
<h5>Transmission de données à partir de la Base</h5>
<p>La quasi-totalité des informations transitant entre le navigateur et le serveur sont au format JSON (Javascript Object Notation), et sont interprétées de manière asynchrone grâce à des 
procédures AJAX (AsynchronousJavascript And XML).</p>
<h5>SPA (single page application)</h5>
<p>On peut naviguer sur le site sans jamais recharger la page !</p>
<h2><a id="user-content-h2" className="anchor" href="#h2" aria-hidden="true"><span className="octicon octicon-link"></span></a>Dossier public/scripts</h2>
<p>Tous les fichiers écrit en ReactJS sont dans ce dossier.</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Dossier : public/scripts/Utilisateur</h3>
<p>Pour commencer par un groupe simple de composants; prenons le composant Utilisateur, le composant UtilisateurEdit, et le 
composant ListeUtilisateur. Le composant Utilisateur effectue juste un rendu de ses propriétés. Le composant UtilisateurEdit 
rend un composant Utilisateur ainsi que deux boutons supplémentaires. Si ces boutons sont cliqués, ils appellent chacun une 
des fonction qui leur est passé en propriété par Utilisateur. Le composant Utilisateur charge toutes les données utilisateurs, les 
affiches dans un composant UtilisateurEdit, et possède aussi des fonctions qui correspondent à des appels asynchrones AJAX.</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Dossier : public/scripts/Lieu</h3>
<p>Nous avons implémenté l’API GOOGLE MAPS dans LieuMap.js.</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Fichier : public/scripts/App/App.js</h3>
<p>Fichier central de l’application React. Lors du chargement de la page, ce composant appelle la connexion, et charge les lieux. Son état se caractérise par l’onglet sélectionné. 
Ce composant est rendu après l’appel du script de Google API, ce qui permet d’utiliser des Maps dans notre application.</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Fichier : public/scripts/Filter/FilterBar.js</h3>
<p>Une fonctionnalité de filtre figure dans les pages lieux et des objets et permet une recherche instantanée des objets en fonction du nom. Ceci est réalisé à l’aide du changement
d’état de la Liste (ListeAffiche ou ListeLieu). La value de l’input correspond en effet à l’état de la Liste. 
Dès lors que l’état change, le composant doit donner un nouveau rendu : c’est le tableau des lieux filtré avec la fonction filterJavascript.</p>
<h3><a id="user-content-alt-h3" className="anchor" href="#alt-h3" aria-hidden="true"><span className="octicon octicon-link"></span></a>Dossier : public/scripts/Affiche</h3>
<p>Correspond au premier onglet de la barre de navigation ainsi que la page d’accueil du site. C’est là que tous les objets perdus sont affichés.
ListeAffiche correspond au composant qui contient la FilterBar et la liste des Objets, et charge en asynchrone, toutes les données sur les objets depuis la BDD.
Dans ObjetForm (formulaire pour déclarer la perte d’un objet), nous avons également implémenté une barre d’autocomplétion à la main, grâce à ReactJS.
</p>

		</article>
		</div>
		)
	}
});
