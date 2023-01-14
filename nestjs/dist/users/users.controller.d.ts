import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): CreateUserDto[];
    getOne(_id: string): string;
    postUser(body: CreateUserDto): CreateUserDto;
    putUser(_id: string, body: CreateUserDto): CreateUserDto;
    deleteUser(_id: string): string;
}
