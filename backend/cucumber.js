/* eslint-disable camelcase */
const common = [
	'--require-module ts-node/register' // Load TypeScript module
];

const coins_backend = [
	...common,
	'tests/apps/coins/backend/features/**/*.feature',
	'--require tests/apps/coins/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
	coins_backend
};
