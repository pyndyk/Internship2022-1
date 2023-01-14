import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users=[]

getUser(_id:string): CreateUserDto{
return this.users.find( p=> p._id==_id)
}

getUsers():CreateUserDto[]{
return this.users;
}
postUser(user:CreateUserDto):CreateUserDto{
 this.users.push(user)   
 return user;
}
}
