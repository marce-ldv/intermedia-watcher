import type { User } from './User';

export interface UserRepository {
  register(user: User): Promise<void>;
  findUserByEmail(user: { email: string }): Promise<User>;
}
