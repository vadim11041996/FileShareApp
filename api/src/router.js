import path from 'path';
import {author} from '../package.json';
import _ from 'lodash';
import File from './models/file';
import {ObjectID} from 'mongodb';

class AppRouter {
    constructor(app){
      this.app = app;
      this.setupRouters();
    }

    setupRouters(){
      const app = this.app;
      const db = app.get('db');
      const uploadDir = app.get('storageDir');
      const upload = app.get('upload');

      //root routing
      app.get('/', (req, res, next) =>{
        return res.status(200).json({
          version:author
        });
      });

      //Upload routind
      app.post('/api/upload', upload.array('files'), (req, res, next) =>{
        //console.log("file received ", req.files);
        const files = _.get(req, 'files',[]);

        let fileModels =[];

        _.each(files, (fileObject) =>{
          const newFile = new File(app).initWithObject(fileObject).toJson();
          fileModels.push(newFile);
        });

        if(fileModels.length){
          db.collection('files').insertMany(fileModels, (err, result) =>{
            if(err){
              return res.status(503).json({
                error:{
                  message:'Unable saved your files',
                }
              });
            }
            console.log("save files with result", err, result);
            return res.json({
              files:fileModels
            });
          });
        }else {
          return res.status(503).json({
            error:{message:'File upload is required'}
          });
        }

      });

      //Download routing
      app.get('/api/download/:id', (req, res, next) =>{
        const fileId = req.params.id;

        db.collection('files').find({_id:ObjectID(fileId)}).toArray((err,result) => {
          const fileName = _.get(result,'[0].name');

          if(err || !fileName){
            return res.status(400).json({
              error:{
                message:"File not found"
              }
            })
          }

          const filePath = path.join(uploadDir,fileName);
          return res.download(filePath, fileName, (err)=>{
            if(err){
              return res.status(404).json({
                error:{
                  message:'File not found'
                }
              });
            }else{
              console.log('File is downloaded.')
            }
          });
        });


      });

    }
}

export default AppRouter;
