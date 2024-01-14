
create table IF NOT EXISTS User(
	id BINARY(16) primary key,
	username varchar(255) not null,
	jmeno varchar(255) not null,
	prijmeni varchar(255) not null,
	email varchar(255) not null,
	passHash varchar(500) not null,
	salt varchar(255) not null
);

