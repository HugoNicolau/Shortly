import { connectionDB } from "../database/db.js";

export async function getUser(req, res){
    try{
        const userId = res.locals.userId;
        const user = await connectionDB.query(`SELECT id, name, user_count FROM users WHERE id=$1;`,[userId]);
        if(user.rowCount<1){
            return res.sendStatus(404);
        }
        const { id, name, user_count} = user.rows[0];

        
        const urls = await connectionDB.query(`SELECT id, short_url AS "shortUrl", url, visit_count AS "visitCount" FROM urls WHERE user_id=$1;`,[userId]);
        
        const resObj = {
            id,
            name,
            visitCount:user_count,
            shortenedUrls:urls.rows
        }

        return res.status(200).send(resObj)

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }


}