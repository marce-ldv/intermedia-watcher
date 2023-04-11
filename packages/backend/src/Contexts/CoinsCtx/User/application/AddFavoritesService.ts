import { UserRepository } from '../domain/UserRepository';

export class AddFavoritesService {
  private readonly repository: UserRepository;

  constructor(userService: UserRepository) {
    this.repository = userService;
  }

  async run(body: { username: string; email: string; password: string; favorites: string }): Promise<void> {
    await this.repository.addFavorite({
      email: body.email,
      favorite: body.favorites
    });
  }
}
