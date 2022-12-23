import { connectionDB } from "../database/db.js";


export async function postSignUp(req, res){
    try{
        const user = res.locals.user;
        const { name, email, password } = user
        await connectionDB.query(`INSERT INTO users (name, email, password) VALUES($1, $2, $3);`,[name, email, password])

        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }


}