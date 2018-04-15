import {author} from '../package.json'

class AppRouter {
    constructor(app){
      this.app = app;
      this.setupRouters();
    }

    setupRouters(){
      const app = this.app;
      //const uploadDir = app.get('storageDir');
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
        const files = req.files;
        return res.json({
          files:files,
        })
      });
    }
}

export default AppRouter;
