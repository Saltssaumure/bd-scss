#!/usr/bin/env node

import sade from "sade";
import chokidar from "chokidar";

import compile from "./compiler.js";
import { getConfig, getPath } from "./utils.js";
import { DEFAULTS } from "./defaults.js";
import log from "./log.js";

const config = await getConfig();

const prog = sade("bd-scss");

prog.command("build")
    .describe("Compiles theme for publishing.")
    .action(async () => {
        log.info(`Running ${log.code("build")} script...`);

        try {
            // Builds the .min.css file for import
            await compile({
                target: getPath(DEFAULTS.build.target),
                output: getPath(DEFAULTS.build.output),
                mode: "build"
            });
        } catch (err) {
            log.error(err);
        }

        // Builds any addons
        if (config?.addons && Array.isArray(config?.addons) && config?.addons.length > 0) {
            config?.addons.forEach(async (addon) => {
                try {
                    await compile({
                        target: getPath(addon[0]),
                        output: getPath(addon[1]),
                        mode: "addon"
                    });
                } catch (err) {
                    log.error(err);
                }
            });
        }

        log.success("Built all files.");
    });

prog.command("dev")
    .describe("Watch the scss folder for changes and autocompile them to the BetterDiscord themes folder.")
    .action(async () => {
        chokidar
            .watch("scss", { usePolling: true })
            .on("ready", () => {
                log.info(`\nWatching: ${log.code("scss")} folder.` + `\nOutput: ${log.code(DEFAULTS.dev.output)}\n`, "DEV");
            })
            .on("change", async () => {
                try {
                    await compile({
                        target: getPath(DEFAULTS.dev.target),
                        output: getPath(DEFAULTS.dev.output),
                        mode: "dev"
                    });
                } catch (err) {
                    log.error(err);
                }
            });
    });

prog.parse(process.argv);
