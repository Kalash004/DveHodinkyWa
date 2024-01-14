create table IF NOT EXISTS GroupMessage(
	id Binary(16) primary key,
	sender_id BINARY(16) not null,
	constraint fk_sender foreign key(sender_id) references User(id),
	group_id BINARY(16) not null,
	constraint fk_group foreign key(group_id) references ChatGroup(id),
	message varchar(450) not null
);


