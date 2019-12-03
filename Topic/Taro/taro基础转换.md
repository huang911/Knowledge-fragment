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

### 转换 wepy 文件不成功

目前只能支持转换使用原生微信小程序开发的应用。

#### componentDidMount()

> 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 app 的 `onLaunch`，在 `componentWillMount` 后执行

监听程序初始化，初始化完成时触发（全局只触发一次）

在此生命周期中也可以通过 `this.$router.params`，访问到程序初始化参数，与 `componentWillMount` 中一致

#### componentDidShow()

> 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 `onShow`，在 H5/RN 中同步实现

程序启动，或从后台进入前台显示时触发，微信小程序中也可以使用 `Taro.onAppShow` 绑定监听

在此生命周期中通过 `this.$router.params`，可以访问到程序初始化参数

#### componentDidHide()

> 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 `onHide`，在 H5/RN 中同步实现

程序从前台进入后台时触发，微信小程序中也可以使用 `Taro.onAppHide` 绑定监听

#### componentDidCatchError(String error)

> 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 `onError`，H5/RN 中尚未实现

程序发生脚本错误或 API 调用报错时触发，微信小程序中也可以使用 `Taro.onError` 绑定监听

#### componentDidNotFound(Object)

> 在微信/字节跳动小程序中这一生命周期方法对应 `onPageNotFound`，其他端尚未实现
> 微信小程序中，基础库 1.9.90 开始支持
>
> 

### defaultProps

`defaultProps` 可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。例如：