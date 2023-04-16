import { Coin } from '../../../../../src/Contexts/CoinsCtx/Coins/domain/Coin';
import { CoinRepository } from '../../../../../src/Contexts/CoinsCtx/Coins/domain/CoinRepository';
import { CoinUpdateDTO } from '../../../../../src/Contexts/CoinsCtx/Coins/application/dto/CoinUpdateDTO';

export class CoinRepositoryMock implements CoinRepository {
  private readonly mockSave = jest.fn();

  assertLastSavedCoinsIs(expected: Coin): void {
    const mock = this.mockSave.mock;
    const savedArgument = (mock.calls[mock.calls.length - 1] as Coin[])[0];
    expect(savedArgument).toBeInstanceOf(Coin);
    expect(savedArgument).toStrictEqual(expected);
  }

  async save(coin: Coin): Promise<void> {
    await this.mockSave(coin);
  }

  getAll(): Promise<Coin[]> {
    return Promise.resolve([]);
  }

  getTrending(): Promise<Coin[]> {
    return Promise.resolve([]);
  }

  remove(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(coin: CoinUpdateDTO): Promise<void> {
    return Promise.resolve(undefined);
  }
}
