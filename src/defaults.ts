import { getConfig, getDataFolder } from "./utils.js";

const config = await getConfig();

export const DEFAULTS = (clientMod: string) => {
    return ({
    meta: {
        name: `${config?.meta.name} - Test`,
        author: `Saltssaumure`,
        authorLink: `https://github.com/Saltssaumure`,
        version: `${config?.meta.version}`,
        source: `https://github.com/Saltssaumure/${config?.meta.repo}`,
        description: `Dev version of https://github.com/Saltssaumure/${config?.meta.repo}.`
    },
    dev: {
        target: `scss/${config?.meta.scss}.scss`,
        output: getDataFolder(clientMod)
    },
    build: {
        target: `scss/${config?.meta.scss}.scss`,
        output: ""
    } });
};
