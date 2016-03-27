<?php
session_start();
?>
<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8"/>
        <meta name="author" content="Hugo Masse et Edouard Mehlman"/>
        <meta name="keywords" content="Objets perdus trouvés"/>
        <meta name="description" content=""/>
        <title>Objets Perdus</title>
        <script src="./JS/jquery.js"></script>
        <script src="./JS/bootstrap.min.js"></script>
        <link rel="stylesheet" href="./Style/bootstrap.min.css">
        <link rel="stylesheet" href="./Style/newcss.css">
        <script src="JS/loadTables.js"></script>
        <script src="JS/1.js"></script>
    </head>

    <body>

        <!-- construction du formulaire -->

        


        <div class="container">
            <ul class="nav navbar-nav" >
                <li><a href="#"><span class="glyphicon glyphicon-user"></span> S'inscrire</a></li>
               
                <li><a href="#accueil" ><button type="button" class="btn btn-primary">Recherche avancée</button></a></li>
                <li><a href="#info"><button type="button" class="btn btn-primary">Statistiques</button></a></li>
                <li><a href="#contact"><button type="button" class="btn btn-primary">Contact</button></a></li>
            </ul>
        </div>

        <br>
        <form class="form-inline" role="form">
            <div class="form-group">       
                <div class="input-group">
                    <div class="input-group-addon">Nom de l'Objet</div>
                    <input type="text" class="form-control" id="nomo" placeholder="Nom de l'Objet">
                </div>
                <div class="input-group">
                    <div class="input-group-addon">Lieu</div>
                    <input type="text" class="form-control" id="lieu" placeholder="Lieu">
                </div>
                <div class="input-group">
                    <div class="input-group-addon">Description</div>
                    <input type="text" class="form-control" id="description" placeholder="Description">
                </div>
                <div class="input-group">
                    <div class="input-group-addon">État</div>
                    <input type="text" class="form-control" id="etat" placeholder="État">
                </div>
                <div class="form-group">    
                <button type="submit" id="loguer" class="btn btn-primary">Loguer</button>
                </div>
            </div>
        </form>
        <br>

        
        <form action="/MODAL/Test6" method="post" enctype="multipart/form-data">
            <input type="file" name="fichier"/>
            <br>
            <input type="submit" value="soumettre la photo" />
        </form>

       
    </body>
</html>


