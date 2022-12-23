import { connectionDB } from "../database/db.js";

export async function getRanking(req, res){
    try{
       const ranking = await connectionDB.query(`SELECT users.id, users.name, COUNT(urls.user_id) AS "linksCount", user_count AS "visitCount" 
       FROM users 
       LEFT JOIN urls ON urls.user_id=users.id 
       GROUP BY users.id, users.name, "visitCount" 
       ORDER BY "visitCount","linksCount" DESC 
       LIMIT 10 ;`)
        return res.status(200).send(ranking.rows);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}
