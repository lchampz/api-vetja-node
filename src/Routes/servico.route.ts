import { Router } from "express";
import { ServicoController } from "../Controllers/ServicoController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/all", AuthMiddleware, ServicoController.getAllServicos);
router.get("/service/:id", AuthMiddleware, ServicoController.getServicoById);
router.post("/service", AuthMiddleware, ServicoController.createServico);
router.post("/services", AuthMiddleware, ServicoController.createServicos);
router.put("/service/:id", AuthMiddleware, ServicoController.updateServico);
router.delete("/service/:id", AuthMiddleware, ServicoController.deleteServico);

export default router;
