select Message.message,(select User.username from User where user.id = Message.sender_id) as "sender", (select User.username from User where user.id = Message.sender_id) "receiver";
