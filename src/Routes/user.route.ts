import { Router } from "express";
import { ClienteController } from "../Controllers/UserController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/user", AuthMiddleware, ClienteController.getUserInfo);
router.post("/delete", AuthMiddleware, ClienteController.deleteUser);
router.get("/all", ClienteController.getAllUsers)
router.put("/user", AuthMiddleware, ClienteController.updateUser);

export default router;