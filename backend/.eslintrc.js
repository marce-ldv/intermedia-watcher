module.exports = {
	rules: {
		'no-console': 'warn'
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				project: ['./tsconfig.json']
			},
			rules: {
				'@typescript-eslint/no-floating-promises': 'warn'
			}
		}
	]
};
