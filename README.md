# xd-dialog-helper

[![Build Status](https://travis-ci.com/pklaschka/xd-dialog-helper.svg?branch=master)](https://travis-ci.com/pklaschka/xd-dialog-helper)
[![npm version](https://badge.fury.io/js/xd-dialog-helper.svg)](https://badge.fury.io/js/xd-dialog-helper)
![David](https://img.shields.io/david/pklaschka/xd-dialog-helper.svg)

[![NPM](https://nodei.co/npm/xd-dialog-helper.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/xd-dialog-helper/)

---

A small library that serves as an abstraction layer for creating **medium complex** dialogs (containing options a user can choose, not only things like error messages...) in plugins for Adobe XD CC.

## Usage
### Installing the library
There are two main ways you can install the library.
1. With a package manager: If you're using a package manager for your plugin (npm or yarn), you can easily install the helper by running `npm install xd-dialog-helper --save` or `yarn add xd-dialog-helper` in your console inside your plugin's folder.
2. If you don't use a package manager, you can simply copy the `dialog-helper.js`-file from this repo into your project (e.g. into a `lib`-folder) and reference it that way.

### Using the library
Depending on which option you chose when installing the library, you can get a reference to the helper class in different ways:

#### Option 1 (with a package manager):
If you installed it via a package manager and use some module bundler (like e.g., [webpack](https://webpack.js.org/)), you can get a reference to the helper by using

```javascript
const dialogHelper = require('xd-dialog-helper');
```

#### Option 2 (without a package manager):
If you copied the `dialog-helper.js` file from the repo, you can reference it by using the relative path. Assuming, that your plugin's `.js` file is at the root level and you have a `lib` folder containing the helper (i.e. `lib/dialog-helper.js`), you can reference the helper by using
```javascript
const dialogHelper = require('./lib/dialog-helper');
```

#### Documentation for the library
You can find a detailed guide on how to use the library in the [repository wiki](https://github.com/pklaschka/xd-dialog-helper/wiki).
