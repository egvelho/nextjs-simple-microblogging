create table if not exists user (
    id serial primary key not null,
    email varchar (254) not null,
    username varchar (16) not null,
    firstName varchar (24) not null,
    lastName varchar (32) not null,
    constraint uniqueEmail unique (email),
    constraint uniqueUsername unique (email)
);

create table if not exists post (
    id serial primary key not null,
    message varchar (140) not null,
    userId integer not null,
    foreign key (userId) references (user)
);