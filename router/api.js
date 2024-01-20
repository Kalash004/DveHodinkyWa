import {query} from '../functions/database.js'
import express from 'express'
import {checkIfAuthenticated} from '../functions/authentication.js'


const router = express.Router();


router.get('/api',checkIfAuthenticated,async(req,res)=>{
    res.status(200);
    res.sendFile('/api/api.html',{root:'views'});
})

router.get('/api/messages',async (req,res)=>{

    try {

        let sql = `
select Message.message,Message.time_sent,sender.username as sender,receiver.username receiver
from Message
inner join User sender on sender.id = Message.sender_id
inner join User receiver on receiver.id = Message.rec_id
group by sender.username,receiver.username,message,time_sent
order by sender,receiver,time_sent;
`;
        let rows = await query(sql);

        let data = {};
        if(!rows || rows.length <= 0){
            res.status(200);
            res.set('Content-Type', 'application/json');
            data.dms =  [];
            return res.send(JSON.stringify(data));
        }


        let messages = []
        for(let i = 0; i < rows.length; i++){
            let message = rows[i].message;
            let time_sent= rows[i].time_sent;
            let sender = rows[i].sender;
            let receiver = rows[i].receiver;
            let json = {'message':message,'sender':sender,'receiver':receiver,'time_sent':time_sent}
            messages.push(json);
        }

        sql = `

select GroupMessage.message, GroupMessage.time_sent,User.username,ChatGroup.name
from GroupMessage
inner join User on sender_id = User.id
inner join ChatGroup on ChatGroup.id = GroupMessage.group_id
group by ChatGroup.name,User.username,GroupMessage.time_sent,message
order by time_sent,username;
`;
        rows = await query(sql);

        data.groupchats = rows;

        res.status(200);
        res.set('Content-Type', 'application/json');
        return res.send(JSON.stringify(data));
    } catch (error) {
        console.log(error)
        res.status(200);
        res.set('Content-Type', 'application/json');
        return res.send("[]");
    }

 
})

router.get('/api/messagesUser',async (req,res) =>{

    console.log("Api user messages query params:"+req.query.id);

    if(!req.query.user){
        return res.send("Send a user parameter with your query containing username or email");
    }


    let rows;
    try {

        let sql = `
select Message.message as msg,Message.time_sent as sent,User.username as receiver
from Message 
inner join User as receiverUser on Message.rec_id = receiverUser.id 
inner join User as senderUser on Message.sender_id = senderUser.id
where senderUser.username = ?
group by receiver,time_sent,msg
order by receiver,time_sent;

`;
        rows = await query(sql,[req.query.user])
    } catch (error) {
        console.log(error);
        return res.send("Error during SQL query.");
    }

    if(!rows ||rows.length == 0){
        res.status(200);
        res.set('Content-Type', 'application/json');
        let data = {posts:[]};
        return res.send(JSON.stringify(data));
    }

    let data = {};
    data.dms = rows; 

    sql = `

select GroupMessage.message as msg,ChatGroup.name as group_Chat,GroupMessage.time_sent as sent
from GroupMessage
inner join ChatGroup on GroupMessage.group_id = ChatGroup.id
inner join User on GroupMessage.sender_id = User.id
where User.username = ?
group by group_Chat,sent,message
order by group_Chat,sent;
`

    try {

        rows = await query(sql,[req.query.user])
    } catch (error) {
        console.log(error);
        return res.send("Error during SQL query.");
    }

    if(!rows ||rows.length == 0){
        res.status(200);
        res.set('Content-Type', 'application/json');
        data.groupchats = [];
        return res.send(JSON.stringify(data));
    }

    data.groupchats = rows;
    return res.send(JSON.stringify(data));
})
 

router.post('/api/messagesGroup',checkIfAuthenticated,async (req,res) =>{

    console.log("Api user messages query params:"+req.query.id);

    if(!req.query.user){
        return res.send("Send a user parameter with your query containing username or email");
    }


    let rows;
    try {

        let sql = `
select Message.message as msg,Message.time_sent as sent,User.username as receiver
from Message 
inner join User as receiverUser on Message.rec_id = receiverUser.id 
inner join User as senderUser on Message.sender_id = senderUser.id
where senderUser.username = ?
group by receiver,time_sent,msg
order by receiver,time_sent;

`;
        rows = await query(sql,[req.query.user])
    } catch (error) {
        console.log(error);
        return res.send("Error during SQL query.");
    }

    if(!rows ||rows.length == 0){
        res.status(200);
        res.set('Content-Type', 'application/json');
        let data = {posts:[]};
        return res.send(JSON.stringify(data));
    }

    let data = {};
    data.dms = rows; 

    sql = `

select GroupMessage.message as msg,ChatGroup.name as group_Chat,GroupMessage.time_sent as sent
from GroupMessage
inner join ChatGroup on GroupMessage.group_id = ChatGroup.id
inner join User on GroupMessage.sender_id = User.id
where User.username = ?
group by group_Chat,sent,message
order by group_Chat,sent;
`

    try {

        rows = await query(sql,[req.query.user])
    } catch (error) {
        console.log(error);
        return res.send("Error during SQL query.");
    }

    if(!rows ||rows.length == 0){
        res.status(200);
        res.set('Content-Type', 'application/json');
        data.groupchats = [];
        return res.send(JSON.stringify(data));
    }

    data.groupchats = rows;
    return res.send(JSON.stringify(data));
})


router.post('/api/messagesWord',checkIfAuthenticated,async (req,res) =>{

    let body = req.body;
    console.log(req.session.user)

    try{
        body = JSON.parse(req.body);
    }catch(e){

    }

    console.log(body);
    
    
    if(!body || !body.title || !body.content){
        return res.send("You must send a JSON object as the body of your request. Use this format: {title:<text>,content:<text>}");
    }

    let rows;
    let userId = req.session.user["id"];
    console.log(userId);

    

    try{
       rows = await query('INSERT INTO Post(author,title,content,date) values (?,?,?,NOW());',[userId,body.title,body.content]);
    }catch(e){
        console.log(e);
        return res.send("Error in SQL query, either the author with this ID does not exist, or your title or content were too long.");   
    }

    try {
        rows = await query('SELECT MAX(id) as id from Post;');
    } catch (error) {
        console.log(error);
    }

    if(!rows){
        return res.send("No post id returned after insert.");
    }

    console.log(rows);

    let response = {Request:"Success", idOfPost:rows[0].id};
    return res.send(JSON.stringify(response));
})

export default router;
