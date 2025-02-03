import { CreateUserResponse, UserDto } from './user.dto';
import { UserEntity } from '../db/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    create(newUser: UserDto): Promise<CreateUserResponse>;
    findByUserName(username: string): Promise<UserDto | null>;
}
