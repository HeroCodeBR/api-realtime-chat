import http from 'http';
import express, { Application, NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';
import { UserRoutes } from './routes/user.routes';
import { connect } from './infra/database';
import fs from 'fs';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.middleware';
import { RoomsRoutes } from './routes/rooms.routes';
class App {
  private app: Application;
  private http: http.Server;
  private io: Server;
  private userRoutes = new UserRoutes();
  private roomsRoutes = new RoomsRoutes();

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
        dotenv.config();
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
      userSocket.on('join_room', (room_id) => {
        console.log(
          '🚀 ~ file: app.ts:46 ~ App ~ userSocket.on ~ room:',
          room_id,
        );
        userSocket.join(room_id);
      });
    });
  }
  private initializeHtml() {
    this.app.get('/index', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
  }
  private initializeRoutes() {
    this.app.use('/users', this.userRoutes.router);
    this.app.use('/rooms', this.roomsRoutes.router);
  }
  private middlewaresInitalize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    fs.accessSync('.env', fs.constants.F_OK);
  }
  private interceptionError() {
    this.app.use(errorMiddleware);
  }
}

export { App };
