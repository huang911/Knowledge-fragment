setTimeout: 参考链接:https://www.jeffjade.com/2016/01/10/2016-01-10-javacript-setTimeout/

setInterval踩坑：参考链接：https://juejin.im/post/5aaa248d6fb9a028b410caa0

实现效果：

在小程序除了某些特定页面，在其他页面进入小程序30秒后弹框，如果在30秒内进入了这些特定页面，或者关闭弹框之后，则不展示弹框。

开始采用的是setInterval来定时，clearInterval来清除定时器，发现没有清除定时器。

