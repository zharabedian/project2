### Schema

CREATE DATABASE cat_db;
USE cat_db;

CREATE TABLE candidates
(
	candidate id int NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	age varchar(50) NOT NULL,
	party varchar(25) NOT NULL,
	state varchar (50) NOT NULL,
	PRIMARY KEY (candidate id)
);

CREATE TABLE notes (
notes id int NOT NULL AUTO INCREMENT,
candidate id int NOT NULL,
username varchar (30) NOT NULL,
notes varchar (250) NOT NULL,
PRIMARY KEY (notes id)
);

