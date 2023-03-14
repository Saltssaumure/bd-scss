// prettier-ignore

export interface Config {
    meta: {
        /** The official name of your theme. */
        name: string;
        /** The name of your base scss file. */
        scss: string;
        /** The name of your theme repository. */
        repo: string;
        /** The version of your theme. */
        version: string;
    };

    /**
     * Any addons that should be compiled separately from your theme files.
     * Example being Horizontal Server List and it's bottomhsl addon.
     *
     * The first index is the target file while the 2nd index is the output file,
     * relative to your project directory.
     *
     * You **MUST** provide the full path to file, including the extension.
     * As the compiler will not auto name these for you.
     *
     * Example: `['src/addons/_mycooladdon.scss', 'dist/MyCoolAddon.css']`
     */
    addons?: ([string, string])[];
}
