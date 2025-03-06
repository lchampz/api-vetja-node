import { Router } from "express";
import { AnimalController } from "../Controllers/AnimalController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/animais", AuthMiddleware, AnimalController.getAllAnimais);
router.post("/animal", AuthMiddleware, AnimalController.createAnimal);
router.put("/animal", AuthMiddleware, AnimalController.updateAnimal);
router.delete("/animal", AuthMiddleware, AnimalController.deleteAnimal);

export default router;
