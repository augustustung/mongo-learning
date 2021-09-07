import express from 'express'
import bodyParser from 'body-parser'
import connectDB from './config/connectDb'
import cors from 'cors'
import 'dotenv/config'

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connectDB();

app.use(require('./routes/route'));

let port = process.env.PORT || 6969;
app.listen(port, () => console.log("App listening at localhost:" + port));