import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoDbService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MongoDbService.name);
  private readonly dbName = 'test';
  private readonly collectionName = 'test';

  private client: MongoClient | null = null;

  async onModuleInit() {
    await this.createClient();
  }
  async onModuleDestroy() {
    await this.closeClient();
  }

  update(uid: string, data: any): any {
    this.logger.log('Update', {
      uid,
      data,
    });
  }
  create(uid: string, data: any): any {
    this.logger.log('Create', {
      uid,
      data,
    });
  }
  async get(): Promise<any> {
    const data = await this.getDb().find({}).toArray();
    this.logger.log('Get', { data });
    return data;
  }

  private getDb() {
    if (!this.client) {
      throw new Error('Could not get MongoDB client');
    }
    return this.client.db(this.dbName).collection(this.collectionName);
  }
  private getURI() {
    return 'mongodb://root:12345678@localhost:27020/?authSource=admin';
  }

  private async closeClient() {
    this.logger.warn('Closing client');
    if (this.client) {
      await this.client.close();
    }
    this.client = null;
  }
  private async createClient() {
    const uri = this.getURI();

    this.logger.log('Init client', {
      uri,
    });

    const client = await MongoClient.connect(uri, {
      // keepAlive: true,
      // autoReconnect: true,
      maxPoolSize: 20,
    });

    this.client = client;
  }
}
