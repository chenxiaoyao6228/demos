const fs = require('fs');
const path = require('path');
// babel 相关的插件

// babylon, 将代码解析为ast
// https://www.npmjs.com/package/babylon
let babylon = require('babylon');

// @babel/traverse, 提供了相应的钩子函数, 遍历ast修改节点
// https://babeljs.io/docs/en/babel-traverse
// 可以通过: https://astexplorer.net 的查看ast的结构
let traverse = require('@babel/traverse').default;

// @babel/generator: 将ast转化为代码,
// https://babeljs.io/docs/en/next/babel-generator.html
let generator = require('@babel/generator').default;

// @babel/types: ast中的类型定义, 如表达式等
// https://babeljs.io/docs/en/next/babel-types.html
const t = require('@babel/types');

class Compiler {
	constructor(config) {
		this.config = config;
		this.entryId;
		// 工作路径
		this.root = process.cwd();
		this.entry = config.entry;
		this.modules = [];
	}
	getSource(modulePath) {
		return fs.readFileSync(modulePath, 'utf-8');
	}
	parse(source, parentPath) {
		let ast = babylon.parse(source);
		let dependencies = [];
		// 对ast做修改, 将require方法改为__webpack_require__, 同时收集依赖
		traverse(ast, {
			CallExpression(p) {
				let node = p.node;
				if (node.callee.name === 'require') {
					node.callee.name = '__webpack_require__';
					let moduleName = node.arguments[0].value; // 模块的引用名
					moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); // 添加文件扩展名
					moduleName = './' + path.join(parentPath, moduleName);
					dependencies.push(moduleName);
					node.arguments = [t.stringLiteral(moduleName)]; // __webpack_require__('./src/index.js')
				}
			}
		});
		let sourceCode = generator(ast).code;
		return { sourceCode, dependencies };
	}
	buildModules(modulePath, isEntry) {
		// 读取文件, 拿到当前模块中内容
		let source = this.getSource(modulePath);
		// 拿到模块的id, 也就是相对路径
		let moduleName = './' + path.relative(this.root, modulePath);

		if (isEntry) {
			this.entryId = moduleName;
		}
		let { sourceCode, dependencies } = this.parse(
			source,
			path.dirname(moduleName) // 文件夹名
		);

		// 把相对路径和模块中的内容对应起来
		this.modules[moduleName] = sourceCode;

		dependencies.forEach(dep => {
			//递归加载
			this.buildModules(path.join(this.root, dep), false);
		});
	}
	emitFile() {}
	run() {
		// console.log(this.config);
		// 执行并创建模块之间的依赖关系
		this.buildModules(path.resolve(this.root, this.entry), true);
		console.log(this.modules, this.entryId);
		this.emitFile();
	}
}

module.exports = Compiler;
