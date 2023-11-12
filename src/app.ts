import * as morgan from 'morgan';
import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import * as error from 'http-errors';
import { dbConnection } from './config/db';
import usersRouter from './routes/user';
import authRouter from './routes/auth';
import transactionCategoryRouter from './routes/transactionCategory';
import transCtgryTypesRouter from './routes/transCtgryType';
import transactionsRouter from './routes/transaction';

class App {
  app: express.Application = express();
  server: http.Server = http.createServer(this.app);

  public init = (): Promise<http.Server> => {
    this.connectDb();
    this.middlewares();
    this.routes();
    this.errorHandler();

    return Promise.resolve(this.server);
  };

  private connectDb = (): void => {
    dbConnection();
  };

  private routes = (): void => {
    this.app.get('/', (req, res) => {
      res.send('Server is running');
    });

    this.app.use('/api/v1/auth', authRouter);
    this.app.use('/api/v1/users', usersRouter);
    this.app.use('/api/v1/transaction_categories', transactionCategoryRouter);
    this.app.use('/api/v1/transaction_category_types', transCtgryTypesRouter);
    this.app.use('/api/v1/transactions', transactionsRouter);
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
        res.status(err.isJoi ? 422 : err.status || 500);
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
