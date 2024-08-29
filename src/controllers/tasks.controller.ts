import knex from "../dbKnex/connection";
import { Request, Response } from "express";

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
		const task = await knex("tasks").insert({
			user_id: user.id,
			title,
			description,
			is_completed,
		});

		if (!task) {
			return res.status(400).json({ message: "A tarefa não foi cadastrada" });
		}

		return res.status(201).json(task);
	} catch (error) {
		throw new Error("Failed to create task");
	}
};

export const completeTask = async (req: Request, res: Response) => {
	const { is_completed } = req.body;
	const { id } = req.params;
	const { user } = req as any;

	if (!is_completed) {
		return res.status(400).json("O campo is_completed é obrigatório");
	}

	try {
		const task = await knex("Tasks").where({ id }).update({ is_completed });

		if (!task) {
			return res.status(400).json("tarefa não encontrada");
		}

		return res.status(204).send("Ren é lindo");
	} catch (error) {
		throw new Error("Failed to update task");
	}
};

export const editTask = async (req: Request, res: Response) => {
	const { title, description, is_completed } = req.body;
	const { id } = req.params;

    console.log(id)

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
		const task = await knex("tasks")
			.where({ id })
			.update({ title, description, is_completed });

        if(!task) {
            return res.status(400).json("tarefa não encontrada")
        }

        return res.status(204).send()
	} catch (error) {
        console.log(error)
        throw new Error("Failed to update task");
    }
};

export const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const task = knex("tasks").where({ id }).delete()

		
	} catch (error) {
		
	}
}