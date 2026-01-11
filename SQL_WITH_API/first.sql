create database dalta_app;
use dalta_app;
create table temp(
    id varchar(50) primary key,
    username varchar(50) not null,
    email varchar(50),
    password varchar(50) unique
    );