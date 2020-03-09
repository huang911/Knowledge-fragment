```js
function changeObjProperty(o) {
  //o是形参，指向website的引用
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  //o指向了新的内存空间，以后o的内部发生任何变化与website无关
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```

// Foo (4,2,1)

```js
// Foo的构建方法
function Foo() {
	Foo.a = function() {
    	console.log(1)
    }
    this.a = function() {
    	console.log(2)
    }
}
// 在Foo上挂载原型方法
Foo.prototype.a = function() {
	console.log(3)
}
// Foo挂载方法a
Foo.a = function() {
	console.log(4)
}
Foo.a(); // 执行Foo的方法；
let obj = new Foo(); // 调用Foo的构建方法。Foo的构建方法主要做了：1.将全局的Foo上的直接方法a替换为一个输出1的方法。2.在新对象上挂载直接方法2,输出值为2.
obj.a(); // 访问this.a,有直接方法，不需要去访问原型链
Foo.a();
```

//  String VS new String()  (true, false)

```js
String('11') == new String('11');
String('11') === new String('11');
//==时做了隐式转换，调用了toString
//2者类型不一样，一个是string，一个是object
```

//Goodbye jack

```js
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
  var name = 'Jack'; // 在立即执行函数内，此题的关键在于此处var声明的name变量提升到了function作用域的上层，此时的a只是声明了，并没有赋值，所以是undefined.如果没有var定义，则拿到的是全局变量的name.
  console.log('Goodbye ' + name);
} else {
  console.log('Hello ' + name);
}
})();
```

//

```js
// 加性操作符：如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来
// 乘性操作符：如果有一个操作数不是数值，则在后台调用 Number()将其转换为数值
// Javascript中所有对象基本都是先调用valueOf方法，如果不是数值，再调用toString方法。
// 后边的“+”将作为一元操作符，如果操作数是字符串，将调用Number方法将该操作数转为数值，如果操作数无法转为数值，则为NaN。
1 + "1" // 11,

2 * "2" // 4

[1, 2] + [2, 1] // 1,22,1

"a" + + "b" // aNaN
```

//

```js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();
```

