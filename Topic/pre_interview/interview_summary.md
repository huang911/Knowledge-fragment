1.请用ES5实现Ajax请求？

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

2.请求静态资源时，浏览器的缓存机制？



