DROP DATABASE IF EXISTS menu_genius;

CREATE DATABASE menu_genius
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_hungarian_ci;

USE menu_genius;

-- tables
-- Table: Allergen
CREATE TABLE Allergen (
    ID int NOT NULL AUTO_INCREMENT,
    szam dec(3,1)  NOT NULL,
    nev varchar(30)  NOT NULL,
    CONSTRAINT PRIMARY KEY (ID)
);

-- Table: Alapanyag
CREATE TABLE Alapanyag (
    ID int  NOT NULL AUTO_INCREMENT,
    nev varchar(100)  NOT NULL,
    raktaron decimal(4,2)  NOT NULL,
    m_egyseg varchar(10)  NOT NULL,
    CONSTRAINT PRIMARY KEY (ID)
);

-- Table: alapanyag_allergen
CREATE TABLE alapanyag_allergen (
    Alapanyag_ID int  NOT NULL,
    Allergen_ID int  NOT NULL,
    FOREIGN KEY (Alapanyag_ID) REFERENCES Alapanyag(ID),
    FOREIGN KEY (Allergen_ID) REFERENCES Allergen(ID),
    CONSTRAINT PRIMARY KEY (Alapanyag_ID,Allergen_ID)
);

-- Table: Kategoria
CREATE TABLE Kategoria (
    ID int  NOT NULL AUTO_INCREMENT,
    nev varchar(20)  NOT NULL,
    CONSTRAINT PRIMARY KEY (ID)
);

-- Table: Tetel
CREATE TABLE Tetel (
    ID int  NOT NULL AUTO_INCREMENT,
    nev varchar(255)  NOT NULL,
    leiras text  NULL,
    Kategoria_ID int  NOT NULL,
    mennyiseg varchar(20)  NOT NULL,
    ar int  NOT NULL,
    etel_e bool  NOT NULL,
    kep varchar(50)  NOT NULL,
    FOREIGN KEY (Kategoria_ID) REFERENCES Kategoria(ID),
    CONSTRAINT PRIMARY KEY (ID)
);

-- Table: tetel_alapanyag
CREATE TABLE tetel_alapanyag (
    Tetel_ID int  NOT NULL,
    Alapanyag_ID int  NOT NULL,
    FOREIGN KEY (Tetel_ID) REFERENCES Tetel(ID),
    FOREIGN KEY (Alapanyag_ID) REFERENCES Alapanyag(ID),
    CONSTRAINT PRIMARY KEY (Alapanyag_ID,Tetel_ID)
);

-- Table: Asztal
CREATE TABLE Asztal (
    ID int  NOT NULL AUTO_INCREMENT,
    ferohely int  NOT NULL,
    CONSTRAINT PRIMARY KEY (ID)
);

-- Table: Foglalas
CREATE TABLE Foglalas (
    ID int  NOT NULL AUTO_INCREMENT,
    vendegszam int  NOT NULL,
    erkezes timestamp  NOT NULL,
    tavozas timestamp  NULL,
    nev varchar(50)  NOT NULL,
    telefon varchar(20)  NOT NULL,
    Asztal_ID int  NOT NULL,
    FOREIGN KEY (Asztal_ID) REFERENCES Asztal(ID),
    CONSTRAINT PRIMARY KEY (ID)
);

-- Table: Felhasznalo
CREATE TABLE Felhasznalo (
    ID int  NOT NULL AUTO_INCREMENT,
    nev varchar(50)  NOT NULL,
    email varchar(30)  NOT NULL,
    jelszo text  NOT NULL,
    telefon varchar(20)  NOT NULL,
    admin bool  NOT NULL,
    CONSTRAINT PRIMARY KEY (ID)
);

-- Table: Rendeles
CREATE TABLE Rendeles (
    ID int  NOT NULL AUTO_INCREMENT,
    Felhasznalo_ID int  NULL,
    datum timestamp  NOT NULL,
    fizetendo int  NOT NULL,
    statusz enum('megrendelve', 'elkészítve', 'felszolgálva')  NOT NULL,
    fizetve bool  NOT NULL,
    Asztal_ID int  NOT NULL,
    FOREIGN KEY (Felhasznalo_ID) REFERENCES Felhasznalo(ID),
    FOREIGN KEY (Asztal_ID) REFERENCES Asztal(ID),
    CONSTRAINT PRIMARY KEY (ID)
);

-- Table: tetel_rendeles
CREATE TABLE tetel_rendeles (
    ID int  NOT NULL AUTO_INCREMENT,
    Tetel_ID int  NOT NULL,
    Rendeles_ID int  NOT NULL,
    db int  NOT NULL,
    CONSTRAINT PRIMARY KEY (ID)
);

CREATE TABLE EsemenyNaplo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    esemeny_tipus VARCHAR(30) NOT NULL,
    erintett_tabla VARCHAR(30) NOT NULL,
    erintett_id INT NOT NULL,
    esemeny text,
    datum datetime NOT NULL
);