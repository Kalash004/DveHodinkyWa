import {query} from '../functions/database.js'
import express from 'express'
import {checkIfAuthenticated} from '../functions/authentication.js'


const router = express.Router();

router.post('/api/neworder',checkIfAuthenticated,async (req,res) =>{

    console.log(req.body);
    if(!req.body.order){
        return res.send("Send a query param containing your order named order");
    }

    let rows;
    try {

        let sql = `
        INSERT INTO UserOrder(user_id,orderString) values(?,?);
        `;
        rows = await query(sql,[sessionsStorage.userId,req.body.order])
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
    return res.send(JSON.stringify(":ok"));
})



export default router;
