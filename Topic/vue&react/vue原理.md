#### 1.Virtual DOM 真的比操作原生 DOM 快吗？

- 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
- 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化
- https://muyiy.cn/question/frame/32.html

#### 2.为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

 redux:

- 单一数据源，也就是state

- state 是只读，Redux并没有暴露出直接修改state的接口，必须通过action来触发修改

- 使用纯函数来修改state，reducer必须是纯函数

- 因为更改state的函数必须是纯函数，纯函数既是统一输入就会统一输出，没有任何副作用；如果是异步则会引入额外的副作用，导致更改后的state不可预测；

- https://muyiy.cn/question/frame/37.html

  vuex:

- 我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

  #### 3.在 Vue 中，子组件为何不可以修改父组件传递的 Prop

  如果修改了，Vue 是如何监控到属性的修改并给出警告的。

  #### 
