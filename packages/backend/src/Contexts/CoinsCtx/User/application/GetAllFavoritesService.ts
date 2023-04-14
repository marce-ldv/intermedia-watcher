import { UserRepository } from '../domain/UserRepository';

export class GetAllFavoritesService {
  private readonly repository: UserRepository;

  constructor(userService: UserRepository) {
    this.repository = userService;
  }

  async run(email: string): Promise<string[]> {
    return await this.repository.findAllFavorites({
      email
    });
  }
}
