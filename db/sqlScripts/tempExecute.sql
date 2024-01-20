select Message.message as msg,Message.time_sent as sent,User.username as receiver
from Message 
inner join User on Message.rec_id = User.id
group by receiver,time_sent,msg
order by receiver,time_sent\G

select GroupMessage.message as msg,ChatGroup.name,GroupMessage.time_sent
from GroupMessage
inner join ChatGroup on GroupMessage.group_id = ChatGroup.id
group by name,time_sent,message
order by name,time_sent\G
