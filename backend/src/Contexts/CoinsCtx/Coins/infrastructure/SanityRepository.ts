// export class SanityRepository implements SanityRepository {
//   private readonly repository: Repository<Coin>;
//
//   constructor(repository: Repository<Coin>) {
//     this.repository = repository;
//   }
//
//   async save(coin: Coin): Promise<void> {
//     await this.repository.save(coin);
//   }
//
//   async getAll(coin: Coin): Promise<Coin[]> {
//     return this.repository.find();
//   }
// }
