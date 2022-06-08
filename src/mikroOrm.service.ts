import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';
import { TestEntity } from 'src/entities/test.entity';

@Injectable()
export class MikroOrmService {
  private readonly logger = new Logger(MikroOrmService.name);

  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  update(uid: string, data: any): any {
    this.logger.log('Update', {
      uid,
      data,
    });
  }

  async create(): Promise<any> {
    this.logger.log('Create');
    await this.em
      .fork({})
      .getRepository(TestEntity)
      .persistAndFlush(new TestEntity('haslas'));
  }
  async get(): Promise<any> {
    return this.em.fork({}).getRepository(TestEntity).findAll();
  }
}
