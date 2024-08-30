import knex from "../dbKnex/connection";
import I_User from "../interfaces/I_User";

export const addUser_Service = async ({
	email,
	password,
}: I_User): Promise<I_User[]> => {
	try {
		const user: I_User[] = await knex("users").insert({
			email,
			password,
		});

		if (!user) {
			return [];
		}
		return user;
	} catch (error: any) {
		console.error(error);
		return error;
	}
};
