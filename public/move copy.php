 <?php
move_uploaded_file($_FILES['fichier']['tmp_name'], './public/img/'.basename($_FILES['fichier']['name']));
$message = "le fichier a bien été stocké, sous le nom ".$_FILES['fichier']['name'];
echo $message;
?>