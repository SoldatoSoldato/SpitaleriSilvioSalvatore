CREATE DATABASE AutoConcessonaria;
USE AutoConcessonaria;
CREATE TABLE Clienti(
ID INT NOT NULL AUTO_INCREMENT,
CF VARCHAR(30) NOT NULL,
Nome VARCHAR(30) NOT NULL,
Cognome VARCHAR(30) NOT NULL,
Sesso VARCHAR(2) NOT NULL,
Indirizzo VARCHAR(30) NOT NULL,
DataNascita DATE NOT NULL,
Telefono INT NOT NULL,
Email VARCHAR(30) NOT NULL,
PRIMARY KEY(ID)
) ENGINE=InnoDB;
CREATE TABLE RivenditoriAuto(
ID INT NOT NULL AUTO_INCREMENT,
CF VARCHAR(30) NOT NULL,
Nome VARCHAR(30) NOT NULL,
PIva VARCHAR(30) NOT NULL,
Indirizzo VARCHAR(2) NOT NULL,
Email VARCHAR(30) NOT NULL,
Telefono INT NOT NULL,
Descrizione VARCHAR(30) NOT NULL,
PRIMARY KEY(ID)
) ENGINE=InnoDB;
CREATE TABLE Vetture(
ID INT NOT NULL AUTO_INCREMENT,
Marca VARCHAR(30) NOT NULL,
Modello VARCHAR(30) NOT NULL,
Colore VARCHAR(30) NOT NULL,
NumPorte INT NOT NULL,
NumTelaio INT NOT NULL,
Targa VARCHAR(30) NOT NULL,
Prezzo DOUBLE NOT NULL,
IDCliente INT NOT NULL,
IDRivenditoreAuto INT NOT NULL,
PRIMARY KEY(ID),
FOREIGN KEY(IDCliente) REFERENCES Clienti(ID),
FOREIGN KEY(IDRivenditoreAuto) REFERENCES RivenditoriAuto(ID)
) ENGINE=InnoDB;