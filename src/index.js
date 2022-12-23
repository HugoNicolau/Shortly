//Basic package install
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from "./routes/authRoutes.js"
import urlRoutes from "./routes/urlRoutes.js"


const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(urlRoutes);



app.listen(port, ()=> console.log(`Server running in port: ${port}`));