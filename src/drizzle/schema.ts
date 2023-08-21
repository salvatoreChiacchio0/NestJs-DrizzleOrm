import { InferModel, relations } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgTable, primaryKey, serial,smallint,text, timestamp } from 'drizzle-orm/pg-core';
 
export const rolesEnum = pgEnum('roles', ['ADMIN', 'USER']);
export const itemTypeEnum = pgEnum('types', ['FOOD', 'MATERIAL','OTHER']);


export const user = pgTable('user',{
    id: serial('id').primaryKey(),
    name: text('name'),
    surname:text('surname'),
    password: text('password').notNull(),
    email:text('email').unique().notNull(),
    role: rolesEnum('roles').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_At').notNull().defaultNow(),
    generalPayment: boolean("general").default(false),
    otherPayment:boolean('other').default(false)
});

export const inventory = pgTable('inventory',{
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    day: smallint('dayNum').notNull(),
    time: text('time')
})
export const item = pgTable('item',{
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    quantity: smallint('quantity'),
    type:itemTypeEnum('types').notNull(),
    inventoryId: integer('inventory_id'),

})

export const inventoryRelations = relations(inventory, ({ many }) => ({
     	items: many(item),
     }));

     export const itemsRelations = relations(item, ({ one }) => ({
        user: one(inventory, {
            fields: [item.inventoryId],
            references: [inventory.id],
        }),
    }));     
// export const itemsRelations = relations(item, ({ many }) => ({
// 	itemsToInventory: many(itemsToInventory),
// }));
// export const inventoryRelations = relations(inventory, ({ many }) => ({
// 	itemsToInventory: many(itemsToInventory),
// }));

// export const itemsToInventory = pgTable('items_to_inventory', {
//     id: serial('id').notNull(),
//         quantity: smallint('quantity'),
// 		itemId: integer('item_id').notNull().references(() => item.id),
// 		inventoryId: integer('inventory_id').notNull().references(() => inventory.id),
// 	}
// );
 
// export const itemsToInventoryRelations = relations(itemsToInventory, ({ one,many }) => ({
// 	inventory: many(inventory, {
// 		fields: [itemsToInventory.inventoryId],
// 		references: [inventory.id],
// 	}),
// 	item: one(item, {
// 		fields: [itemsToInventory.itemId],
// 		references: [item.id],
// 	}),
// }));



 
export type User = InferModel<typeof user>; // return type when queried
export type NewUser = InferModel<typeof user, 'insert'>; // insert type 
export type Item = InferModel<typeof item>; // return type when queried
export type NewItem = InferModel<typeof item,"insert">; // return type when queried
export type Inventory = InferModel<typeof inventory>; // return type when queried
export type NewInventory = InferModel<typeof inventory,"insert">; // return type when queried

// export type ItemsToInventory = InferModel<typeof itemsToInventory>; // return type when queried
// export type NewMItemsToInventory = InferModel<typeof itemsToInventory,"insert">; // return type when queried