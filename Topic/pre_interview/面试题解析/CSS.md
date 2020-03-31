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

#### 4.介绍下 BFC、IFC、GFC 和 FFC

##### BFC：块级格式上下文 

页面上的一个隔离的渲染区域那么他是如何产生的呢？可以触发BFC的元素有float、position、overflow、display：table-cell/ inline-block/table-caption ；BFC有什么作用呢？比如说实现多栏布局’

##### IFC：内联格式上下文

IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同 IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。 那么IFC一般有什么用呢？ 水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

##### GFC：网格布局格式上下文

当为一个元素设置display值为grid,次元素将会获得一个独立的渲染区域，我们可以通过在网格容器上定义行和网格定义列属性各在网格项目上定义网格型和网格列为每一个网格项目定义位置和空间。

##### FFC：自适应格式上下文

display值为flex或者inline-flex的元素将会生成自适应容器。

#### 5.边界重叠

**是指两个或多个盒子（可能相邻也可能嵌套）的相邻边界（其间没有任何非空内容、补白、边框）重合在一起，形成一个单一边界。**

注意：相邻的盒子可能并非是由父子关系或同胞关系的元素生成。

1、水平边距永远不会重合。 
2、在规范文档中，2个或以上的块级盒模型相邻的垂直margin会重叠。最终的margin值计算方法如下： 
***a、全部都为正值，取最大者；*** 
***b、不全是正值，则都取绝对值，然后用正值减去最大值；*** 
***c、没有正值，则都取绝对值，然后用0减去最大值。*** 
注意：相邻的盒模型可能由DOM元素动态产生并没有相邻或继承关系。 
3、相邻的盒模型中，如果其中的一个是浮动的（float），垂直margin不会重叠，并且浮动的盒模型和它的子元素之间也是这样。 
4、设置了overflow属性的元素和它的子元素之间的margin不被重叠（overflow取值为visible除外）。 
5、设置了绝对定位（position:absolute）的盒模型，垂直margin不会被重叠，并且和他们的子元素之间也是一样。 
6、设置了display:inline-block的元素，垂直margin不会重叠，甚至和他们的子元素之间也是一样。 
7、如果一个盒模型的上下margin相邻，这时它的margin可能重叠覆盖（collapse through）它。在这种情况下，元素的位置（position）取决于它的相邻元素的margin是否重叠。 
**a、如果元素的margin和它的父元素的margin-top重叠在一起，盒模型border-top的边界定义和它的父元素相同。** 
**b、另外，任意元素的父元素不参与margin的重叠，或者说只有父元素的margin-bottom是参与计算的。如果元素的border-top非零，那么元素的border-top边界位置和原来一样。** 
一个应用了清除操作的元素的margin-top绝不会和它的块级父元素的margin-bottom重叠。 
注意，那些已经被重叠覆盖的元素的位置对其他已经重叠的元素的位置没有任何影响；只有在对这些元素的子元素定位时，border-top边界位置才是必需的。 
8、根元素的垂直margin不会被重叠。

- 外层元素padding代替
- 内层元素透明边框 border:1px solid transparent;
- 内层元素绝对定位 postion:absolute:
- 外层元素 overflow:hidden;
- 内层元素 加float:left;或display:inline-block;
  内层元素padding:1px;