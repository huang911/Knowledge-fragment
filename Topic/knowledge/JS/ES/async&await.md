### 1.任何一个`await`语句后面的 Promise 对象变为`reject`状态，那么整个`async`函数都会中断执行。

e.g: 

```javascript
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

```javascript
//改写成try,catch方式。
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
```

```js
async function run() {
    let result = await fetch('http://example.com/data');
    let json = result.json();
    return json.data;
}

等价于：

function run() {
    let result;
    let json;
    return fetch('http://example.com/data')
    .then(res => {
    result = res;
    json = result.json();
    return json.data;
    })
}
```

await 后面跟一个 Promise，如果不是 Promise，相当于Promise.resolve(value)；await 返回的即是 then 中的结果，async 返回仍然是一个 Promise。
对于普通的异步函数，例如 fs.readFile，需要改造成 Promise 的形式。可以使用 promisify 改造。

