import { connectionDB } from "../database/db.js";

export async function postUrl(req, res){
    try{
        const newUrl = res.locals.newUrl;
        const { id, shortUrl, url } = newUrl
        await connectionDB.query(`INSERT INTO urls (user_id, short_url, url) VALUES ($1, $2, $3);`,[id, shortUrl, url])

        res.status(201).send(shortUrl);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }

}

export async function getUrlId(req, res){
    const id = req.params.id;
    try{
        const url = await connectionDB.query(`SELECT id, short_url, url FROM urls WHERE id=$1;`,[id]);
    
        console.log(url)
        if(!url || url.rowCount<1){
            return res.sendStatus(404);
        }
        return res.status(200).send(url.rows[0]);

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
    
}