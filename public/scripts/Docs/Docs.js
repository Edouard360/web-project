var Docs = React.createClass({
	render:function(){
		return(
			<article className="markdown-body">
<h2><a id="user-content-github-markdown-css-demo" className="anchor" href="#github-markdown-css-demo" aria-hidden="true"><span className="octicon octicon-link"></span></a>GitHub Markdown CSS demo</h2>

<p><a name="user-content-headers"></a></p><a name="user-content-headers">

</a><h3><a name="user-content-headers"></a><a id="user-content-headers" className="anchor" href="#headers" aria-hidden="true"><span className="octicon octicon-link"></span></a>Headers</h3>

<pre lang="no-highlight"><code># h2
## h3
### H3
#### H4
##### H5
###### H6
</code>
</pre>

Ce site a pour objectif de permettre aux personnes de poster des annonces d’objets qu’elles
 auraient perdus sur le plateau.

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


		</article>
		)
	}
});
