
/* sequences */
/* A remplacer lostBy par lostBy */
use ProjetModal

DROP TABLE IF EXISTS Utilisateur;
CREATE TABLE Utilisateur(idu SMALLINT AUTO_INCREMENT, nom CHAR(15), prenom CHAR(15), 
	identifiant CHAR(15) UNIQUE, mdp CHAR(15), admin BOOLEAN,
	CONSTRAINT pk_Personne PRIMARY KEY (idu));

DELETE FROM Utilisateur;
ALTER TABLE Utilisateur AUTO_INCREMENT = 1;
INSERT INTO Utilisateur (nom,prenom,identifiant,mdp,admin) VALUES ("mehlman","edouard","ed","ed",1);
INSERT INTO Utilisateur (nom,prenom,identifiant,mdp,admin) VALUES ("masse","hugo","ms","ms",0);
SELECT * FROM Utilisateur;


DROP TABLE IF EXISTS Objet;
CREATE TABLE Objet(ido SMALLINT AUTO_INCREMENT,lostBy SMALLINT, foundBy SMALLINT, nom CHAR(15),description CHAR(100), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	CONSTRAINT pk_Objet PRIMARY KEY (ido),
 	CONSTRAINT fk_Utilisateur FOREIGN KEY(lostBy) REFERENCES Utilisateur(idu) ON DELETE CASCADE,
 	CONSTRAINT fk_Finder FOREIGN KEY(foundBy) REFERENCES Utilisateur(idu) ON DELETE SET NULL);

DELETE FROM Objet;
ALTER TABLE Objet AUTO_INCREMENT = 1;
INSERT INTO Objet (lostBy,nom,description) VALUES (1,"portable","bleu");
INSERT INTO Objet (lostBy,nom,description) VALUES (2,"voiture","rouge");
INSERT INTO Objet (lostBy,nom,description) VALUES (2,"sac","jaune");
INSERT INTO Objet (lostBy,nom,description) VALUES (2,"avion","vert");
SELECT * FROM Objet;


DROP TABLE IF EXISTS Lieu;
CREATE TABLE Lieu(idl SMALLINT AUTO_INCREMENT, tag CHAR(25), lat DECIMAL(10,7), lng DECIMAL(10,7)
	CONSTRAINT pk_Lieu PRIMARY KEY (idl));

DELETE FROM Lieu;
ALTER TABLE Lieu AUTO_INCREMENT = 1;
INSERT INTO Lieu (tag) VALUES ("bobar");
INSERT INTO Lieu (tag) VALUES ("bataclan");
INSERT INTO Lieu (tag) VALUES ("bassin d'eau");
INSERT INTO Lieu (tag) VALUES ("local bas");
INSERT INTO Lieu (tag) VALUES ("lac");
INSERT INTO Lieu (tag) VALUES ("amphi Poincare");
INSERT INTO Lieu (tag) VALUES ("amphi Monge");
INSERT INTO Lieu (tag) VALUES ("magnan");
SELECT * FROM Lieu;


DROP TABLE IF EXISTS Enregistrementobjetlieu;
CREATE TABLE Enregistrementobjetlieu(idr SMALLINT AUTO_INCREMENT, idl SMALLINT, ido SMALLINT,
	CONSTRAINT pk_Enregistrement PRIMARY KEY (idr),
	CONSTRAINT fk_Lieu FOREIGN KEY(idl) REFERENCES Lieu(idl) ON DELETE SET NULL,
	CONSTRAINT fk_Objet FOREIGN KEY(ido) REFERENCES Objet(ido) ON DELETE CASCADE
	);

DELETE FROM Enregistrementobjetlieu;
ALTER TABLE Enregistrementobjetlieu AUTO_INCREMENT = 1;
INSERT INTO Enregistrementobjetlieu (idl,ido) VALUES (1,2);
INSERT INTO Enregistrementobjetlieu (idl,ido) VALUES (2,4);
INSERT INTO Enregistrementobjetlieu (idl,ido) VALUES (3,3);
INSERT INTO Enregistrementobjetlieu (idl,ido) VALUES (4,3);
SELECT * FROM Enregistrementobjetlieu;

DROP TABLE IF EXISTS Message;
CREATE TABLE Message(idm SMALLINT AUTO_INCREMENT, destinataire SMALLINT, emetteur SMALLINT, texte TINYTEXT,
	CONSTRAINT pk_Enregistrement PRIMARY KEY (idm),
	CONSTRAINT fk_1 FOREIGN KEY(destinataire) REFERENCES Utilisateur(idu),
	CONSTRAINT fk_2 FOREIGN KEY(emetteur) REFERENCES Utilisateur(idu)
	);

DELETE FROM Message;
ALTER TABLE Message AUTO_INCREMENT = 1;
INSERT INTO Message (destinataire,emetteur,texte) VALUES (2,2,"Sinon j'ai retrouvé ton objet mec !");
SELECT * FROM Message;

SELECT nom FROM Objet WHERE nom LIKE "V%" ORDER BY nom LIMIT 4;