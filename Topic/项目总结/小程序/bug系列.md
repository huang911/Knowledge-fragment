### **情形一：**

在部分ios手机上出现小程序无法点击的问题。经查，是因为业务逻辑老用户需要跳转去书架，所以在onLoad的代码里用了switchTab来跳转导致的。

原因： 在onLoad或者onShow里使用switchTab或者reLaunchTo来跳转，在ios上就会出现这种情况。

**解决办法：**

1.在跳转代码处，设置适当的延时。做延时跳转。

2：不在onLoad或者onShow里面跳转，可以在onReady里面做跳转。

意外收获：

onLoad里面有options参数，在onReady里面可以通过this.options来获取。

### 情形二：

toast提示在手机上上一闪而过，即使设置了toast的展示时间，也没有用。

原因：在showToast之后，hideToast之前，调用了hideLoading。导致toast直接隐藏了。

**解决办法：**

1.由于页面的代码逻辑比较复杂，所以采用了延时1s展示toast的方法来解决。

保证在页面loading隐藏之后再showToast.

2.wx.hideLoading()会关闭同级中的wx.showLoading或wx.showToast，所以要在showToast之前调用wx.hideLoading.

**注意：**

1.wx.showLoading和wx.showToast同时只能展示一个。

2.wx.showToast应于wx.hideToast配对使用。

### 情形三：

视频回调采用triggerEvent触发事件，有时候会触发不了，用this.setData更新视图，数据改变了，视图未更新。

**解决办法：**

使用自己写的发布订阅模式，EventHub.trigger来触发事件。

### 情形四：

在页面设置了全局变量，来回切页面时，前进<->返回，全局变量会一直存在。如果利用全局变量作为请求列表的页数。

**解决办法：**

需要在离开页面时，将全局变量置为初始值。

### 情形五：

利用while循环，await-async,做倒计时时，未到结束的时候一直执行计时更新，来回切页面时，导致，不是每秒更新，而是跳了好几秒。

错误代码：

```js
let t = 100000;
while(t > 1000) {
  t -= 1000;
  await delay(1000);
  this.setData({
    t
  })
}
```

**解决办法：** 

用setInterval写定时器更新，在离开页面时，清除定时器。

### 情形六：

如果字段类型是string类型，无法在wxml里进行三元表达式判断，可以在j s判断或者wxs中判断。

### 情形七：

如果在组件中使用了外部样式需在组件中加，options: {addGlobalClass: true},组件用了behaviors,在behaviors里写options: {addGlobalClass: true}不生效，只能在组件里写。