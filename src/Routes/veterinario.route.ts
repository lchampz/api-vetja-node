import { Router } from "express";
import { VeterinarioController } from "../Controllers/VeterinarioController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/veterinarios", AuthMiddleware, VeterinarioController.getAllVeterinarios);
router.post("/veterinario", AuthMiddleware, VeterinarioController.createVeterinario);
router.put("/veterinario", AuthMiddleware, VeterinarioController.updateVeterinario);
router.delete("/veterinario", AuthMiddleware, VeterinarioController.deleteVeterinario);

export default router;
