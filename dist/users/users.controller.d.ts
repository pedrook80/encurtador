import { UsersService } from './users.service';
import { CreateUserResponse, UserDto } from './user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(user: UserDto): Promise<CreateUserResponse>;
}
