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
