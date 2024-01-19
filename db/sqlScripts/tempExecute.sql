select Message.message,User.username "sender", User.username "receiver"
from Message inner join User
on Message.sender_id = User.id and Message.rec_id = User.id
group by sender,message;
