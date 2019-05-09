1.CommonJS规范

 在CommonJS中，有一个全局性方法require()，用于加载模块。（同步加载）

这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于”假死”状态。 因此，浏览器端的模块，不能采用”同步加载”（synchronous），只能采用”异步加载”（asynchronous）。这就是AMD规范诞生的背景。

2.AMD规范

它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

`define(id?, dependencies?, factory)`

id:字符串，模块名称(可选)

dependencies: 是我们要载入的依赖模块(可选)，使用相对路径。,注意是数组格式

factory: 工厂方法，返回一个模块函数

**（1）如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。**

// math.js
define(function (){
   var add = function (x,y){
     return x+y;
    };
    return {
      add: add
   };
});

**（2）如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。**

define(['Lib'], function(Lib){
         function foo(){
            Lib.doSomething();
         }
          return {
             foo : foo
              };
         });

（3）AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：

`require([module], callback);`

3.CMD (Common Module Definition), 是seajs推崇的规范，CMD则是依赖就近，用的时候再require

define(function(require, exports, module) {
var clock = require('clock');
clock.start();
});

**`define(id?, dependencies?, factory)`**

（1）如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。

define(function(require, exports, module) {
// 模块代码
});

注意：带 id 和 dependencies 参数的 define 用法不属于 CMD 规范，而属于 Modules/Transport 规范。

4.**export导出模块**

export语法声明用于导出函数、对象、指定文件（或模块）的原始值。

注意：在node中使用的是exports,不要混淆了.

export有两种模块导出方式：**命名式导出（名称导出）和默认导出（定义式导出）**，命名式导出每个模块可以多个，而默认导出每个模块仅一个。

5.**import引入模块**

import语法声明用于从已导出的模块、脚本中导入函数、对象、指定文件（或模块）的原始值。

import模块导入与export模块导出功能相对应，也存在两种模块导入方式：命名式导入（名称导入）和默认导入（定义式导入）。

import的语法跟require不同，而且import必须放在文件的最开始，且前面不允许有其他逻辑代码，这和其他所有编程语言风格一致。

