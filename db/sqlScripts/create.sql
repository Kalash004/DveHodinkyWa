create table IF NOT EXISTS Users(
	id BINARY(16) primary key default (UUID_TO_BIN(UUID())) ,
	username varchar(255) not null,
	jmeno varchar(255) not null,
	prijmeni varchar(255) not null,
	email varchar(255) not null,
	passHash varchar(500) not null,
	salt varchar(255) not null,
    img varchar(400) not null default 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlpIVml2Nk895Wo6438KgvNMUqtLXtnj8fDoF5PZPQeA&s'
);

create table IF NOT EXISTS Admin(
	id BINARY(16) primary key default (UUID_TO_BIN(UUID())),
    user_id BINARY(16) not null unique,
    foreign key(user_id) references Users(id)

);

create table IF NOT EXISTS UserOrder(
	id BINARY(16) primary key default (UUID_TO_BIN(UUID())) ,
	orderString varchar(500) not null,
    is_visible bit(1) not null default 1,
    is_deleted bit(1) not null default 0
);
