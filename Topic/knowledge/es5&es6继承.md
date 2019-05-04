来源：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

1.当继承的函数被调用时，[this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this) 指向的是当前继承的对象，而不是继承的函数所在的原型对象。

`var o = {a:1};`

`原型链： o——> Object.prototype ——> null`

`var a = ['yo', 'wah', '?'];`

`原型链： a——> Array.prototype ——> Object.prototype ——> null`

`function f() {`

`return 2;`

`}`

`原型链： f ——> Function.prototype ——> Object.prototype ——> null`

2.ECMAScript 5 中引入了一个新方法：[`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。可以调用这个方法来创建一个新对象。新对象的原型就是调用 create 方法时传入的第一个参数：

```
var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype
```



3.hasOwnProperty](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 是 JavaScript 中处理属性并且不会遍历原型链的方法之一。(另一种方法: [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys))

注意：检查属性是否 [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 还不够。该属性可能存在，但其值恰好设置为 undefined