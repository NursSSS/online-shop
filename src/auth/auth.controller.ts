import { Body, Controller, Post, Param } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { AuthService } from './auth.service';
import { ValidateDto } from './dto';


@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
    constructor(
        private AuthService: AuthService
    ){}

    @Post('signin')
    @ApiOkResponse({ type: UserEntity })
    @ApiBadRequestResponse({ description: 'User with this number already exist || Wrong number || Validation error' })
    async signin(@Body() dto: CreateUserDto, @Res() res: Response){
        return await this.AuthService.signin(dto, res)
    }

    @Post('login/:phoneNumber')
    @ApiOkResponse({ type: UserEntity })
    @ApiNotFoundResponse({ description: 'User is not found' })
    @ApiBadRequestResponse({ description: 'Wrong number' })
    async login(@Param('phoneNumber') phoneNumber: string, @Res() res: Response){
        return await this.AuthService.login(phoneNumber, res)
    }

    @Post('validate')
    @ApiOkResponse({ description: 'JwtToken'})
    @ApiNotFoundResponse({ description: 'User is not found' })
    @ApiBadRequestResponse({ description: 'Wrong code || Validation error' })
    async validate(@Body() dto: ValidateDto){
        return await this.AuthService.validate(dto)
    }

    @Post('change/:number')
    @ApiOkResponse({ type: UserEntity })
    @ApiBadRequestResponse({ description: 'User with this number already exist || Wrong number' })
    @ApiNotFoundResponse({ description: 'User is not found' })
    async changeNumber(@Param() number: string, @Res() res: Response){
        return await this.AuthService.changeNumber(number, res)
    }
}
