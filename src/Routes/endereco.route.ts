import { Router } from "express";
import { EnderecoController } from "../Controllers/EnderecoController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/enderecos", AuthMiddleware, EnderecoController.getAllEnderecos);
router.post("/endereco", AuthMiddleware, EnderecoController.createEndereco);
router.put("/endereco", AuthMiddleware, EnderecoController.updateEndereco);
router.delete("/endereco", AuthMiddleware, EnderecoController.deleteEndereco);

export default router;
