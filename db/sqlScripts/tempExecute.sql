select GroupMessage.message, GroupMessage.time_sent,User.username,ChatGroup.name
from GroupMessage
inner join User on sender_id = User.id
inner join ChatGroup on ChatGroup.id = GroupMessage.group_id
group by ChatGroup.name,User.username,GroupMessage.time_sent,message
order by time_sent,username;

