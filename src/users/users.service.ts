import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { User, user, NewUser } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
    constructor(
        @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,

    ) { }

    public async findAll(): Promise<User[]> {
        return await this.conn.select().from(user)
    }

    public async findUserById(id: number): Promise<User> {
        return await this.conn.query.user.findFirst({
           
            where: (eq(user.id, id))
        })
    }

    public async createUser(NewUser: NewUser): Promise<User[]> {
        await this.conn.insert(user).values(NewUser)
        return this.findAll()
    }

    public async patchUser(id: number, userToEdit: NewUser): Promise<User[]> {
        await this.conn.update(user).set({ name: userToEdit.name, password: userToEdit.password, email: userToEdit.email, role: userToEdit.role, updatedAt: new Date(),surname:userToEdit.surname ,generalPayment:userToEdit.generalPayment ,otherPayment: userToEdit.otherPayment }).where(eq(user.id, id))
        return this.findAll()
    }

    public async updateUser(id: number, userToEdit: User): Promise<User[]> {
        await this.conn.update(user).set({ name: userToEdit.name || '', password: userToEdit.password, email: userToEdit.email, role: userToEdit.role, updatedAt: new Date(),surname:userToEdit.surname ,generalPayment:userToEdit.generalPayment ,otherPayment: userToEdit.otherPayment }).where(eq(user.id, id))
        return this.findAll()
    }

    public async deleteUser(id: number): Promise<User[]> {
        await this.conn.delete(user).where(eq(user.id, id))
        return this.findAll()
    }
}
