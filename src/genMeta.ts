import { DEFAULTS } from "./defaults.js";

/**
 * Construct the meta given by the `scss-compile.config.js` file.
 */
export const generateMeta = async () => {
    return `/**\n${Object.entries(DEFAULTS("BetterDiscord").meta)
        .map(([key, value]) => ` * @${key} ${value}\n`)
        .join("")}*/\n\n`;
};
