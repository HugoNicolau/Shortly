//Basic package install
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js"



const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(urlRoutes);
app.use(usersRoutes);
app.use(rankingRoutes);


app.listen(port, ()=> console.log(`Server running in port: ${port}`));