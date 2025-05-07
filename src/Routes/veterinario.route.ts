import { Router } from "express";
import { VeterinarioController } from "../Controllers/VeterinarioController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/veterinarian/all", AuthMiddleware, VeterinarioController.getAllVeterinarios);
router.get("/veterinarian/:id", AuthMiddleware, VeterinarioController.getVeterinarioById);
router.post("/veterinarian", AuthMiddleware, VeterinarioController.createVeterinario);
router.put("/veterinarian/:id", AuthMiddleware, VeterinarioController.updateVeterinario);
router.delete("/veterinarian/:id", AuthMiddleware, VeterinarioController.deleteVeterinario);

export default router;
