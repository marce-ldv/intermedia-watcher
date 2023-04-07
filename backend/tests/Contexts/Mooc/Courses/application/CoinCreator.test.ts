import { CoinsCreator } from '../../../../../src/Contexts/CoinsCtx/Coins/application/CoinsCreator';
import { Coin } from '../../../../../src/Contexts/CoinsCtx/Coins/domain/Coin';
import { CourseRepositoryMock } from '../__mocks__/CoinRepositoryMock';

let repository: CourseRepositoryMock;
let creator: CoinsCreator;

beforeEach(() => {
	repository = new CourseRepositoryMock();
	creator = new CoinsCreator(repository);
});

describe('CourseCreator', () => {
	it('should create a valid course', async () => {
		const id = 'some-id';
		const name = 'some-name';
		const duration = 'some-duration';

		const coin = new Coin({ id, name, duration });

		await creator.run(id, name, duration);

		repository.assertLastSavedCourseIs(coin);
	});
});
