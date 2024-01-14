DELIMITER //
BEGIN

	START TRANSACTION;
create table IF NOT EXISTS User(
	id BINARY(16) primary key,
	username varchar(255) not null,
	jmeno varchar(255) not null,
	prijmeni varchar(255) not null,
	email varchar(255) not null,
	passHash varchar(500) not null,
	salt varchar(255) not null
);

create table IF NOT EXISTS ChatGroup(
	id BINARY(16) primary key,
	name varchar(255) not null,
	desc varchar(255) not null
);

create table IF NOT EXISTS GroupMember(
	id BINARY(16) primary key,
	group_id BINARY(16),
    constraint fk_group_id foreign key(group_id) references ChatGroup(id),
	user_id BINARY(16),
    constraint fk_user_id foreign key(user_id) references User(id),
    nickname varchar(255)
);


create table IF NOT EXISTS Message(
	id BINARY(16) primary key,
	sender_id BINARY(16) not null,
	constraint fk_sender foreign key(sender_id) references User(id),
	rec_id BINARY(16) not null,
	constraint fk_rec foreign key(rec_id) references User(id),
	message varchar(450) not null
);

create table IF NOT EXISTS GroupMessage(
	id Binary(16) primary key,
	sender_id BINARY(16) not null,
	constraint fk_group_sender foreign key(sender_id) references User(id),
	group_id BINARY(16) not null,
	constraint fk_group foreign key(group_id) references ChatGroup(id),
	message varchar(450) not null
);

END //
DELIMITER ;
