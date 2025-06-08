import { Router } from "express";
import { UserController as ClienteController } from "../Controllers/UserController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/user", AuthMiddleware, ClienteController.getUserInfo);
router.post("/delete", AuthMiddleware, ClienteController.deleteUser);
router.get("/all", AuthMiddleware, ClienteController.getAllUsers)
router.put("/user", AuthMiddleware, ClienteController.updateUser);

export default router;