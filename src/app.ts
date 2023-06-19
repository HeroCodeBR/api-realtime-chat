import http from 'http';
import express, { Application, NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';
import { UserRoutes } from './routes/user.routes';
import { connect } from './infra/database';
class App {
  private app: Application;
  private http: http.Server;
  private io: Server;
  private userRoutes = new UserRoutes();

  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = new Server(this.http);
    this.middlewaresInitalize();
    this.initializeRoutes();
    this.interceptionError();
    this.initializeHtml();
  }
  listen() {
    this.http.listen(3333, async () => {
      try {
        await connect();
        console.log('Conectado ao banco de dados');
      } catch (error) {
        console.log(
          '🚀 ~ file: app.ts:26 ~ App ~ this.http.listen ~ error:',
          error,
        );
      }
    });
  }
  listenSocket() {
    this.io.on('connection', (userSocket) => {
      console.log('a user connected');
    });
  }
  private initializeHtml() {
    this.app.get('/index', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
  }
  private initializeRoutes() {
    this.app.use('/users', this.userRoutes.router);
  }
  private middlewaresInitalize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private interceptionError() {
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        //throw new Error
        if (err instanceof Error) {
          return response.status(400).json({
            message: err.message,
          });
        }
        return response.status(500).json({
          message: 'Internal Server Error.',
        });
      },
    );
  }
}

export { App };
