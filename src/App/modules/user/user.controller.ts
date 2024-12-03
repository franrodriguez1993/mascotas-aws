import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import axios from 'axios';

@Controller('user')
export class UserController {

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({description:"Test endpoint: Login user"})
  async login() {

    const response = await axios.post(process.env.AWS_GATEWAY);
    console.log(response.data);

    return { statusCode: HttpStatus.OK, result: 'login' };
  }
}
