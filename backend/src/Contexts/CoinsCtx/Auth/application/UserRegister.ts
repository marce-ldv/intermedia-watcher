import {UserRepository} from "../domain/UserRepository";

export class UserRegister {
	private readonly repository: UserRepository;

	constructor(userService: UserRepository) {
		this.repository = userService;
	}

	async run(): Promise<void> {
		return this.repository.register({ email: 'asd', password: 'ds', username: 'dffd' });
	}
}
