Promise 基础 

- Promise 执行器中的代码会被同步调用
- Promise 回调是基于微任务的

浏览器 eventloop

宏任务与微任务的优先级 

- 宏任务的优先级高于微任务
- 每一个宏任务执行完毕都必须将当前的微任务队列清空
- 第一个 script 标签的代码是第一个宏任务

### 总结

- `Promise.prototype.then()` 会隐式返回一个新 Promise
- 如果 Promise 的状态是 pending，那么 `then` 会在该 Promise 上注册一个回调，当其状态发生变化时，对应的回调将作为一个微任务被推入微任务队列
- 如果 Promise 的状态已经是 fulfilled 或 rejected，那么 `then()` 会立即创建一个微任务，将传入的对应的回调推入微任务队列

 **await** async2()  等价于： 

`new Promise((resolve) => {`
		`resolve(thenable)`
`})`

chrome71在执行顺序上等价于：

`new Promise((resolve) => {`
		`Promise.resolve().then(() => {`
		`thenable.then(resolve)`
		`})`
`})`



`function async1(){`
		`console.log('async1 start')`
		`return new Promise(resolve => resolve(async2()))`
		`.then(() => {`
		`console.log('async1 end')`
		`});`
`}`
`function async2(){`
		`console.log('async2');`
		`return Promise.resolve();`
`}`
`async1();`
`new Promise((resolve) => {`
		`console.log(1)`
		`resolve()`
`}).then(() => {`
		`console.log(2)`
`}).then(() => {`
		`console.log(3)`
`}).then(() => {`
		`console.log(4)`
`})`

chrome73

