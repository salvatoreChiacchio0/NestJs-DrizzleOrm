import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { PG_CONNECTION } from '../../constants';
import { Inventory, inventory, NewInventory } from '../drizzle/schema';
import { eq, sql } from 'drizzle-orm';


@Injectable()
export class InventoryService {
        
    constructor(
        @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,

    ) { }

    public async findAll(): Promise<any[]> {
        return await this.conn.query.inventory
        .findMany({
            with:{ 
                items:true
            },
        })
    }

    public async findInventoryById(id: number): Promise<Inventory> {
        return await this.conn.query.inventory.findFirst({
            where: (eq(inventory.id, id))
        })
    }
    public async findItemsByInventoryDay(day: number): Promise<Inventory[]> {
        return  await this.conn.query.inventory
        .findMany({
            with:{ 
                items:true
            },
            where:eq(inventory.day,day)
        })
    
    }


    public async createInventory(newInventory: NewInventory): Promise<Inventory[]> {        
        await this.conn.insert(inventory).values(newInventory)
        return this.findAll()
    }

    public async patchInventory(id: number, inventoryToEdit: NewInventory): Promise<Inventory[]> {
        await this.conn.update(inventory).set({ name: inventoryToEdit.name, day:inventoryToEdit.day,time:inventoryToEdit.time }).where(eq(inventory.id, id))
        return this.findAll()
    }

    public async updateInventory(id: number, inventoryToEdit: Inventory): Promise<Inventory[]> {
        await this.conn.update(inventory).set({ name: inventoryToEdit.name || '', day:inventoryToEdit.day,time:inventoryToEdit.time }).where(eq(inventory.id, id))
        return this.findAll()
    }

    public async deleteInventory(id: number): Promise<Inventory[]> {
        await this.conn.delete(inventory).where(eq(inventory.id, id))
        return this.findAll()
    }
}
