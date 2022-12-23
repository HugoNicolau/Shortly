import { connectionDB } from "../database/db.js";
import { userSchema } from "../models/usersModels.js";

export async function validateSchemaUsers(req, res, next){
    const user = req.body;

    const { error } = userSchema.validate(user, {abortEarly:false});

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send({ errors });
    }


    try{
        //Se achar email, return 409
        const emailExists = await connectionDB.query(`SELECT email FROM users WHERE email=$1`, [user.email]);
        
        if(emailExists.rowCount>0){
            return res.sendStatus(409);
        }
            res.locals.user = user;
            next()

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

}