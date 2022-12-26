import { connectionDB } from "../database/db.js";
import { urlSchema } from "../models/urlsModels.js";
import { nanoid } from "nanoid";

export async function validateSchemaUrls(req, res, next) {
  const url = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  const { error } = urlSchema.validate(url, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }

  try {
    const confirmToken = await connectionDB.query(
      `SELECT * FROM sessions WHERE token=$1;`,
      [token]
    );
    if (confirmToken.rowCount < 1) {
      return res.sendStatus(401);
    }
    const shortUrl = nanoid();
    const id = confirmToken.rows[0].user_id;

    res.locals.newUrl = {
      id,
      shortUrl,
      url: url.url,
    };
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function validateDelete(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const confirmToken = await connectionDB.query(
      `SELECT * FROM sessions WHERE token=$1;`,
      [token]
    );
    if (confirmToken.rowCount < 1) {
      return res.sendStatus(401);
    }
    const userId = confirmToken.rows[0].user_id;

    res.locals.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
