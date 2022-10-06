import {prisma} from "../../config/prisma";
import {TodoItem} from "./entity";
import {Response, Request} from "express";
import {handleValidationBody} from "../../utils/func";

const getById = async (res: Response, id: number) => {
    const todos = await prisma.$queryRaw<TodoItem []>`SELECT * FROM todo WHERE id = ${id}`;
    if(!todos.length) throw new Error(`Todo item with ID ${id} Not Found`);
    return todos[0];
}

const getAll = async ():Promise<TodoItem []> => {
    return await prisma.$queryRaw<TodoItem []>`SELECT * FROM todo`;
}

const getAllByActivityGroupId = async(activityGroupId: number): Promise<TodoItem []> => {
    return await prisma.$queryRaw<TodoItem []>`SELECT * FROM todo WHERE activity_group_id = ${activityGroupId}`;
}

const deleteById = async (res: Response, id: number): Promise<any> => {
    await getById(res, id);
    return await prisma.$queryRaw`DELETE FROM todo WHERE id = ${id}`;
}

const create = async (req: Request, title: string, activity_group_id: number): Promise<TodoItem> => {
    handleValidationBody(req);
    return await prisma.todo.create({
        data: {
            title: title,
            activity_group_id: activity_group_id,
            is_active: 1,
            created_at: new Date(),
            updated_at: new Date(),
            priority: 'very-high'
        }
    })
}

const update = async (req: Request, res: Response, id: number, title?: string): Promise<TodoItem> => {
    handleValidationBody(req);
    await getById(res, id)
    return await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            title: title ?? undefined,
            updated_at: new Date()
        }
    })
}

export const todoItemsService = {getById, getAll, getAllByActivityGroupId, deleteById, update, create};
