
import knex from "../dbKnex/connection"
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction} from "express";
import { hashedPw } from "../hashedPw";


export const verifyUserAccMiddleware = async (req: Request, res:Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json("Não autorizado");
	}

	try {
		const token = authorization.replace("Bearer ", "").trim();
    
		const { id } = jwt.verify(token, hashedPw) as { id: number };;

		const queryKnex = await knex("users").where({ id }).first();

		if (queryKnex.length === 0) {
			return res.status(404).json("Usuario não encontrado");
		}

		const { senha, ...user } = queryKnex;

		(req as any).user = user;

		next();
	} catch (error) {
		console.log(error);
		throw new Error('Unauthorized');
	}
};

