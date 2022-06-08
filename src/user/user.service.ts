import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { RoleEntity, UserEntity } from '../entities';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async createUser() {
    const franz = new UserEntity('Franz', [new RoleEntity('admin')]);
    const hans = new UserEntity('Hans', [new RoleEntity('azubi')]);
    await this.userRepository.persistAndFlush([franz, hans]);
  }
  public async getUsers() {
    const result = await this.userRepository.find({});
    return result;
  }

  public async getAdminUsers() {
    const result = await this.userRepository.find({
      // YAY! object notation works
      roles: {
        uid: 'admin',
      },
    });

    return result;
  }

  public async updateUsers() {
    const admins = await this.getAdminUsers();

    for (const user of admins) {
      user.name = user.name + ' (admin)';
    }

    // persist all at the same time
    await this.userRepository.persistAndFlush(admins);
  }

  public async deleteUsers() {
    const users = await this.getUsers();

    for (const user of users) {
      // this does not remove until flushed
      await this.userRepository.remove(user);
    }
    await this.userRepository.flush();
  }
}
