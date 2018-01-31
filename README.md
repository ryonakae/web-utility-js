# web-utility-js

JavaScript utilities for web develop.

## Features

* Util.js
  * Common utility functions
  * e.g. `getDevice()`, `waitPromise()`, `randomRange()`, etc.
* Resizer.js
  * Resize hundler
  * Throttle `resize` event
  * You can get window width and height.
* Scroller.js
  * Scroll hundler
  * Execute functions on `scroll`, `wheel`, `touchmove` event fired, and throttle these event
  * You can get scroll top, bottom, amount and direction.

## Basic usage

### Install

#### yarn
```
$ yarn add web-utility-js
```

#### npm
```
$ npm i web-utility-js
```

### Import

```
import {Utils, Resizer, Scroller} from "web-utility-js";
```

### Initialize

You must execute `init` function at first.

```
const utils = new Utils();
const resizer = new Resizer();
const scroller = new Scroller();

utils.init();
resizer.init();
scroller.init();
```

## Add/Remove function (Resizer.js/Scroller.js)

You can add/remove function to Resizer.js/Scroller.js.
Added function is executed on `resize`/`scroll`(`wheel` and `touchmove`) event fired.

### Add

```
resizer.add(name, function);
scroller.add(name, function);
```

* `name (String)`
  * Unique function name
* `function`
  * Named or anonymous function

```
// Add named function
resizer.add("funcName", myFunc);

// Add anonymous function
resizer.add("funcName", () => {
  console.log("resized!")
});
```

### Remove

```
resizer.remove(name);
scroller.remove(name);
```

* `name (String)`
  * Unique function name you already added

## Functions

### Utils.js

* `init()`
* `getDevice()`
* `getOs()`
* `getBrowser()`
* `getIeVersion()`
* `getIosVersion()`
* `getNow()`
* `waitPromise(delay)`
  * Wait a few milliseconds on `Promise`
  * e.g. `new Promise(...).then(utils.waitPromise(1000)).then(...)`
* `randomRange(min, max)`
* `map(value, start1, stop1, start2, stop2)`

### Resizer.js

* `init()`
* `add(name, func)`
* `remove(name)`
* `getWindowWidth()`
* `getWindowHeight()`

### Scroller.js

* `init()`
* `add(name, func)`
* `remove(name)`
* `getScrollTop()`
* `getScrollBottom()`
* `getAmount()`
* `getDirection()`
