### 1.FormData对象

用以将数据编译成键值对，以便用XMLHttpRequest来发送数据。其主要用于发送表单数据，但亦可用于发送带键数据，而独立于表单使用。如果表单enctype属性设为multipart/form-data ，则会使用表单的[`submit()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement/submit)方法来发送数据，从而，发送数据具有同样形式。

来源： https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects

### 2.Error

#### 1.Error

过**Error**的构造器可以创建一个错误对象。当运行时错误产生时，Error的实例对象会被抛出。Error对象也可用于用户自定义的异常的基础对象

```js
new Error([message[, fileName[,lineNumber]]])
```

- `message`

  可选。人类可阅读的错误描述信息。

- `fileName `

  可选。被创建的Error对象的fileName属性值。默认是调用Error构造器代码所在的文件 的名字。

- `lineNumber `

  可选。被创建的Error对象的lineNumber属性值。默认是调用Error构造器代码所在的文件的行号。

#### 2.throw

**`throw`语句**用来抛出一个用户自定义的异常。当前函数的执行将被停止（`throw`之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个[`catch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)块。如果调用者函数中没有`catch`块，程序将会终止

```js
throw expression;
```

```
expression: 要抛出的表达式。
```

```
throw "Error2"; // 抛出了一个值为字符串的异常
throw 42;       // 抛出了一个值为整数42的异常
throw true;     // 抛出了一个值为true的异常

try {

} catch(err) {

}
// 如果抛出的是常规类型，捕捉到的也是常规类型
如果抛出的是new Error('出错了')，拿到的就是err.message === '出错了'
```

