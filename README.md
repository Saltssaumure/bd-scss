Personal modification of Gibbu's [bd-scss](https://github.com/Gibbu/bd-scss) compiler, for BetterDiscord and Vencord themes.

## Usage
Username is hardcoded. You probably want to use the original package with modifiable name. If not, then:

1. Get and link this package locally.
```bash
git clone git@github.com:Saltssaumure/salt-bd-scss.git
cd salt-bd-scss
npm run build
npm link
cd "theme project location"
npm link salt-bd-scss
```

2. Add `scss-compile.config.js` file in the root of your project folder with the following:

```js
/** @type {import('bd-scss/lib/config').Config} */
export default {
    // Theme metadata
    meta: {
        name: MyTheme,               // Official name of the theme.
        scss: main,                  // Name of the base scss file.
        repo: mytheme-discord-theme, // Name of the theme repository.
        version: 1.0                 // Version number.
    };
    // Optional addons for the theme, if any exist.
    addons: [
        ["scss/stuff.scss", 'addons/stuff.css'], // Target, output.
    ];
}
```
2. Commands for building theme in theme project folder:
```bash
bd-scss dev     # will build .theme.css to your BetterDiscord themes folder.
bd-scss dev:vc  # will build .theme.css to your Vencord themes folder.
bd-scss build   # will build .min.css and addons to project root folder.
```

## License
See the [LICENSE](https://github.com/Saltssaumure/salt-bd-scss/blob/main/LICENSE) file for license rights and limitations (MIT).
