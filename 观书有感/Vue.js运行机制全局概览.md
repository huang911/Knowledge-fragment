### 1.响应式系统的基本原理

#### 响应式系统

Vue.js 是一款 MVVM 框架，数据模型仅仅是普通的 JavaScript 对象，但是对这些对象进行操作时，却能影响对应视图，它的核心实现就是响应式系统. Vue.js就是基于Object.defineProperty实现「响应式系统」的

定义：Object.defineProperty()会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```js
/**
* obj:目标对象
* prop: 需要操作的目标对象的属性名
* descriptor: 描述符
* return value 传入对象
**/
Object.defineProperty(obj, prop, descriptor)
```

descriptor的属性：

- `enumerable`，属性是否可枚举，默认 false。
- `configurable`，属性是否可以被修改或者删除，默认 false。
- `get`，获取属性的方法。
- `set`，设置属性的方法。

MDN上的解释：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

#### 实现observer(可观察的）

### 2.实现 Virtual DOM 下的一个 VNode 节点