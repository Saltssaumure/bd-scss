import path from 'path';
import fs from 'fs';
import log from './log.js';

import type { Config } from './config.js';

/**
 * Get the current OS.
 */
export const getOs = () => {
	if (process.platform === 'win32') return 'WIN';
	else if (process.platform === 'linux') return 'LINUX';
	return 'UNDEFINED';
};

export const getSlash = getOs() === 'WIN' ? '\\' : '/';

/**
 * Find the `scss-compile.config.js` file of the current working directory.
 */
export const getConfig = async () => {
	const find = path.join(process.cwd(), 'scss-compile.config.js');

	try {
		let config = (await import((getOs() === 'WIN' ? 'file://' : '') + find)).default as Config;
		return config;
	} catch (err) {
		log.error(
			`Cannot find ${log.code('scss-compile.config.js')} in the root of your directory.\n\n` +
				`If you do have a config file, make sure you include ${log.code('type": "module', '"')} in your ${log.code('package.json')} file.`
		);
	}
};

/**
 * Construct the meta given by the `scss-compile.config.js` file.
 */
export const generateMeta = async () => {
	const config = await getConfig();

	if (!config) return;

	return `/**\n${Object.entries(config.meta)
		.map(([key, value]) => ` * @${key} ${value}\n`)
		.join('')}*/\n\n`;
};

/**
 * Get the BetterDiscord directory.
 */
export const getDataFolder = () => {
	// Fix GitHub trying to run and erroring out.
	if (process.argv[2] === 'build') return 'dist';

	let devPath: string | undefined;
	let folder: string;

	if (getOs() === 'WIN') folder = devPath || path.resolve(process.env.APPDATA!, 'BetterDiscord', 'themes');
	else if (getOs() === 'LINUX') folder = devPath || path.resolve(process.env.HOME!, '.config', 'BetterDiscord', 'themes');
	else throw new Error('Cannot determine your OS.');

	if (!fs.existsSync(getPath(folder))) {
		log.error(`Directory does not exist: ${log.code('`' + getPath(folder) + '`')}`);
	}

	return folder;
};

/**
 * Transforms the given value to an absolute path.
 */
export const getPath = (...val: string[]) => {
	return path.resolve(...[...val].flat(42));
};

/**
 * Generates an array with missing meta to be used to tell the user if they're missing any.
 */
export const getMissingMeta = (meta: Record<string, any>) => {
	const keys = Object.keys(meta);

	const requiredMeta = ['name', 'scss', 'repo', 'version'];
	let missing: string[] = [];

	requiredMeta.forEach((requiredKey) => {
		if (!keys.includes(requiredKey)) missing = [...missing, requiredKey];
	});

	return missing.map((key) => ` - ${key}\n`).join();
};
