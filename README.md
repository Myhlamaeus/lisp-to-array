# lisp-to-array
> Transpiles lisp code to an array

## Install

```bash
$ npm install --save lisp-to-array
```
or, to install it globally:
```bash
$ npm install -g lisp-to-array
```

## Usage

### io.js / node.js
```js
var lispToArray = require("lisp-to-array");

console.log(lispToArray("(this is an \"example\" 42)"));
```
should output:
```json
["this", "is", "an", ["`", "example"], 42]
```

### global
Assuming the file test.lisp with the following content:
```lisp
(do (def console (js console)) (. console "log" 42))
```
```bash
$ lisp-to-array test.lisp
$ lisp-to-array -o test.json test.lisp
$ lisp-to-array -e test.lisp
```
should output:
```json
["do", ["def", "console", ["js", "console"]], [".", "console", ["`", "log"], 42]]

42
undefined
```
and should write into test.json:
```json
["do", ["def", "console", ["js", "console"]], [".", "console", ["`", "log"], 42]]
```

## Example

```lisp
(this is an "example" 42)
```
compiles to:
```json
["this", "is", "an", ["`", "example"], 42]
```
