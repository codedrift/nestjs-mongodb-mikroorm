import { BetterLoggerModule } from '@einsenundnullen/better-nestjs-logger';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MikroOrmService } from 'src/mikroOrm.service';
import { AppController } from './app.controller';
import { MongoDbService } from './mongodb.service';

@Module({
  imports: [
    BetterLoggerModule.forRoot({
      json: false,
    }),
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: 'test',
      debug: true,
      allowGlobalContext: false,
      type: 'mongo',
      registerRequestContext: false,
      clientUrl: 'mongodb://root:12345678@localhost:27020/?authSource=admin',
    }),
  ],
  controllers: [AppController],
  providers: [MongoDbService, MikroOrmService],
})
export class AppModule {}
