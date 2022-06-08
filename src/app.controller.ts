import { Controller, Get } from '@nestjs/common';
import { MikroOrmService } from 'src/mikroOrm.service';

@Controller()
export class AppController {
  constructor(private readonly mikroOrmService: MikroOrmService) {}

  @Get('')
  getEntity(): any {
    return this.mikroOrmService.get();
  }

  @Get('create')
  createEntity(): any {
    return this.mikroOrmService.create();
  }

  @Get('update')
  updateEntity(): any {
    return this.mikroOrmService.update('1231231', {
      baz: 'bum',
    });
  }
}
