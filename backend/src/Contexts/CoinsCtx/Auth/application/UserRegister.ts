import {UserService} from "./UserService";

export class UserRegister {
	private readonly service: UserService;

	constructor(userService: UserService) {
		this.service = userService;
	}

	async run(): Promise<void> {
		return this.service.register();
	}
}
