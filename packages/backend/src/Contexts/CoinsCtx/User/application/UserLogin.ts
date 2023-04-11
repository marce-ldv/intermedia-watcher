import { UserRepository } from '../domain/UserRepository';
import { TypeUser, User } from '../domain/User';

export class UserLogin {
  private readonly repository: UserRepository;

  constructor(userService: UserRepository) {
    this.repository = userService;
  }

  async run(body: TypeUser): Promise<User> {
    try {
      const user = await this.repository.findUserByEmail({
        email: body.email
      });

      return user;
    } catch (error) {
      return new User({ email: '', password: '', username: '', favorites: [], role: 'user' })
    }
  }
}
