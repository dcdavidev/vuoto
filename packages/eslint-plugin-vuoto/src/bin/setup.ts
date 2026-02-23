#!/usr/bin/env node
import chalk from 'chalk';

console.log(`
${chalk.cyanBright.bold('✨ Welcome to eslint-plugin-vuoto setup!')}

To get started, add the following to your ${chalk.bold('eslint.config.js')}:

${chalk.gray('// eslint.config.js')}
${chalk.blueBright('import vuoto from \'eslint-plugin-vuoto\';')}

${chalk.gray('export default [')}
${chalk.gray('  ...')}
${chalk.cyanBright('  ...vuoto.configs.recommended,')}
${chalk.gray('];')}

${chalk.bold('Available Configs:')}
- ${chalk.green('vuoto.configs.recommended')}: ${chalk.dim('Standard rules (error level)')}
- ${chalk.yellow('vuoto.configs.strict')}: ${chalk.dim('More aggressive rules')}
- ${chalk.red('vuoto.configs.all')}: ${chalk.dim('Enable all rules')}

${chalk.bold('Learn more:')} ${chalk.blue('https://github.com/dcdavidev/vuoto')}
`);
