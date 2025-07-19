import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@app/common';
import { DRIZZLE_ASYNC_PROVIDER, drizzleProvider } from './database.provider';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [drizzleProvider],
  exports: [DRIZZLE_ASYNC_PROVIDER],
})
export class DatabaseModule {}
