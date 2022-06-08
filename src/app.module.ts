import { BetterLoggerModule } from '@einsenundnullen/better-nestjs-logger';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BetterLoggerModule.forRoot({
      json: false,
    }),
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: 'test',
      type: 'mongo',
      debug: true,
      ensureIndexes: true,
      highlighter: new MongoHighlighter(),
      clientUrl: 'mongodb://root:12345678@localhost:27020/?authSource=admin',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
