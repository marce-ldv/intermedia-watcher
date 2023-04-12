import { UserRepository } from '../domain/UserRepository';

export class ToggleFavoritesService {
  private readonly repository: UserRepository;

  constructor(userService: UserRepository) {
    this.repository = userService;
  }

  async run(body: { username: string; email: string; password: string; favorites: string }): Promise<void> {
    await this.repository.toggleFavorite({
      email: body.email,
      favorite: body.favorites
    });
  }
}
