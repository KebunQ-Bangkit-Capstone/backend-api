import { UpdateUserDTO, UserDTO } from ".";
import { sql } from "../../setup";
import { DatabaseError } from "../../utils/customError";

export class UserService {
    constructor() {
    }

    async create(data: UserDTO) {
        const { id, name, created_at } = data;
        const query = `insert into users values ($1, $2, $3)`;
        const values = [id, name, created_at];

        try {
            await sql.query(query, values);
        } catch (err: any) {
            if (err.code === '23505') {
                throw new DatabaseError('User already exist', 409);
            }
            throw new DatabaseError(err.message);
        }
    }

    async getOne(id: string) {
        const query = `select * from users where id = $1`;

        try {
            const { rows } = await sql.query<UserDTO>(query, [id]);

            if (rows.length === 0) {
                throw new DatabaseError('User not found', 404);
            }

            return rows[0];
        } catch (err: any) {
            if (err.statusCode === 404) {
                throw err;
            }
            throw new DatabaseError(err.message);
        }
    }

    async getMany() {
        const query = `select * from users`;

        try {
            const { rows } = await sql.query<UserDTO>(query);

            return rows;
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async update(id: string, newData: UpdateUserDTO) {
        const { name } = newData;
        const query = `update users set name = $1 where id = $2`;
        const values = [name, id];

        try {
            await this.getOne(id);
            await sql.query(query, values);
        } catch (err: any) {
            if (err.statusCode === 404) {
                throw err;
            }
            throw new DatabaseError(err.message);
        }
    }

    async delete(id: string) {
        const query = `delete from users where id = $1`;

        try {
            await this.getOne(id);
            await sql.query(query, [id]);
        } catch (err: any) {
            if (err.statusCode === 404) {
                throw err;
            }
            throw new DatabaseError(err.message);
        }
    }
}