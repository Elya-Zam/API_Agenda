create database agenda;


use agenda;

create table contato(
id int not null auto_increment primary key,
nome varchar(100) not null,
telefone varchar(11) not null,
email varchar(100) not null
);

insert into contato(nome, telefone, email) values
('Vanessa', '69987456022', 'vanessinha@gmail.com'),
('João', '69984556377', 'joao@gmail.com'),
('Kaio Jorje', '69984552034', 'kaioJorje@gmail.com');

SELECT * FROM agenda.contato;