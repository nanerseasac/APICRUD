import knex from "../dbKnex/connection";
import I_Tasks from "../interfaces/I_Tasks";

export const addTask_Service = async ({
	user_id,
	title,
	description,
	is_completed,
}: I_Tasks): Promise<I_Tasks[]> => {
	try {
		const task: I_Tasks[] = await knex("tasks").insert({
			user_id: user_id,
			title,
			description,
			is_completed,
		});

		if (!task) {
			return [];
		}
		return task;
	} catch (error: any) {
		console.error(error);
		return error;
	}
};

export const deleteTask_Service = async (id: string) => {
	try {
		const idTask = parseInt(id, 10);
		const task: I_Tasks = await knex("tasks").where({ id: idTask }).first();

		if (!task) {
			return undefined;
		}

		const deletedTask = await knex("tasks").del().where({ id: idTask });

		if (deletedTask === 0) {
			return [];
		}
		return deletedTask;
	} catch (error) {
		console.error(`Erro ao deletar o produto: ${error}`);
	}
};

export const updateTask_Service = async (
	id: string,
	title: string,
	description: string,
	is_completed: string
) => {
	try {
		const idTask = parseInt(id, 10);

		const task: I_Tasks[] = await knex("tasks").where({ id: idTask }).first();

		if (!task) {
			return undefined;
		}

		const taskUpdated = await knex("tasks")
			.update({ title, description, is_completed })
			.where({ id: idTask });
		if (!taskUpdated) {
			return undefined;
		}

		return taskUpdated;
	} catch (error) {
		console.error(`Erro ao atualizar o produto: ${error}`);
	}
};

export const patchTask_Service = async (id: string, is_completed: string) => {
	try {
		const idTask = parseInt(id, 10);

		const task: I_Tasks[] = await knex("tasks").where({ id: idTask }).first();

		if (!task) {
			return undefined;
		}

		const taskUpdated = await knex("tasks")
			.update({ is_completed })
			.where({ id: idTask });
		if (!taskUpdated) {
			return undefined;
		}

		return taskUpdated;
	} catch (error) {
		console.error(`Erro ao atualizar a task: ${error}`);
	}
};
export const getTask_Service = async (id: string) => {
	try {
		const task: I_Tasks[] = await knex("tasks").where({ id }).first();

		if (!task) {
			return undefined;
		}

		return task;
	} catch (error) {
		console.error(`Erro ao mostrar a task: ${error}`);
	}
};

export const getAllTask_Service = async (id: number) => {
	try {
		const tasks: I_Tasks[] = await knex("tasks").where({ user_id: id });

		if (!tasks.length) {
			return [];
		}

		return tasks;
	} catch (error) {
		console.error(`Erro ao mostrar a task: ${error}`);
	}
};
