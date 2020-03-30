#### 1.请用ES5实现Ajax请求？

```js
var xhr = new XMLHttpRequest();
xhr.open("get", url, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
    }
}
xhr.send();
第一步：创建XMLHttpRequest对象，也就是创建一个异步调用对象。
第二步：创建一个新的HTTP对象，并指定HTPP请求的方法，URL及验证信息。
第三步：设置响应HTTP请求状态变化的函数。
第四步：发送HTTP请求。
第五步：获取异步调用返回的数据
```

#### 2.请求静态资源时，浏览器的缓存机制？

#### 3.HTTP缓存

#### 4.cookie，sessionStorage,localStorage

#### 5.简单介绍下快速排序

#### 6.call,apply,bind的区别

#### 7.事件冒泡，事件捕获，事件委托（事件代理）

**事件冒泡：**

IE的事件流叫做事件冒泡，即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。

**事件捕获**

事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前捕获它。

事件委托的原理：利用事件的冒泡原理来实现的。

适用事件委托的事件：`click，mousedown，mouseup，keydown，keyup，keypress` （mouseover事件：不论鼠标指针穿过被选元素或其子元素，都会触发mouseover事件；mouseenter事件：只有鼠标指针穿过被选元素时，才会触发mouseenter事件。）

#### 8.margin重叠问题

#### 9.重绘和回流

#### 10.state和props的区别

state是可变的，是一组用于反映组件UI变化的状态集合；

props对于使用它的组件来说，是只读的，要想修改Props,只能通过该组件的父组件修改。在组件状态上移的场景中。父组件正是通过子组件的Props,传递给子组件其所需要的状态。

#### 11.csrf

跨站请求伪造

#### 12.平常的学习方法

掘金，看书，视频

#### 13.自己的优点？

抗压能力强，学习能力还可以，和同事相处融洽，勇于担当，不推卸责任

#### 14.工作中常用的API

#### 15.EventLoop

