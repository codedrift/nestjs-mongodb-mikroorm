import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserEntitySubscriber } from './user.entity.subscriber';
import { UserService } from './user.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [UserEntity, RoleEntity],
    }),
  ],
  providers: [UserService, UserEntitySubscriber],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
