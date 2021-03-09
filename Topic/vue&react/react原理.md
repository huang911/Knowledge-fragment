### 1.React 中 setState 什么时候是同步的，什么时候是异步的？

在React中，**如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state**。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

**原因：**在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，**有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state**。
详细请看 [深入 setState 机制](https://github.com/LuNaHaiJiao/blog/issues/26)

这里所说的同步异步， 并不是真正的同步异步， 它还是同步执行的。

这里的异步指的是多个state会合成到一起进行批量更新。

https://github.com/sisterAn/blog/issues/2

### 2.Vuex、Flux、Redux、Redux-saga、Dva、MobX

https://zhuanlan.zhihu.com/p/53599723

### 3.使用class的示例

在React的class组件中，render函数是不应该有任何副作用的，一般来说，在这里执行操作太早了，我们基本都希望在React更新DOM之后，才执行我们的操作。

这就是把副作用操作放到componentDidMount和componentDidUpdate函数中。

### 4.React key是干什么用的,为什么要加上key呢?

