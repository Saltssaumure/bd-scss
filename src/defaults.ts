import {getConfig, getDataFolder} from './utils.js';

const config = await getConfig();
const dataFolder = getDataFolder();

export const DEFAULTS = {
    meta: {
        name: `${config?.meta.name} - Test`,
        author: `Saltssaumure`,
        authorLink: `https://github.com/Saltssaumure`,
        version: `${config?.meta.version}`,
        source: `https://github.com/Saltssaumure/${config?.meta.repo}`,
        description: `Get the autoupdater: https://github.com/Saltssaumure/${config?.meta.repo}/releases/tag/latest`,
    },
    dev: {
        target: `scss/${config?.meta.scss}.scss`,
        output: dataFolder,
    },
    build: {
        target: `scss/${config?.meta.scss}.scss`,
        output: '',
    },
};
