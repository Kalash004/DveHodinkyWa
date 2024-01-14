create table IF NOT EXISTS Message(
	id BINARY(16) primary key,
	sender_id BINARY(16) not null,
	constraint fk_sender foreign key(sender_id) references User(id),
	rec_id BINARY(16) not null,
	constraint fk_rec foreign key(rec_id) references User(id),
	message varchar(450) not null
);


