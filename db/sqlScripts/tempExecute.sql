select Message.message, User.username "sender", User.username "receiver"
from Message inner join User sender 
on Message.sender_id = sender.id
from Message inner join User receiver on Message.rec_id = receiver.id
group by sender.username;
