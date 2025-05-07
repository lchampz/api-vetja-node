import express, { Application } from "express";
import http from "http";

import authRoutes from "./Routes/auth.route";
import userRoutes from "./Routes/user.route"
import veterinarioRoutes from "./Routes/veterinario.route"
import animalRoutes from "./Routes/animal.route"
import enderecoRoutes from "./Routes/endereco.route"
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

//TO-DO: importar rotas, validar se o usuario pode fazer a ação, preguiça de fazer agr

class App {
  private PORT: number;
  private app: Application;
  private http: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cors());
    this.PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
    this.http = http.createServer(this.app);

    this.setupRoutes();
  }

  listenServer() {
    this.http.listen(this.PORT, () => {
      console.log(`Server running on http://localhost:${this.PORT}`);
    }).on('error', (err) => {
      console.error('Failed to start server:', err);
    });
  }

  setupRoutes() {

    this.app.use("/auth", authRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/animals", animalRoutes);
    this.app.use("/veterinarians", veterinarioRoutes);
    this.app.use("/addresses", enderecoRoutes);
    this.app.get("/", (req, res) => {
      res.send('Hello World');
    });
  }
}

const app = new App();
app.listenServer();