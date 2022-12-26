import { connectionDB } from "../database/db.js";

export async function postUrl(req, res) {
  try {
    const newUrl = res.locals.newUrl;
    const { id, shortUrl, url } = newUrl;
    await connectionDB.query(
      `INSERT INTO urls (user_id, short_url, url) VALUES ($1, $2, $3);`,
      [id, shortUrl, url]
    );

    res.status(201).send(shortUrl);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getUrlId(req, res) {
  const id = req.params.id;
  try {
    const url = await connectionDB.query(
      `SELECT id, short_url, url FROM urls WHERE id=$1;`,
      [id]
    );

    if (!url || url.rowCount < 1) {
      return res.sendStatus(404);
    }
    return res.status(200).send(url.rows[0]);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function openUrl(req, res) {
  const url = req.params.shortUrl;
  try {
    const originalUrl = await connectionDB.query(
      `SELECT * FROM urls WHERE short_url=$1;`,
      [url]
    );
    if (!originalUrl || originalUrl.rowCount < 1) {
      return res.sendStatus(404);
    }
    const newUrl = originalUrl.rows[0].url;
    const id = originalUrl.rows[0].id;
    const newVisitCount = Number(originalUrl.rows[0].visit_count) + 1;
    await connectionDB.query(`UPDATE urls SET visit_count=$1 WHERE id=$2 `, [
      newVisitCount,
      id,
    ]);
    const userId = originalUrl.rows[0].user_id;
    const userCount = await connectionDB.query(
      `SELECT * FROM users WHERE id=$1;`,
      [userId]
    );
    const newCount = userCount.rows[0].user_count + 1;
    await connectionDB.query(`UPDATE users SET user_count=$1 WHERE id=$2;`, [
      newCount,
      userId,
    ]);

    res.redirect(301, newUrl);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const urlId = req.params.id;
  const userId = res.locals.userId;
  try {
    const byUrl = await connectionDB.query(`SELECT * FROM urls WHERE id=$1;`, [
      urlId,
    ]);
    if (byUrl.rowCount < 1) {
      return res.sendStatus(404);
    }
    if (String(userId) !== String(byUrl.rows[0].user_id)) {
      return res.sendStatus(401);
    }

    await connectionDB.query(`DELETE FROM urls WHERE id=$1;`, [urlId]);
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
