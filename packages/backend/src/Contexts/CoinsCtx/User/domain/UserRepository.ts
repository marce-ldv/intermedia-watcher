import type { User } from './User';

export interface UserRepository {
  register(user: User): Promise<void>;
  findUserByEmail(user: { email: string }): Promise<User>;
  findAllFavorites(email: { email: string }): Promise<string[]>;
  toggleFavorite(favorite: string, email: string): Promise<any>;
}
