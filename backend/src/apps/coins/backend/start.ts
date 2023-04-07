import { config } from 'dotenv';
config();

import { CoinsBackendApp } from './CoinsBackendApp';

try {
	new CoinsBackendApp().start();
} catch (e) {
	console.log(e);
	process.exit(1);
}

process.on('uncaughtException', err => {
	console.log('uncaughtException', err);
	process.exit(1);
});
