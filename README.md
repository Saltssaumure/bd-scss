# bd-scss

Modified version of Gibbu's SCSS compiler for BetterDiscord themes.

## Usage
You most likely want to use the original package instead. If not...

1. Get and link this package locally.
```bash
git clone git@github.com:Saltssaumure/bd-scss.git
cd bd-scss
npm run build
npm link
cd [theme project location]
npm link bd-scss
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
bd-scss dev # will build .theme.css to your BetterDiscord themes folder.

bd-scss build # will build .min.css and addons to project root folder.
```

## License

See the [LICENSE](https://github.com/Gibbu/bd-scss/blob/main/LICENSE) file for license rights and limitations (MIT).
