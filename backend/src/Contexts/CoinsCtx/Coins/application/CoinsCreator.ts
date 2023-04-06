import { Coin } from '../domain/Coin';
import { CoinRepository } from '../domain/CoinRepository';

export class CoinsCreator {
	private readonly repository: CoinRepository;

	constructor(repository: CoinRepository) {
		this.repository = repository;
	}

	async run(id: string, name: string, duration: string): Promise<void> {
		const course = new Coin({ id, name, duration });

		return this.repository.save(course);
	}
}
