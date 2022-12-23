import { connectionDB } from "../database/db.js";
import { loginSchema, userSchema } from "../models/usersModels.js";
import bcrypt from 'bcrypt';

export async function validateSchemaUsers(req, res, next){
    const user = req.body;

    const { error } = userSchema.validate(user, {abortEarly:false});

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send({ errors });
    }


    try{
        
        const emailExists = await connectionDB.query(`SELECT email FROM "users" WHERE email=$1`, [user.email]);
        
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

export async function validateSchemaLogin(req, res, next){
    const login = req.body;
    const { email, password} = login;

    const { error } = loginSchema.validate(login, {abortEarly:false});

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send({ errors });
    }
    try{

        const findUser = await connectionDB.query(`SELECT email, password FROM users WHERE email=$1;`, [email]);

        if(findUser.rowCount>1){
            return res.sendStatus(401);
        }

        const passwordOk = bcrypt.compareSync(password, findUser.rows[0].password);
        if(!passwordOk){
            return res.sendStatus(401);
        }

        res.locals.userLogin = login;
        next();

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

}

export async function validateToken(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.sendStatus(401);
    }
    try{
        const confirmToken = await connectionDB.query(`SELECT * FROM sessions WHERE token=$1;`,[token]);
        if(confirmToken.rowCount<1){
            return res.sendStatus(401);
        }
        const userId = confirmToken.rows[0].user_id;

        res.locals.userId = userId;
        next();
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }


}