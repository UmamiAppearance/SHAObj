# SHAObj

[![License](https://img.shields.io/github/license/UmamiAppearance/SHAObj?color=009911&style=for-the-badge)](./LICENSE)
[![npm](https://img.shields.io/npm/v/sha-obj?color=%23009911&style=for-the-badge)](https://www.npmjs.com/package/sha-obj)


**SHAObj** creates a SHA-(1/256/384/512) object. It is very closely related to [pythons hashlib](https://docs.python.org/3/library/hashlib.html) in its methods and features. It provides an easy access to the ``Crypto.subtle`` method provided by modern browsers and node.js.  
  
Optionally it possible to get multiple different digest methods with a little help of [BaseEx](https://github.com/UmamiAppearance/BaseExJS). **BaseEx** also enables the feature to feed the Object with not just byte-like input but almost any type available in JavaScript. 

## Installation

### GitHub
```sh
git clone https://github.com/UmamiAppearance/SHAObj.git
```

### npm
```sh
nmp install sha-obj
```

## Builds
You can find builds in [dist](https://github.com/UmamiAppearance/SHAObj/tree/main/dist). Builds include versions with BaseEx build in and without the library. Two types for both kinds are available ([esm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)), plus a minified version of each.  
  
If you want to build it by yourself run:

```sh
npm run build
``` 

#### Builds with BaseEx _(any desired input/several digest methods)_
* [``sha-obj-bex.esm.js``](https://raw.githubusercontent.com/UmamiAppearance/SHAObj/main/dist/sha-obj-bex.esm.js)
* [``sha-obj-bex.esm.min.js``](https://raw.githubusercontent.com/UmamiAppearance/SHAObj/main/dist/sha-obj-bex.esm.min.js)
* [``sha-obj-bex.iife.js``](https://raw.githubusercontent.com/UmamiAppearance/SHAObj/main/dist/sha-obj-bex.iife.js)
* [``sha-obj-bex.iife.min.js``](https://raw.githubusercontent.com/UmamiAppearance/SHAObj/main/dist/sha-obj-bex.iife.min.js)

#### Builds without BaseEx _(byte like input/hexdigest)_
* [``sha-obj.esm.js``](https://raw.githubusercontent.com/UmamiAppearance/SHAObj/main/dist/sha-obj.esm.js)
* [``sha-obj.esm.min.js``](https://raw.githubusercontent.com/UmamiAppearance/SHAObj/main/dist/sha-obj.esm.min.js)
* [``sha-obj.iife.js``](https://raw.githubusercontent.com/UmamiAppearance/SHAObj/main/dist/sha-obj.iife.js)
* [``sha-obj.iife.min.js``](https://raw.githubusercontent.com/UmamiAppearance/SHAObj/main/dist/sha-obj.iife.min.js)


## Usage

### Importing

#### node.js

##### esm
```js
import SHAObj from "sha-obj";
```

##### cjs
```js
const SHAObj = require("sha-obj");
```


#### Browser

##### esm
```js
import SHAObj from "./path/sha-obj-bex.esm.min.js";
```

##### esm from CDN (jsdelivr)
```js
import SHAObj from "https://cdn.jsdelivr.net/npm/sha-obj@latest/dist/sha-obj-bex.esm.min.js"
```

##### iife script tag
```html
<script src="./path/sha-obj-bex.iife.min.js"></script>
```

##### iife script tag from CDN (jsdelivr)
```html
<script src="https://cdn.jsdelivr.net/npm/sha-obj@latest/dist/sha-obj-bex.iife.min.js"></script>
```

### Creating an instance    
The constructor takes one argument for the ``algorithm`` which is set to ``SHA-256`` by default. Available options are:
* ``SHA-1``
* ``SHA-256``
* ``SHA-384``
* ``SHA-512``

There a two possible ways available to create an instance:

#### the new operator
```js
// default, SHA-256
const sha256 = new SHAObj();

// SHA-512
const sha512 = new SHAObj("SHA-512");
```

#### the new method
```js
// default, SHA-256
const sha256 = await SHAObj.new();

// SHA-512
const sha512 = await SHAObj.new("SHA-512");
```

As the method is asynchronous it allows you to associate a message in one go.
```js
// SHA-512
const sha512 = await SHAObj.new("SHA-512", "Hello World!");
```


### Methods and Properties

#### Static

##### ``SHAObj.algorithmsAvailable()``
A set containing the names of the hash algorithms that are available.

##### ``SHAObj.algorithmsGuaranteed()``
Added for the sake of completeness in terms of compatibility with [pythons hashlib](https://docs.python.org/3/library/hashlib.html). Here it is simply pointing to [``algorithmsAvailable``](#shaobjalgorithmsavailable).

##### ``SHAObj.new(algorithm, input)``
Asynchronously creates a new instance. Optionally takes the ``algorithm`` as the first parameter, also an optional ``input`` which can be provided as the second parameter, and gets passed to the [``update``](#updateinput-replacefalse) method.

##### ``SHAObj.baseEx`` _[object]_
A [BaseEx Instance](https://github.com/UmamiAppearance/BaseExJS#available-converterscharsets) for the possibility to manually convert (byte) representations.

#### Instance

##### ``digestSize``  _[property]_
The size of the resulting hash in bytes.

##### ``blockSize`` _[property]_
The internal block size of the hash algorithm in bytes.

##### ``name`` _[property]_
The canonical name of this hash, always uppercase and always suitable as a parameter to create another hash of this type.

##### ``update(input[, replace=false])``
Update the hash object with almost any input. The input gets converted to a ``Uint8Array``. Unless ``replace`` is set to true, repeated calls are equivalent to a single call with the concatenation of all the arguments:  
``shaObj.update(a)``; ``shaObj.update(b)`` is in many occasions equivalent to ``shaObj.update(a+b)``.  
  
_(Note: The process is a concatenation of bytes. Take as an exception for instance ``shaObj.update(1)``; ``shaObj.update(2)``, which is not the same as ``shaObj.update(1+2)``)_


##### ``replace(input)``
Replace the the hash object with fresh input (the same as ``update(input, true)``).

##### ``digest()``
Return the digest of the data passed to the [``update``](#updateinput-replacefalse) method so far. This is an ``ArrayBuffer`` of size [``digestSize``](#digestsize-property).


##### ``hexdigest()``
Like [``digest``](#digest) except the digest is returned as a string of double length, containing only hexadecimal digits. This may be used (as one of many options) to exchange the value safely in non-binary environments.

##### ``basedigest`` _[object]_
Provides many different methods to covert the digest into different base representations. Take a look at the [live-examples](https://umamiappearance.github.io/SHAObj/examples/live-examples.html#base-representations), to see it in action.  
Every ``basedigest`` optionally takes additional [BaseEx Parameters](https://github.com/UmamiAppearance/BaseExJS#options).

##### ``copy()``
Async method to return a copy/clone of the hash object. This can be used to efficiently compute the digests of data sharing a common initial substring.


## Examples
[Here](https://umamiappearance.github.io/SHAObj/examples/live-examples.html) you can find many live-examples. To get a better idea of a possible use case, take a look at the [Online SHA Checksum Calculator](https://umamiappearance.github.io/SHAObj/examples/calculator.html).


## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2023, UmamiAppearance

