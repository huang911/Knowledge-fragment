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

#### 7.事件冒泡，事件委托，事件代理

#### 8.margin重叠问题

#### 9.重绘和回流

#### 10.state和props的区别

#### 11.csrf

#### 12.平常的学习方法

掘金，看书，视频

#### 13.自己的优点？

抗压能力强，学习能力还可以，和同事相处融洽，勇于担当，不推卸责任

#### 14.工作中常用的API

#### 

