import { Request, Response, Router } from "express";
import { deleteTodo, getTodo, postTodo, updateTodo } from "../../controllers/projectsController";

export const router = Router();

// /api/v1/projects
router.get("/", getTodo);
router.post("/",postTodo);
router.put("/:id",updateTodo);
router.delete("/:id",deleteTodo);
