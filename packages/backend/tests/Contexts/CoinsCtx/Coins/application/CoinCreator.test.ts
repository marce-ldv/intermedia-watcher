import { CoinsAddCoinService } from '../../../../../src/Contexts/CoinsCtx/Coins/application/CoinsAddCoinService';
import { Coin } from '../../../../../src/Contexts/CoinsCtx/Coins/domain/Coin';
import { CoinRepositoryMock } from '../__mocks__/CoinRepositoryMock';

let repository: CoinRepositoryMock;
let creator: CoinsAddCoinService;

beforeEach(() => {
  repository = new CoinRepositoryMock();
  creator = new CoinsAddCoinService(repository);
});

describe('Create Coin', () => {
  it('should create a valid coin', async () => {
    const id = 'some-id';
    const name = 'some-name';
    const logo = 'some-logo.png';
    const price = '23423';
    const marketCap = '34534';
    const priceChange24hAgo = '345345';
    const symbol = 'sym';
    const canFavorite = true;

    const coin = new Coin({ id, name, logo, price, marketCap, priceChange24hAgo, symbol, canFavorite });

    await creator.run({ ...coin });

    repository.assertLastSavedCoinsIs(coin);
  });
});
