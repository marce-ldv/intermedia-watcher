import type { User } from './User';

export interface UserRepository {
	register(user: User): Promise<void>;
	// login(user: User): Promise<User[]>;
}
