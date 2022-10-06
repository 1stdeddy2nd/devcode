import {Response, Request} from "express";
import {prisma} from "../../config/prisma";
import {ActivityGroups} from "./entitiy";
import {todoItemsService} from "../todo-items/service";
import {handleValidationBody} from "../../utils/func";

const getById = async (res: Response, id: number) => {
    const activityGroups = await prisma.$queryRaw<ActivityGroups []>`SELECT * FROM activity_group WHERE id = ${id}`;
    if(!activityGroups.length) throw ({message: `Activity with ID ${id} Not Found`, code: 404});
    return activityGroups[0];
}

const getAll = async ():Promise<ActivityGroups []> => {
    return await prisma.$queryRaw<ActivityGroups []>`SELECT * FROM activity_group`;
}

const deleteById = async (res: Response, id: number): Promise<any> => {
    await getById(res, id);
    const todoByActivityGroupId = await todoItemsService.getAllByActivityGroupId(id);
    if(todoByActivityGroupId.length) throw ({message: `Activity with ID ${id} still have todo items`, code: 403});
    return await prisma.$queryRaw`DELETE FROM activity_group WHERE id = ${id}`;
}

const create = async (req: Request, title: string, email: string): Promise<any> => {
    handleValidationBody(req);
    return await prisma.activity_group.create({
        data: {
            title: title,
            email: email,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        }
    })
        .catch((e: Error) => {
            throw ({message: e.message, code: 403})
        })
}

const update = async (req: Request, res: Response, id: number, title?: string, email?: string): Promise<ActivityGroups> => {
    handleValidationBody(req);
    await getById(res, id)
    return await prisma.activity_group.update({
        where: {
            id: id
        },
        data: {
            title: title ?? undefined,
            email: email ?? undefined,
            updated_at: new Date()
        }
    })
        .catch((e: Error) => {
            throw ({message: e.message, code: 403})
        })
}

export const activityGroupsService = {update, create, getAll, getById, deleteById}
