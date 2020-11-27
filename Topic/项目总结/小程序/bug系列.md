### **情形一：**

在部分ios手机上出现小程序无法点击的问题。经查，是因为业务逻辑老用户需要跳转去书架，所以在onLoad的代码里用了switchTab来跳转导致的。

原因： 在onLoad或者onShow里使用switchTab或者reLaunchTo来跳转，在ios上就会出现这种情况。

**解决办法：**

1.在跳转代码处，设置适当的延时。做延时跳转。

2：不在onLoad或者onShow里面跳转，可以在onReady里面做跳转。

意外收获：

onLoad里面有options参数，在onReady里面可以通过this.options来获取。

### 情形二：toast/loading
toast提示在手机上上一闪而过，即使设置了toast的展示时间，也没有用。

原因：在showToast之后，hideToast之前，调用了hideLoading。导致toast直接隐藏了。

**解决办法：**

1.由于页面的代码逻辑比较复杂，所以采用了延时1s展示toast的方法来解决。

保证在页面loading隐藏之后再showToast.

2.wx.hideLoading()会关闭同级中的wx.showLoading或wx.showToast，所以要在showToast之前调用wx.hideLoading.

**注意：**

1.wx.showLoading和wx.showToast同时只能展示一个。

2.wx.showToast应于wx.hideToast配对使用。

### 情形三：triggerEvent
视频回调采用triggerEvent触发事件，有时候会触发不了，用this.setData更新视图，数据改变了，视图未更新。

**解决办法：**

使用自己写的发布订阅模式，EventHub.trigger来触发事件。

### 情形四：页面变量
在页面设置了全局变量，来回切页面时，前进<->返回，全局变量会一直存在。如果利用全局变量作为请求列表的页数。

**解决办法：**

需要在离开页面时，将全局变量置为初始值。

### 情形五：倒计时
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

### 情形六：页面boolean判断

**如果字段类型是string类型，无法在wxml里进行三元表达式判断，可以在j s判断或者wxs中判断。**

### 情形七：外部样式

如果在组件中使用了外部样式需在组件中加，options: {addGlobalClass: true},组件用了behaviors,在behaviors里写options: {addGlobalClass: true}不生效，只能在组件里写。

### 情形八：

1.在页面写rotate旋转动画，在ios设备会闪烁。解决办法用rotate3d();

2.利用两张图片实现动物餐厅动物动起来的效果，在ios设备上切换页面时，动物会闪动,导致闪烁的原因，猜测是，切换窗口时，小程序进程并未杀掉，只是页面onHide,动画还在继续执行。切回来的时候，执行了onShow,重新渲染，和前一个动画冲突所致。

**当时的写法**：

```
.anmial {
	background-image: url(animal1);
	animation: animalMove 1s linear infinite;
}
@keyframes animalMove {
 49% {
 	background-image: url(animal1)
 }
 50% {
 	background-image: url(animal2)
 }
 99% {
 	background-image: url(animal2)
 }
 100%{
 	background-image: url(animal1)
 }
}
```

**解决办法：**

```
.anmial {
	background-image: url(animal1);
	animation: animalMove 1s steps(1) infinite;
}
@keyframes animalMove {
 50% {
 	background-image: url(animal2)
 }
 100%{
 	background-image: url(animal1)
 }
}
```

引用张鑫旭的话：

只要有轨迹可循，即使肉眼看上去是断断续续的，实际上也是动画

**`steps()`功能符可以让动画不连续**

`steps()`功能符和CSS3 animation中的`cubic-bezier()`功能符的地位和作用是一样的，都可以作为`animation-timing-function`的属性值。

然后`steps()`简化出了`step-start`和`step-end`这两个关键字；`cubic-bezier()`则有`linear`，`ease`，`ease-in`，`ease-out`以及`ease-in-out`

```js
steps(number, position)
number:数值。这个很好理解，表示把我们的动画分成了多少段
position:关键字。表示动画是从时间段的开头连续还是末尾连续。支持start和end两个关键字，含义分别如下：
start：表示直接开始。
end：表示戛然而止。是默认值。
```

`start`：表示结束。分段结束的时候，时间才开始走。于是，动画执行的5个分段点是后5个点：

<img src="https://image.zhangxinxu.com/image/blog/201806/2018-06-11_223135.png" alt="start执行的关键点" style="zoom:75%;" />

`end`：表示开始。分段开始的时候，时间跟着一起走。于是，动画执行的5个分段点是前5个点：

<img src="https://image.zhangxinxu.com/image/blog/201806/2018-06-11_223630.png" alt="end执行的关键点" style="zoom:75%;" />

#### animation-fill-mode

顾名思意，“动画填充模式”，啥子意思呢？我们装修时候，都见过铺地面砖或地板的，地砖与地砖时间只有缝隙的，我们需要填充，如何个填充法，我们就称之为“填充模式”。

一个动画周期就好比一块地面砖，动画与动画周期之间就会存在类似的缝隙，`animation-fill-mode`就是确定动画遭遇缝隙时如何“填充”的。一图胜千言：
<img src="https://image.zhangxinxu.com/image/blog/201306/animation-fill-mode.png" alt="animation-fill-mode不同参数值的图示意" style="zoom:75%;" />

由图可见（网上的解释都TM简单的敷衍）：

- **none**（默认值），表示动画应用之时、动画延时执行之前之前、以及动画结束之后，元素呈现的都是默认状态。

- **forwards**，前进，表示动画结束后，元素就是当前动画结束时候的状态。对应`keyframe`中的`"to"`或`"100%"`帧。如果应用`alternate`值，同时无限或偶数次数动画，此时最终`keyframe`是`"from"`或`"0%"`关键帧。

- backwards

  ，返回，表示动画开始之前，元素处于

  **keyframe是"from"或"0%"**

  关键帧的状态。由于大多数动画的**animatin-delay**

  为0, 由于没有指定**forwards**

  状态(如：both值)，因此我们视觉上看到的表现是：动画结束后，动画回到了起始关键帧状态；实际是

  动画开始之前就如此，而不是结束，万万不可被此假象误导。

  要想看清现实，可以设置`animation-delay`为非`0`值，我们就可以看到动画开始之前，元素就是`"0%"`起始关键帧状态，而不是元素默认状态。直观且准确反映了`backwards`的准确释义。

  实际应用中，`animation-delay`设置了非`0`值，同时不是`step-start`动画形式，此参数慎用，除非元素默认状态就是起始帧状态，否则动画犹如抽风了一样~![img](https://mat1.gtimg.com/www/mb/images/face/1.gif)

- **both**，`forwards`和`backwards`双P, 这是个略考智商的属性，既当爹又当妈的，这可怎么搞！好搞的，如果要求同一时间既爹又妈，你不是人妖，搞不来。但是白天当爹，晚上当妈，我想相对容易多。这里也是如此，`both`是**与**的关系，中文意思是“同时”，表示：动画开始之前是`"from"`或`"0%"`关键帧；动画完成之后是`"to"`或`"100%"`关键帧状态。
### 情形六：

如果字段类型是string类型，无法在wxml里进行三元表达式判断，可以在j s判断或者wxs中判断。

### 情形七：

如果在组件中使用了外部样式需在组件中加，options: {addGlobalClass: true},组件用了behaviors,在behaviors里写options: {addGlobalClass: true}不生效，只能在组件里写。