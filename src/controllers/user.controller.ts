import knex from "../dbKnex/connection";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashedPw } from "../hashedPw";
import { addUser_Service } from "../services/user.services";

export const addUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email) {
		return res.status(404).json("O campo email é obrigatório");
	}

	if (!password) {
		return res.status(404).json("O campo password é obrigatório");
	}

	try {
		const userExist = await knex("users").where({ email }).first();

		if (userExist) {
			return res.status(400).json("O email já existe");
		}

		const hashedPw = await bcrypt.hash(password, 10);

		const user = await addUser_Service({ email, password: hashedPw})

		if (!user) {
			return res.status(400).json("O usuário não foi cadastrado.");
		}

		return res.status(201).json({ message: "User Created" });
	} catch (error) {
		console.log(error);
		throw new Error("Failed to register");
	}
};

export const userLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json("Os campos email e password são obrigatórios");
	}

	try {
		const user = await knex("users").where({ email });

		if (!user) {
			return res.status(404).json("Usuário não encontrado");
		}

		const hashPass = await bcrypt.compare(password, user[0].password);

		if (!hashPass) {
			return res.status(400).json("Email e senha não confere");
		}

		const token = jwt.sign({ id: user[0].id }, hashedPw, { expiresIn: "8h" });

		const { password: _, ...userData } = user[0];

		return res.status(200).json({
			user: userData,
			token,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Failed to login");
	}
};
