import { UserRepository } from '../domain/UserRepository';
import { TypeUser, User } from '../domain/User';
import { HashPasswordService } from './HashPasswordService';

export class UserLogin {
  private readonly repository: UserRepository;

  constructor(userService: UserRepository) {
    this.repository = userService;
  }

  async run(body: TypeUser): Promise<User> {
    const user = await this.repository.findUserByEmail({
      email: body.email
    });

    if (!user) {
      throw new Error('User not found');
    }

    const hashPasswordService = new HashPasswordService();

    if (!hashPasswordService.compare(body.password, user.password)) {
      throw new Error('Password is not correct');
    }

    return user;
  }
}
