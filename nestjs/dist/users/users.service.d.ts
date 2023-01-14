import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private users;
    getUser(_id: string): CreateUserDto;
    getUsers(): CreateUserDto[];
    postUser(user: CreateUserDto): CreateUserDto;
}
