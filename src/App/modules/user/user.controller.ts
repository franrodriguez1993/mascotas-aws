import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({description:"Test endpoint: Login user"})
  async login() {
    return { statusCode: HttpStatus.OK, result: 'login' };
  }
}
