import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserMapper } from 'core/repository/user/mapper/user.mapper';
import { EnumUserRole } from 'core/repository/user/types/user.entities';
import { GetUserId, SetPermissions } from 'infrastructure/libs/decorators/controller';
import { NestUserService } from 'infrastructure/modules/user/NestUser.service';
import { DtoUser, DtoUserClient } from '../../dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: NestUserService) {}

    @ApiOkResponse({
        description: 'Get all users',
        type: DtoUser,
    })
    @SetPermissions(EnumUserRole.ADMIN)
    @Get('getAll')
    async getUser() {
        return this.userService.getAll();
    }

    @ApiOkResponse({
        description: 'Get user by id',
        type: DtoUserClient,
    })
    @SetPermissions(EnumUserRole.USER)
    @Get('getById')
    async getUserById(@GetUserId() userId: string) {
        const user = await this.userService.getById(userId);
        if (!user) throw new NotFoundException('User not found');
        return UserMapper.toClientFormat(user);
    }
}
