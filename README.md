A module that provides IntelliSense for the ChatTriggers API.

# Installation

Installation is split into two parts, ASM files, and non-ASM files.

#### Non-ASM Files

![alt](https://i.imgur.com/eNcgB40.png)

For normal JS files, to get CTAutcomplete is as simple as 3 lines at the top of the file.
```js
/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
module.exports = {};
```
The first 2 lines are just to load in the CTAutocomplete library and then base js library, and the `module.exports` line is unfortunately required to tell your editor that the global scope should be contained in the file. **If your module has any imports or exports, however, you can safely delete the `module.exports` line.**

#### ASM Files
![alt](https://i.imgur.com/mYFnLT4.png)
The process for getting IntelliSense is slightly more involved but is still very simple.
```js
/// <reference types="../CTAutocomplete/asm" />
/// <reference lib="es2015" />
/**@param {IASM} ASM */
export default ASM => {}
```

The first 2 lines should look familiar except the reference to CTAutocomplete/asm to get access to the ASM library. The JSDoc signature is required to give typings to the ASM argument.

# Metadata.json

![alt](https://i.imgur.com/kQpzCgw.png)

CTAutocomplete also comes with a JSON schema for the metadata.json file. To use it, as can be seen in this module's metadata.json, all that is required is a `$schema` key in the metadata file. that points to the schema.json file. Once you have that in your file you will get autocompletion.
![alt](https://i.imgur.com/U4S9Z0j.png)

# Issues

I can 100% personally guarantee there are issues with these typings, it is important to keep in mind this project is still very much a work in progress and there are many things I intend to keep working on. That being said, if you find any issues or have any suggestion I can be reached on discord at **maxssho13#5487** or you can open an issue or a PR on the [Github](https://github.com/Maxssho13/CTAutocomplete) page.
