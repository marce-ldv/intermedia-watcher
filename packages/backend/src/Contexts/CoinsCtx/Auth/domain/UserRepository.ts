import type { User } from './User';

export interface UserRepository {
  register(user: User): Promise<void>;
  findUserByEmail(user: { email: string }): Promise<User>;
  findAllFavorites(user: { email: string }): Promise<string[]>;
  addFavorite(user: { email: string; favorite: string }): Promise<any>;
}
