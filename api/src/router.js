import {author} from '../package.json'

class AppRouter {
    constructor(app){
      this.app = app;
      this.setupRouters();
    }

    setupRouters(){
      const app = this.app;

      //root routing
      app.get('/', (req, res, next) =>{
        return res.status(200).json({
          version:author
        });
      });
    }
}

export default AppRouter;
