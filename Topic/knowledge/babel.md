**匿名的函数，执行完后很快就会被释放，这种机制不会污染全局对象** `Browserify` 

```
(function() {  var main_message = '这是一条内容信息' //main.js  var main_error = '这是一条错误信息' //main.js  console.log('error:', main_error)})()
```

`exports` 是 `module.exports` 的引用。作为一个引用，如果我们修改它的值，实际上修改的是它对应的引用对象的值。

就如:

```
exports.a = 1// 等同于module.exports = {    a: 1}
```

