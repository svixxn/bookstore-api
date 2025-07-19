// src/drizzle/drizzle.provider.ts
import { Provider } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './configs/database.schema';
import { ConfigService } from '@nestjs/config';

export const DRIZZLE_ASYNC_PROVIDER = 'DRIZZLE_ASYNC_PROVIDER';

export const drizzleProvider: Provider = {
  provide: DRIZZLE_ASYNC_PROVIDER,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const connectionString = configService.get<string>('DATABASE_URL');
    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    const pool = new Pool({
      connectionString,
    });
    return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
  },
};

export type DbType = NodePgDatabase<typeof schema>;
