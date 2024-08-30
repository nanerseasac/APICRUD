import { Router } from "express";
import { addUser, userLogin } from "./controllers/user.controller";
import { verifyUserAccMiddleware } from "./middleware/authenticator";
import {
	addTask,
	completeTask,
	deleteTask,
	editTask,
	getAllTask,
	getTask,
} from "./controllers/tasks.controller";
import { taskMiddleware, taskPatchMiddleware } from "./middleware/tasks";

const router = Router();

router.post("/register", addUser);

router.post("/login", userLogin);

router.use(verifyUserAccMiddleware);

router.post("/tarefa", taskMiddleware, addTask);

router.patch("/tarefa/:id/is_completed", taskPatchMiddleware, completeTask);

router.put("/tarefa/:id", taskMiddleware, editTask);

router.delete("/tarefa/:id", deleteTask);

router.get("/tarefa/:id", getTask);

router.get("/tarefa", getAllTask);

export default router;
