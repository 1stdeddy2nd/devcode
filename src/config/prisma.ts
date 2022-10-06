import {PrismaClient} from "@prisma/client";

export const config = {
    host: process.env.MYSQL_DBHOST || 'localhost',
    database: process.env.MYSQL_DBNAME || 'mydb',
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'mynewpassword',
}

export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: `mysql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`
        }
    },
    log: ['query']
})
