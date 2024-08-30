import { Request, Response } from "express";
import {
	addTask_Service,
	deleteTask_Service,
	getAllTask_Service,
	getTask_Service,
	patchTask_Service,
	updateTask_Service,
} from "../services/task.services";

export const addTask = async (req: Request, res: Response) => {
	const { title, description, is_completed } = req.body;
	const { user } = req as any;

	if (!title) {
		return res.status(400).json("O campo title");
	}
	if (!description) {
		return res.status(400).json("O campo description");
	}
	if (!is_completed) {
		return res.status(400).json("O campo is_completed");
	}

	try {
		const task = await addTask_Service({
			user_id: user.id,
			title,
			description,
			is_completed,
		});

		if (!task) {
			return res.status(400).json({ message: "A tarefa não foi cadastrada" });
		}

		return res.status(201).json("Tarefa criada com sucesso");
	} catch (error) {
		throw new Error("Failed to create task");
	}
};

export const completeTask = async (req: Request, res: Response) => {
	const { is_completed } = req.body;
	const { id } = req.params;

	if (!is_completed) {
		return res.status(400).json("O campo is_completed é obrigatório");
	}

	try {
		const task = await patchTask_Service(id, is_completed);

		if (!task) {
			return res.status(400).json("tarefa não encontrada");
		}

		return res.status(204).send();
	} catch (error) {
		throw new Error("Failed to update task");
	}
};

export const editTask = async (req: Request, res: Response) => {
	const { title, description, is_completed } = req.body;
	const { id } = req.params;

	if (!title) {
		return res.status(400).json("O campo title é obrigatório");
	}
	if (!description) {
		return res.status(400).json("O campo description é obrigatório");
	}
	if (!is_completed) {
		return res.status(400).json("O campo is_completed é obrigatório");
	}

	try {
		const task = await updateTask_Service(id, title, description, is_completed);

		if (!task) {
			return res.status(404).json("tarefa não encontrada");
		}

		return res.status(204).send();
	} catch (error) {
		throw new Error("Failed to update task");
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const task = await deleteTask_Service(id);

		if (task === undefined) {
			return res.status(404).json("tarefa não encontrada");
		}

		return res.status(204).json("Tarefa deletada com sucesso");
	} catch (error) {
		console.log(error);
		throw new Error("Failed to update task");
	}
};

export const getTask = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const task = await getTask_Service(id);

		if (!task) {
			return res.status(404).json("Task not found");
		}

		return res.json(task);
	} catch (error) {
		throw new Error("Failed to get task");
	}
};

export const getAllTask = async (req: Request, res: Response) => {
	const { user } = req as any;
	try {
		const tasks = await getAllTask_Service(user.id);

		if (!tasks) {
			return res.status(404).json("Você ainda não tem kktarefa");
		}

		return res.json(tasks);
	} catch (error) {
		throw new Error("Failed to get task");
	}
};
