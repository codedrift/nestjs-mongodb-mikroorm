import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  getUser(): any {
    return this.userService.getUsers();
  }

  @Get('admin')
  getAdminUsers(): any {
    return this.userService.getAdminUsers();
  }

  @Get('create')
  createUser(): any {
    return this.userService.createUser();
  }

  @Get('update')
  updateUsers(): any {
    return this.userService.updateUsers();
  }

  @Get('delete')
  deleteUser(): any {
    return this.userService.deleteUsers();
  }
}
