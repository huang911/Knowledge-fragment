#### 1.介绍BFC及其应用

BFC就是块级格式上下文，是页面盒模型布局中的一种CSS渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。

创建BFC的方式：

a.html根元素

b.float浮动

c.绝对定位

d.overflow不为visiable

e.display为表格布局或者弹性布局

BFC的作用：

a.清除浮动

b.防止同一BFC容器中的相邻元素间的外边距重叠问题。

MDN：<https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context>

#### 2.opacity: 0、visibility: hidden、display: none

- `display: none;`

1. **DOM 结构**：浏览器不会渲染 `display` 属性为 `none` 的元素，不占据空间；
2. **事件监听**：无法进行 DOM 事件监听；
3. **性能**：动态改变此属性时会引起重排，性能较差；
4. **继承**：不会被子元素继承，毕竟子类也不会被渲染；
5. **transition**：`transition` 不支持 `display`。

- `visibility: hidden;`

1. **DOM 结构**：元素被隐藏，但是会被渲染不会消失，占据空间；
2. **事件监听**：无法进行 DOM 事件监听；
3. **性 能**：动态改变此属性时会引起重绘，性能较高；
4. **继 承**：会被子元素继承，子元素可以通过设置 `visibility: visible;` 来取消隐藏；
5. **transition**：`transition` 不支持 `display`。

- opacity: 0;

1. **DOM 结构**：透明度为 100%，元素隐藏，占据空间；
2. **事件监听**：可以进行 DOM 事件监听；
3. **性 能**：提升为合成层，不会触发重绘，性能较高；
4. **继 承**：会被子元素继承,且，子元素并不能通过 `opacity: 1` 来取消隐藏；
5. **transition**：`transition` 不支持 `opacity`

#### 3.省略效果

单行：

overflow:hidden;

text-overflow:ellipsis;

white-space:nowrap;

多行：

display: -webkit-box;

-webkit-box-orient:vertical;

-webkit-line-clamp:3;

overflow:hidden;

js:

```html
<p>这是一段测试文字，this is some test text，测试文字，测试文字测 </p>
const p = document.querySelector('p')
let words = p.innerHTML.split(/(?<=[\u4e00-\u9fa5])|(?<=\w*?\b)/g)
while (p.scrollHeight > p.clientHeight) {
  words.pop()
  p.innerHTML = words.join('') + '...'
}
```

