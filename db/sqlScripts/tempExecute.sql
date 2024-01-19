select Message.message,Message.time_sent,sender.username,receiver.username
from Message
inner join User sender on sender.id = Message.sender_id
inner join User receiver on receiver.id = Message.rec_id
group by sender.username,receiver.username,message,time_sent
order by time_sent\G
