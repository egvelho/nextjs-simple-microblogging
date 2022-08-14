drop table if exists posts;
drop table if exists users;

create table if not exists "users" (
    "id" serial primary key not null,
    "email" varchar (254) unique not null,
    "username" varchar (64) unique not null,
    "firstName" varchar (24) not null,
    "lastName" varchar (32) not null,
    "avatar" text not null,
    "createdAt" timestamp not null default now()
);

create table if not exists "posts" (
    "id" serial primary key not null,
    "message" varchar (140) not null,
    "userId" integer not null,
    "createdAt" timestamp not null default now(),
    foreign key ("userId") references users("id")
);