import express, { Application } from "express";
import http from "http";
import path from "path";
import authRoutes from "./Routes/auth.route"; 
import userRoutes from "./Routes/user.route"
import animalRoutes from "./Routes/animal.route"

//TO-DO: importar rotas, validar se o usuario pode fazer a ação, preguiça de fazer agr

class App {
  private PORT: number;
  private app: Application;
  private http: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.PORT = 8000;
    this.http = http.createServer(this.app);

    this.setupRoutes();
  }

  listenServer() {
    this.http.listen(this.PORT, () => {
      console.log(`Server running on http://localhost:${this.PORT}`);
    });
  }

  setupRoutes() {
    
    this.app.use("/auth", authRoutes);
    this.app.use("/users", userRoutes);


    this.app.get("/", (req, res) => {
      res.send('Hello World');
    });
  }
}

const app = new App();
app.listenServer();