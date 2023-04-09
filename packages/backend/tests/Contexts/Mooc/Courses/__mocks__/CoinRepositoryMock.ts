import { Coin } from '../../../../../src/Contexts/CoinsCtx/Coins/domain/Coin';
import { CoinRepository } from '../../../../../src/Contexts/CoinsCtx/Coins/domain/CoinRepository';

export class CoinRepositoryMock implements CoinRepository {
  private readonly mockSave = jest.fn();

  async save(coin: Coin): Promise<void> {
    await this.mockSave(coin);
  }

  assertLastSavedCourseIs(expected: Coin): void {
    const mock = this.mockSave.mock;
    const lastSavedCoin = (mock.calls[mock.calls.length - 1] as Coin[])[0];
    expect(lastSavedCoin).toBeInstanceOf(Coin);
    expect(lastSavedCoin.id).toEqual(expected.id);
  }
}
