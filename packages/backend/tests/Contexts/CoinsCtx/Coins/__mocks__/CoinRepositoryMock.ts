import { Coin } from '../../../../../src/Contexts/CoinsCtx/Coins/domain/Coin';
import { CoinRepository } from '../../../../../src/Contexts/CoinsCtx/Coins/domain/CoinRepository';

export class CoinRepositoryMock implements CoinRepository {
  private readonly mockSave = jest.fn();

  async save(coin: Coin): Promise<void> {
    await this.mockSave(coin);
  }

  assertLastSavedCoinsIs(expected: Coin): void {
    const mock = this.mockSave.mock;
    const lastSavedCoin = (mock.calls[mock.calls.length - 1] as Coin[])[0];
    expect(lastSavedCoin).toBeInstanceOf(Coin);
    expect(lastSavedCoin.id).toEqual(expected.id);
  }

  getAll(coin: Coin): Promise<Coin[]> {
    return Promise.resolve([]);
  }

  getTrending(coin: Coin): Promise<Coin[]> {
    return Promise.resolve([]);
  }

  update(coin: Coin): Promise<void> {
    return Promise.resolve(undefined);
  }
}
