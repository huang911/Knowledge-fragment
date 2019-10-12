### `this.setData`

转换后的 `this.setData` 的 API 相当于小程序的 `this.setData` 的 polyfill，他和 `this.setState` 最大的区别就在于，`this.setData` 之后 `data` 的数据是同步更新，而渲染是异步更新，而 `setState` 两者都是异步的。

### `this.data` 和 `this.properties`

`this.data` 和 `this.properties` 相当于 Taro 的 `this.state` 和 `this.props` 的 alias，当它们的数据更新时，对应的 `state` 和 `props` 也会同步更新。

#### taro生命周期转换：

|       Page.onLoad |     componentWillMount |
| ----------------: | ---------------------: |
|            onShow |       componentDidShow |
|            onHide |       componentDidHide |
|           onReady |      componentDidMount |
|          onUnload |   componentWillUnmount |
|           onError | componentDidCatchError |
|      App.onLaunch |     componentWillMount |
| Component.created |     componentWillMount |
|          attached |      componentDidMount |
|             ready |      componentDidMount |
|          detached |   componentWillUnmount |
|             moved |                   保留 |

### 不支持 `relations` 和 `Behavior`

目前转换暂只支持转换 `Page`、`Component` 、`App` 三种构造器创造的小程序组件实例。 `relations` 和 `Behavior` 在其他许多小程序端中还没有对应的实现，我们认为实现这两个功能意义不大。

