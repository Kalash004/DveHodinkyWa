create table IF NOT EXISTS GroupMember(
	id BINARY(16) primary key,
	group_id BINARY(16),
    constraint fk_group_id foreign key(group_id) references ChatGroup(id),
	user_id BINARY(16) primary key,
    constraint fk_user_id foreign key(user_id) references User(id),
    nickname varchar(255)
);


