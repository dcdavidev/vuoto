import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { VUOTO_CONFIG_BASENAME, VUOTO_CONFIG_TEMPLATE_EXT } from '../consts.js';
import { instanceOfNodeError } from '../helpers/instance-of-node-error.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate default vuoto.config file.
 */
export async function initConfig(): Promise<void> {
  const configFile = `${VUOTO_CONFIG_BASENAME}.${VUOTO_CONFIG_TEMPLATE_EXT}`;
  const configPath = path.resolve(process.cwd(), configFile);
  const templatePath = path.join(
    __dirname,
    `../../templates/${VUOTO_CONFIG_BASENAME}.${VUOTO_CONFIG_TEMPLATE_EXT}`
  );

  try {
    const content = await fs.readFile(templatePath, 'utf8');
    await fs.writeFile(configPath, content, { flag: 'wx' });
    console.log(`👌 Created ${path.relative(process.cwd(), configPath)}`);
  } catch (error: unknown) {
    if (instanceOfNodeError(error, Error) && error.code === 'EEXIST') {
      console.error(`🤦♂️ ${configFile} already exists`);
    } else {
      throw error;
    }
  }
}
