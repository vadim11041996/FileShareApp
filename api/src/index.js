import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

import {connect} from "./database";
import AppRouter from './router';

//File store config
const storageDir = path.join(__dirname, '..', 'storage');
const storageConfig = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, 'storageDir')
  },
  filename:(req, file, cb) =>{
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({storage:storageConfig});
//End file store config

const PORT = 3000;
const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.set('root', __dirname);
app.set('storageDir',storageDir);
app.set('upload',upload);

//Connect to the database
connect((err, db) =>{
  if(err){
    console.log("Error on connecting with the database",err);
    throw err;
  }

  app.set('db', db);

  //Init routers
  new AppRouter(app);

  app.server.listen(process.env.PORT || PORT, () => {
      console.log(`App is running on port ${app.server.address().port}`);
  });
})



export default app;
