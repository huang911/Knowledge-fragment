### **1.Function.prototype.apply()**

apply()方法调用一个具有给定this值的函数，以及作为一个数组(或类似数组对象)提供的参数。

**注意：**call()方法的作用和 apply() 方法类似，区别就是`call()`方法接受的是**参数列表**，而`apply()`方法接受的是**一个参数数组**。

语法：

**func.apply(thisArg, [argsArray])**

 **thisArg**

 可选的，在func函数运行时使用的this值，this值可能不是该方法看到的实际值，如果这个函数处于非严格模式下，则指定为null或者undefined时会自动替换为指向全局对象，原始值会被包装。

**argsArray**

可选，一个数组或者类数组对象，其中的数组元素将作为单独的参数传给func函数。如果该参数的值为null或unded,则表示不需要传入任何参数。

**返回值**

调用有指定this值和参数的函数的结果

### **2.Function.prototype.bind()**

bind()方法创建**一个新的函数**，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

**语法：**

**function.bind(thisArg[,arg1[,arg2[,...]]])**

**thisArg**

调用绑定函数时作为this参数传递给目标函数的值。如果使用new运算符构造绑定函数，则忽略该值。当使用bind在setTimeout中创建一个函数（作为回调提供）时，作为thisArg传递的任何原始值都将转换为object.如果bind函数的参数列表为空，执行作用域的this将被视为新函数的thisArg。

arg1, arg2, ...

当目标函数被调用时，预先添加到绑定函数的参数列表中的参数。

### **3.Function.prototype.call()**

call()方法使用一个指定的this值和单独给出的一个或多个参数来调用一个函数，

**注意：**该方法的语法和作用与 [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法类似，只有一个区别，就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**

**语法：**func.call(thisArg, arg1, arg2, ...)

```
thisArg
```

在 *fun* 函数运行时指定的 `this` 值*。if(thisArg == undefined|null) this = window*，if(thisArg == number|boolean|string) this == new Number()|new Boolean()| new String()

```
arg1, arg2, ...
```

指定的参数列表。

**返回值：** 

使用调用者提供的this值和参数调用该函数的返回值。若该方法没有返回值， 则返回undefined;

4.手写apply,call,bind

```js
Function.prototype.bind = function(context, ...args) {
    context = context || window
    const fnSymbol = Symbol('fn')
      context[fnSymbol] = this
    return function(..._args) {
       args = args.concat(_args) 
       context[fnSymbol](..args)
       delete context[fnSymbol]
    }
}
Function.prototype.apply = function(context, argArr) {
    context = context || window
    const fnSymbol = Symbol('fn')
    
   context[fnSymbol] = this
   context[fnSymbol](..argArr)
   
   delete context[fnSymbol]
}
Function.prototype.call = function(context, ...args) {
    context = context || window
    const fnSymbol = Symbol('fn')
    
   context[fnSymbol] = this
   context[fnSymbol](..args)
   
   delete context[fnSymbol]
}
```



















