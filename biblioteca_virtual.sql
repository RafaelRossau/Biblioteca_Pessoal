create database biblioteca;
use biblioteca;

create table livros(
id int auto_increment primary key,
titulo varchar(100) not null,
autor varchar(100) not null,
status_leitura varchar(20) default 'Não lido' CHECK (status_leitura IN ('Lido', 'Não lido', 'Lendo','Querendo ler')),
nota int
);