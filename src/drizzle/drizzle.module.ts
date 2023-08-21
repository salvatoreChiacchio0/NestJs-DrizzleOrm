import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {  drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { PG_CONNECTION } from '../../constants';
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from '../drizzle/schema';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
      
        const client = new Client({
          connectionString:connectionString,
        });

        await client.connect();
        const db =  drizzle(client,{schema}) 

       
        return db
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}


