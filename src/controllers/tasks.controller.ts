import knex from "../dbKnex/connection"
import { Request, Response } from "express";

export const addTask = async (req: Request, res: Response) => {
    const { title, description, is_completed } = req.body

    if(!title) {
        return res.status(400).json("O campo title");
    }
    if(!description) {
        return res.status(400).json("O campo description");
    }
    if(!is_completed) {
        return res.status(400).json("O campo is_completed");
    }

    try {
       const task = await knex('tasks').insert({ title, description, is_completed })


       
       
    } catch (error) {
        throw new Error('Failed to create task');
    }
}