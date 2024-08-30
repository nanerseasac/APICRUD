import { Request, Response, NextFunction } from "express";
import z from "zod";

const TasksSchema = z.object({
	title: z
		.string()
		.min(3, { message: "O campo título deve ter pelo menos 3 caracteres." })
		.max(30, { message: "O campo título não deve exceder 30 caracteres." }),
	description: z
		.string()
		.min(3, { message: "O campo descrição deve ter pelo menos 3 caracteres." })
		.max(20, { message: "O campo descrição não deve exceder 20 caracteres." }),
	is_completed: z.enum(["Y", "N"], {
		message: "O campo 'is_completed' deve ser 'Y' ou 'N'.",
	}),
});

const TasksSchemaPatch = z.object({
	is_completed: z.enum(["Y", "N"], {
		message: "O campo 'is_completed' deve ser 'Y' ou 'N'.",
	}),
});

export const taskMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const validationResult = TasksSchema.safeParse(req.body);

		if (!validationResult.success) {
			const errorMessage = validationResult.error.errors[0].message;

			return res.status(400).json({ message: errorMessage });
		}
		next();
	} catch (error) {
		return res.status(500).json({ message: `Erro durante validação dos dados!` });
	}
};

export const taskPatchMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const validationResult = TasksSchemaPatch.safeParse(req.body);

		if (!validationResult.success) {
			const errorMessage = validationResult.error.errors[0].message;

			return res.status(400).json({ message: errorMessage });
		}
		next();
	} catch (error) {
		return res.status(500).json({ message: `Erro durante validação dos dados!` });
	}
};
