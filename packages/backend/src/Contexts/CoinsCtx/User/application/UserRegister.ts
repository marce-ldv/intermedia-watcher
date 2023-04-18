import { UserRepository } from '../domain/UserRepository';
import { TypeUser } from '../domain/User';

export class UserRegister {
  private readonly repository: UserRepository;

  constructor(userService: UserRepository) {
    this.repository = userService;
  }

  async run(body: TypeUser): Promise<void> {
    return this.repository.register({
      email: body.email,
      password: body.password,
      username: body.username,
      favorites: body.favorites || [],
      role: body.role
    });
  }
}
