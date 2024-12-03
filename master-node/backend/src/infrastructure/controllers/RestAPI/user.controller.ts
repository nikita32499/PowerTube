import { Controller } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //   return this.userService.create(createUserDto);
    // }

    // @Get()
    // findAll() {
    //   return this.userService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.userService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //   return this.userService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.userService.remove(+id);
    // }

    // async login(login: string, password: string) {
    //     const user = await this.userService.getByLogin(login);
    //     if (!user) return null;

    //     const passwordValidate = await this.authService.checkPassword(
    //         password,
    //         user.password,
    //     );
    //     if (!passwordValidate) return null;

    //     await this.userService.updateLastAt(user.id);
    //     const userData: TUserJwtData = {
    //         userId: user.id,
    //     };

    //     const token = await this.authService.createToken(userData);

    //     return { user, token };
    // }
}
