const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					path.resolve(__dirname, 'loaders', 'style-loader'),
					path.resolve(__dirname, 'loaders', 'less-loader')
				]
			}
		]
	}
};
