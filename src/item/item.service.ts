import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { PG_CONNECTION } from '../../constants';
import { Item, item, NewItem } from '../drizzle/schema';
import { eq, sql } from 'drizzle-orm';


@Injectable()
export class ItemService {
    
    constructor(
        @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,

    ) { }

    public async findAll(): Promise<Item[]> {
        return await this.conn.select().from(item)
    }

    public async findItemById(id: number): Promise<Item> {
        return await this.conn.query.item.findFirst({
            where: (eq(item.id, id))
        })
    }

    public async createItem(NewItem: NewItem): Promise<Item[]> {
        await this.conn.insert(item).values(NewItem)
        return await this.conn.select().from(item)
    }

    public async patchItem(id: number, itemToEdit: NewItem): Promise<Item[]> {
        await this.conn.update(item).set({ name: itemToEdit.name, quantity:itemToEdit.quantity,type:itemToEdit.type,inventoryId:itemToEdit.inventoryId }).where(eq(item.id, id))
        return await this.conn.select().from(schema.item)
    }

    public async updateItem(id: number, itemToEdit: Item): Promise<Item[]> {
        await this.conn.update(item).set({ name: itemToEdit.name || '', quantity:itemToEdit.quantity,type:itemToEdit.type,inventoryId:itemToEdit.inventoryId }).where(eq(item.id, id))
        return await this.conn.select().from(schema.item)
    }

    public async deleteItem(id: number): Promise<Item[]> {
        await this.conn.delete(item).where(eq(item.id, id))
        return await this.conn.select().from(schema.item)
    }

    public async getAllQuantityByItemName(): Promise<any[]> {
        return await this.conn.select({totQuantity: sql<number>`sum(${item.quantity})`,name:item.name})
        .from(item)
        .groupBy(({name})=>name)
    }
}
