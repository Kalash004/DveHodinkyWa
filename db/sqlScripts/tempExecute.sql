select Message.message as msg,Message.time_sent as sent,User.username as receiver
from Message 
inner join User as receiverUser on Message.rec_id = receiverUser.id 
inner join User as senderUser on Message.sender_id = senderUser.id
where senderUser.username = ?
group by receiver,time_sent,msg
order by receiver,time_sent;

select GroupMessage.message as msg,ChatGroup.name as group_Chat,GroupMessage.time_sent as sent
from GroupMessage
inner join ChatGroup on GroupMessage.group_id = ChatGroup.id
inner join User on GroupMessage.sender_id = User.id
where User.username = ?
group by group_Chat,sent,message
order by group_Chat,sent;
