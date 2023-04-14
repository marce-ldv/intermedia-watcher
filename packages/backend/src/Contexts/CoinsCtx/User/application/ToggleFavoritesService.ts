import { UserRepository } from '../domain/UserRepository';

export class ToggleFavoritesService {
  private readonly repository: UserRepository;

  constructor(userService: UserRepository) {
    this.repository = userService;
  }

  async run(favorite: string, email: string): Promise<void> {
    await this.repository.toggleFavorite(favorite, email);
  }
}
