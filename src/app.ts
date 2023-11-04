import * as morgan from 'morgan';
import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import error from 'http-errors';

class App {
  app: express.Application = express();
  server: http.Server = http.createServer(this.app);

  public init = (): Promise<http.Server> => {
    this.middlewares();
    this.routes();
    this.errorHandler();

    return Promise.resolve(this.server);
  };

  private routes = (): void => {
    this.app.get('/', (req, res) => {
      res.send('Server is running');
    });
  };

  private middlewares = (): void => {
    this.app.use(cors());
    this.app.use(morgan(':method :url :status :response-time ms'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  };

  private errorHandler = (): void => {
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        next(error.NotFound('URL not found'));
      },
    );

    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        res.status(err.status || 500);
        res.json(<IClientResponse>{
          message: err.message,
          data: null,
          error: err,
          success: false,
        });
      },
    );
  };
}

export default App;
