import { Router } from "express";
import { EnderecoController } from "../Controllers/EnderecoController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/addresses", AuthMiddleware, EnderecoController.getAllEnderecos);
router.get("/address/:id", AuthMiddleware, EnderecoController.getEnderecoById);
router.post("/address", AuthMiddleware, EnderecoController.createEndereco);
router.put("/address/:id", AuthMiddleware, EnderecoController.updateEndereco);
router.delete("/address/:id", AuthMiddleware, EnderecoController.deleteEndereco);

export default router;
