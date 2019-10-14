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



